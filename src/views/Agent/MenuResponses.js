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

class MenuResponses extends Component {
  state = {responses: []}
  createNewResponses = () => {
    this.props.history.push(this.props.history.location.pathname + '/create')
  }
  goToResponses = (id) => {
    this.props.history.push(this.props.history.location.pathname + '/' + id)
  }
  async componentDidMount(){
    const token = getData(localStorageKey).token;
    const id = this.props.match.params.id2
    await actionCreator.fetchAgentResponses(token, id)(this.props.dispatch)
    await actionCreator.getMethod(token, id)(this.props.dispatch)
    await actionCreator.getAgent(token, this.props.match.params.id)(this.props.dispatch)
  }
  badge = (status)=>{
    if(status === "Y")return(<Badge color="success">Active</Badge>);
    else return(<Badge color="danger">Not active</Badge>)
  }
  render() {
    const responses = this.props.responses;
    responses.sort((a,b)=>a.responseid - b.responseid)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                List of responses of method with description: "{this.props.method.description}" from agent [{this.props.agent.agentname}]
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  <tr>
                    <td><strong>Response id</strong></td>
                    <td><strong>Param Name</strong></td>
                    <td><strong>Response Param</strong></td>
                    <td><strong>Is Active</strong></td>
                  </tr>
                  {responses.map((value, idx) => {
                    return (
                      <tr key={idx} onClick={()=>{this.goToResponses(value.configresponseid)}}>
                        <td>{value.configresponseid}</td>
                        <td>{value.paramname}</td>
                        <td>{value.responseparam}</td>
                        <td>{this.badge(value.isactive)}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
				<Button color="primary" onClick={this.createNewResponses}>Create New Responses</Button>
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
    responses: fromJS(state.agents.get('responses')).toJS(),
    method: fromJS(state.agents.get('method')).toJS(),
    agent: fromJS(state.agents.get('agent')).toJS()
  }))(MenuResponses),
)
