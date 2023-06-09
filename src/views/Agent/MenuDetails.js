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
import {actionCreator} from "../../redux/agents/action-creators";

class MenuDetails extends Component {
  state = {details: []}
  createNewDetails = () => {
    this.props.history.push(this.props.history.location.pathname + '/create')
  }
  goToDetails = (id) => {
    this.props.history.push(this.props.history.location.pathname + '/' + id)
  }
  async componentDidMount(){
    const token = getData(localStorageKey).token;
    const id = this.props.match.params.id2
    await actionCreator.fetchAgentDetails(token, id)(this.props.dispatch)
    await actionCreator.getMethod(token, id)(this.props.dispatch)
    await actionCreator.getAgent(token, this.props.match.params.id)(this.props.dispatch)
  }
  badge = (status)=>{
    if(status === "Y")return(<Badge color="success">Active</Badge>);
    else return(<Badge color="danger">Not active</Badge>)
  }
  render() {
    const details = this.props.details
    details.sort((a,b)=>a.detailid - b.detailid)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                List of details of method with description: "{this.props.method.description}" from agent [{this.props.agent.agentname}]
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  <tr>
                    <td><strong>detailId</strong></td>
                    <td><strong>paramName</strong></td>
                    <td><strong>requestParam</strong></td>
                    <td><strong>isActive</strong></td>
                  </tr>
                  {details.map((value) => {
                    return (
                      <tr key={`${value.configDetId}`} onClick={()=>{this.goToDetails(value.configDetId)}}>
                        <td>{value.configDetId}</td>
                        <td>{value.paramname}</td>
                        <td>{value.requestparam}</td>
                        <td>{this.badge(value.isactive)}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
				<Button color="primary" onClick={this.createNewDetails}>Create New Details</Button>
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
    details: fromJS(state.agents.get('details')).toJS(),
    method: fromJS(state.agents.get('method')).toJS(),
    agent: fromJS(state.agents.get('agent')).toJS()
  }))(MenuDetails),
)
