import React, { Component } from 'react'
import {
  Card,
  CardBody,
  Button, 
  Badge
} from 'reactstrap'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { actionCreator } from "../../redux/agents/action-creators";
import { getData, localStorageKey } from "../../redux/utils";

import "../../scss/styles.css";

class MenuMethods extends Component {
  state = { methods: [] }
  createNewMethod = () => {
    this.props.history.push(this.props.history.location.pathname + '/create')
  }
  goToMethod = (id) => {
    this.props.history.push(this.props.history.location.pathname + '/'+ id)
  }
  async componentDidMount(){
    const token = getData(localStorageKey).token;
    const id = this.props.match.params.id
    await actionCreator.fetchAgentMethods(token, id)(this.props.dispatch)
    await actionCreator.getAgent(token, id)(this.props.dispatch)
  }
  badge = (status)=>{
    if(status === "Y")return(<Badge color="success">Active</Badge>);
    else return(<Badge color="danger">Not active</Badge>)
  }
  render() {
    const methods = this.props.methods
    methods.sort((a, b) => a.methodid - b.methodid)

    if (methods.length === 0) {
      return (
        <div className="animated fadeIn">
          <h3 style={{ marginBottom: "20px" }}>There are no methods yet</h3>
          <Button color="primary" onClick={this.createNewMethod}>Create new method</Button>
        </div>
    )} 
    return (
      <div className="animated fadeIn">
        <Card>
        <h3 style={{ fontWeight: "bold", margin: "20px", marginBottom: "0px" }}>Methods of {this.props.agent.agentname}</h3>
          <CardBody className="card-grid">
            {methods.map((value, idx) => {
              return (
                <Card key={idx} onClick={ () => {this.goToMethod(value.methodid)} } style={{ padding: "10px", margin: "10px" }}>
                  <div>{this.badge(value.isactive)}</div>
                  <Badge color="secondary">Method id: {value.methodid}</Badge>
                  <i className="icon-arrow-right icons position-right"></i>
                  <div style={{ fontWeight: "bold", marginBottom: "10px" }}>{this.props.agent.agentname}</div>
                  {value.description && (<p style={{ color: "#73818F" }}>{value.description}</p>)}
                  {!value.description && (<p style={{ color: "#73818F" }}>Description</p>)}
                </Card>
              )
            })}
          </CardBody>
          <Button 
            color="primary" 
            className="save" 
            style={{ margin: "17px", marginBottom: "0px", paddingTop: "5px", paddingBottom: "6px" }} 
            onClick={this.createNewMethod}
          >
            <i className="icon-plus icons" style={{ marginRight: "7px" }}></i>
            Create new method
          </Button>
        </Card>
      </div>
    )
  }
}

export default withRouter(
  connect((state) => ({
    methods: fromJS(state.agents.get('methods')).toJS(),
    agent: fromJS(state.agents.get('agent')).toJS()
  }))(MenuMethods),
)
