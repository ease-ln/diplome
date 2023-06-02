import React, { Component } from 'react'
import {
  Card,
  CardBody,
  Col,
  Row,
  Table,
  Button, Badge
} from 'reactstrap'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { actionCreator } from '../../redux/agents/action-creators'
import { getData, localStorageKey } from "../../redux/utils";

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
          <h3 style={{ marginBottom: "20px" }}>There is no agents yet</h3>
          <Button color="primary" onClick={this.createNewAgent}>Create new agent</Button>
        </div>
    )} 
    else return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
          <h3 style={{ marginBottom: "20px" }}>List of agents</h3>
            <Card>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  <tr>
                    <td><strong>Agent id</strong></td>
                    <td><strong>Agent Name</strong></td>
                    <td><strong>Description</strong></td>
                    <td><strong>Is Active</strong></td>
                  </tr>
                  {agents.map((value, idx) => {
                    return (
                      <tr key={idx} onClick={ () => {this.goToAgent(value.agentid)} }>
                          <td>{value.agentid}</td>
                          <td>{value.agentname}</td>
                          <td>{value.description}</td>
                        <td>{this.badge(value.isconnected)}</td>
                        </tr>
                    )
                  })}
                  </tbody>
                </Table>
				      <Button color="primary" onClick={this.createNewAgent}>Create new agent</Button>
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
    agents: fromJS(state.agents.get('agents')).toJS(),
  }))(Menu),
)
