import React, {Component} from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button, Badge
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {fromJS} from 'immutable'
import {getData, localStorageKey} from "../../redux/utils";
import {actionCreator} from "../../redux/generalConfiguration/action-creators";

class MenuMembers extends Component {
  state = {members: []}
  createNewMember = () => {
    this.props.history.push(this.props.history.location.pathname + '/create')
  }
  goToMember = (id) => {
    this.props.history.push(this.props.history.location.pathname + '/' + id)
  }
  async componentDidMount(){
    const token = getData(localStorageKey).token;
    const id = this.props.match.params.id2
    await actionCreator.fetchMembers(token, id)(this.props.dispatch)
    await actionCreator.getTeam(token, id)(this.props.dispatch)
    await actionCreator.getCompany(token, this.props.match.params.id1)(this.props.dispatch)
  }
  badge = (status)=>{
    if(status === "Y")return(<Badge color="success">Active</Badge>);
    else return(<Badge color="danger">Not active</Badge>)
  }
  render() {
    const members = this.props.members
    members.sort((a,b)=>a.memberid - b.memberid)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                List of Members of team [{this.props.team.teamname}] in company [{this.props.company.companyname}]
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  <tr>
                    <td><strong>Member id</strong></td>
                    <td><strong>Email</strong></td>
                    <td><strong>Created By</strong></td>
                    <td><strong>IsActive</strong></td>
                  </tr>
                  {members.map((value, idx) => {
                    return (
                      <tr key={idx} onClick={()=>{this.goToMember(value.memberid)}}>
                        <td>{value.memberid}</td>
                        <td>{value.email}</td>
                        <td>{value.createdby}</td>
                        <td>{this.badge(value.isactive)}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
                <Button color="primary" onClick={this.createNewMember}>Create New Member</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(
  connect((state) => ({
    members: fromJS(state.configuration.get('members')).toJS(),
    team: fromJS(state.configuration.get('team')).toJS(),
    company: fromJS(state.configuration.get('company')).toJS(),
  }))(MenuMembers),
)
