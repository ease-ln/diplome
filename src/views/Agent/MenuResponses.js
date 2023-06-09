import React, {Component} from 'react'
import {
  Card,
  CardBody,
  Button, 
  Badge
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {fromJS} from 'immutable'
import {getData, localStorageKey} from "../../redux/utils";
import {actionCreator} from "../../redux/agents/action-creators";

import "../../scss/styles.css";

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

  badge = (status) => {
    if (status === "Y") return (<Badge color="success">Active</Badge>);
    else return (<Badge color="danger">Not active</Badge>)
  }
  
  render() {
    const responses = this.props.responses;
    responses.sort((a, b) => a.responseid - b.responseid)

    if (responses.length === 0) {
      return (
        <div className="animated fadeIn">
          <h3 style={{ marginBottom: "20px" }}>There are no responses yet</h3>
          <Button color="primary" onClick={this.createNewResponses}>Create new response</Button>
        </div>
    )} 
    return (
      <div className="animated fadeIn">
        <Card>
        <h3 style={{ fontWeight: "bold", margin: "20px", marginBottom: "0px" }}>
          Responses of method "{this.props.method.description}" from {this.props.agent.agentname} agent
        </h3>
          <CardBody className="card-grid">
            {responses.map((value, idx) => {
              return (
                <Card key={idx} onClick={ () => {this.goToResponses(value.configresponseid)} } style={{ padding: "10px", margin: "10px" }}>
                  <div>{this.badge(value.isactive)}</div>
                  <Badge color="secondary">Response id: {value.configresponseid}</Badge>
                  <i className="icon-arrow-right icons position-right"></i>
                  <div style={{ fontWeight: "bold", marginBottom: "10px" }}>{value.paramname}</div>
                  {value.responseparam && (<p style={{ color: "#73818F" }}>{value.responseparam}</p>)}
                  {!value.responseparam && (<p style={{ color: "#73818F" }}>No parameters</p>)}
                </Card>
              )
            })}
          </CardBody>
          <Button 
            color="primary" 
            className="save" 
            style={{ margin: "17px", marginBottom: "0px", paddingTop: "5px", paddingBottom: "6px" }} 
            onClick={this.createNewResponses}
          >
            <i className="icon-plus icons" style={{ marginRight: "7px" }}></i>
            Create new response
          </Button>
        </Card>
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
