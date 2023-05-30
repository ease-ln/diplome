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

class MenuExtProjxTeam extends Component {
  state = {
    extProjxTeams: [],
    agents: []
  }
  createNewExternalProjectxTeam = () => {
    this.props.history.push(this.props.history.location.pathname + '/create')
  }
  goToExternalProjectxTeam = (id) => {
    this.props.history.push(this.props.history.location.pathname + '/' + id)
  }
  async componentDidMount(){
    const token = getData(localStorageKey).token;
    const id = this.props.match.params.id2
    await actionCreator.fetchExtProjxTeams(token, id)(this.props.dispatch)
    this.setState({extProjxTeams:this.props.extProjxTeams.sort((a,b)=>a.configid - b.configid)})
    await agent_actions.fetchAgents(token, 0)(this.props.dispatch)
    const agents = []
    const extProjxTeams = this.state.extProjxTeams
    extProjxTeams.forEach((value)=>{
      let index = this.props.agents.findIndex((val)=>{
        return value.agentid === val.agentid
      })
      agents.push(this.props.agents[index].agentname)
    })
    this.setState({agents})
    await actionCreator.getTeam(token, id)(this.props.dispatch)
    await actionCreator.getCompany(token, this.props.match.params.id1)(this.props.dispatch)
  }
  badge = (status)=>{
    if(status === "Y")return(<Badge color="success">Active</Badge>);
    else return(<Badge color="danger">Not active</Badge>)
  }
  render() {
    const extProjxTeams = this.state.extProjxTeams
    const agents = this.state.agents
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                List of External Projects x Teams of team [{this.props.team.teamname}] in company [{this.props.company.companyname}]
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  <tr>
                    <td><strong>Config id</strong></td>
                    <td><strong>Agent Name</strong></td>
                    <td><strong>Repo id</strong></td>
                    <td><strong>is Active</strong></td>
                  </tr>
                  {extProjxTeams.map((value, idx) => {
                    return (
                      <tr key={idx} onClick={()=>{this.goToExternalProjectxTeam(value.configid)}}>
                        <td>{value.configid}</td>
                        <td>{agents[idx]}</td>
                        <td>{value.repoid}</td>
                        <td>{this.badge(value.isactive)}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
                <Button color="primary" onClick={this.createNewExternalProjectxTeam}>Create New External Project x Team</Button>
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
    extProjxTeams: fromJS(state.configuration.get('extprojxteams')).toJS(),
    agents: fromJS(state.agents.get('agents')).toJS(),
    team: fromJS(state.configuration.get('team')).toJS(),
    company: fromJS(state.configuration.get('company')).toJS(),
  }))(MenuExtProjxTeam),
)
