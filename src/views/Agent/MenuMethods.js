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
import {actionCreator} from "../../redux/agents/action-creators";
import {getData, localStorageKey} from "../../redux/utils";

class MenuMethods extends Component {
  state = {methods: []}
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
    methods.sort((a,b)=>a.methodid - b.methoid)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                List of methods of [{this.props.agent.agentname}]
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  <tr>
                    <td><strong>Method id</strong></td>
                    <td><strong>Agent Name</strong></td>
                    <td><strong>Description</strong></td>
                    <td><strong>Is Active</strong></td>
                  </tr>
                  {methods.map((value, idx) => {
                    return (
                      <tr key={`${value.methodid}`} onClick={()=>{this.goToMethod(value.methodid)}}>
                        <td>{value.methodid}</td>
                        <td>{this.props.agent.agentname}</td>
                        <td>{value.description}</td>
                        <td>{this.badge(value.isactive)}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
				<Button color="primary" onClick={this.createNewMethod}>Create New Method</Button>
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
    methods: fromJS(state.agents.get('methods')).toJS(),
    agent: fromJS(state.agents.get('agent')).toJS()
  }))(MenuMethods),
)
