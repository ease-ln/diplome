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

class MenuTeams extends Component {
  state = {teams: []}
  createNewTeam = () => {
    this.props.history.push(this.props.history.location.pathname + '/create')
  }
  goToTeam = (id) => {
    this.props.history.push(this.props.history.location.pathname + '/' + id)
  }
  async componentDidMount(){
    const token = getData(localStorageKey).token;
    const id = this.props.match.params.id1
    await actionCreator.fetchTeams(token, id)(this.props.dispatch)
    await actionCreator.getCompany(token, id)(this.props.dispatch)
  }
  badge = (status)=>{
    if(status === "Y")return(<Badge color="success">Active</Badge>);
    else return(<Badge color="danger">Not active</Badge>)
  }
  render() {
    const teams = this.props.teams
    teams.sort((a,b)=>a.teamid - b.teamid)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                List of teams of company [{this.props.company.companyname}]
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  <tr>
                    <td><strong>Team id</strong></td>
                    <td><strong>Team Name</strong></td>
                    <td><strong>Description</strong></td>
                    <td><strong>Is Active</strong></td>
                  </tr>
                  {teams.map((value, idx) => {
                    return (
                      <tr key={idx} onClick={()=>{this.goToTeam(value.teamid)}}>
                        <td>{value.teamid}</td>
                        <td>{value.teamname}</td>
                        <td>{value.description}</td>
                        <td>{this.badge(value.isactive)}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
                <Button color="primary" onClick={this.createNewTeam}>Create New Team</Button>
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
    company: fromJS(state.configuration.get('company')).toJS(),
    teams: fromJS(state.configuration.get('teams')).toJS(),
  }))(MenuTeams),
)
