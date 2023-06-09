import React, { Component } from 'react'
import {
  Card,
  CardBody,
  Button, Badge
} from 'reactstrap'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { actionCreator } from '../../redux/agents/action-creators'
import { getData, localStorageKey } from "../../redux/utils";

import "../../scss/styles.css";

class Menu extends Component {
  state = { agents: [] }

  createNewAgent = () => {
    this.props.history.push('/agent/create')
  }

  goToAgent = (id) => {
    this.props.history.push('/agent/' + id)
  }

  async componentDidMount(){
    const token = getData(localStorageKey).token;
    await actionCreator.fetchAgents(token, 0)(this.props.dispatch)
  }

  badge = (status) => {
    if (status === "Y") return (<Badge color="success">Active</Badge>);
    else return (<Badge color="danger">Not active</Badge>)
  }

  render() {
    const agents = this.props.agents
    agents.sort((a, b) => a.agentid - b.agentid)

    if (agents.length === 0) {
      return (
        <div className="animated fadeIn">
          <h3 style={{ marginBottom: "20px" }}>There are no integrations yet</h3>
          <Button color="primary" onClick={this.createNewAgent}>Create new integration</Button>
        </div>
    )} 
    else return (
      <div className="animated fadeIn">
        <Card>
        <h3 style={{ fontWeight: "bold", margin: "20px", marginBottom: "0px" }}>Integrations</h3>
          <CardBody className="card-grid">
            {agents.map((value) => {
              return (
                <Card key={`${value.agentid}`} onClick={ () => {this.goToAgent(value.agentid)} } style={{ padding: "10px", margin: "10px" }}>
                  <div>{this.badge(value.isactive)}</div>
                  <Badge color="secondary">Integration id: {value.agentid}</Badge>
                  <i className="icon-arrow-right icons position-right"></i>
                  <div style={{ fontWeight: "bold", marginBottom: "10px" }}>{value.agentname}</div>
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
            onClick={this.createNewAgent}
          >
            <i className="icon-plus icons" style={{ marginRight: "7px" }}></i>
            Create new integration
          </Button>
        </Card>
      </div>
    )
  }
}

export default withRouter(
  connect((state) => ({
    agents: fromJS(state.agents.get('agents')).toJS(),
  }))(Menu),
)
