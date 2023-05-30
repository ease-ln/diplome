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
import {actionCreator as agent_actions} from "../../redux/agents/action-creators";

class MenuAgxCom extends Component {
  state = {
    agxComs: [],
    agents: []
  }
  createNewAgentxCompany = () => {
    this.props.history.push(this.props.history.location.pathname + '/create')
  }
  goToAgentxCompany = (id) => {
    this.props.history.push(this.props.history.location.pathname + '/' + id)
  }
  async componentDidMount(){
    const token = getData(localStorageKey).token;
    const id = this.props.match.params.id1
    await actionCreator.fetchAgentsxCompanies(token, id)(this.props.dispatch)
    this.setState({agxComs:this.props.agxComs.sort((a,b)=>a.configid - b.configid)})
    await agent_actions.fetchAgents(token, 0)(this.props.dispatch)
    const agents = []
    const agxComs = this.state.agxComs
    agxComs.forEach((value)=>{
      let index = this.props.agents.findIndex((val)=>{
        return value.agentid === val.agentid
      })
      agents.push(this.props.agents[index].agentname)
    })
    this.setState({agents})
    await actionCreator.getCompany(token, id)(this.props.dispatch)
  }
  badge = (status)=>{
    if(status === "Y")return(<Badge color="success">Active</Badge>);
    else return(<Badge color="danger">Not active</Badge>)
  }
  render() {
    const agxComs = this.state.agxComs
    const agents = this.state.agents
    const company = this.props.company
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                List of Agents x Companies of company [{company.companyname}]
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  <tr>
                    <td><strong>Config id</strong></td>
                    <td><strong>Agent Name</strong></td>
                    <td><strong>Key</strong></td>
                    <td><strong>Is Active</strong></td>
                  </tr>
                  {agxComs.map((value, idx) => {
                    return (
                      <tr key={idx} onClick={()=>{this.goToAgentxCompany(value.configid)}}>
                        <td>{value.configid}</td>
                        <td>{agents[idx]}</td>
                        <td>{value.key}</td>
                        <td>{this.badge(value.isactive)}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
                <Button color="primary" onClick={this.createNewAgentxCompany}>Create New Agent x Company</Button>
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
    agxComs: fromJS(state.configuration.get('agentsxcompanies')).toJS(),
    company: fromJS(state.configuration.get('company')).toJS(),
    agents: fromJS(state.agents.get('agents')).toJS(),
  }))(MenuAgxCom),
)
