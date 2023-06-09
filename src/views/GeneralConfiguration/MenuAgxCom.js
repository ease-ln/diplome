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
import {actionCreator} from "../../redux/generalConfiguration/action-creators";
import {actionCreator as agent_actions} from "../../redux/agents/action-creators";

import "../../scss/styles.css";

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
        <Card>
        <h3 style={{ fontWeight: "bold", margin: "20px", marginBottom: "0px" }}>Integrations of company {company.companyname}</h3>
          <CardBody className="card-grid">
            {agxComs.map((value, idx) => {
              return (
                <Card key={idx} onClick={ () => {this.goToAgentxCompany(value.configid)} } style={{ padding: "10px", margin: "10px" }}>
                  <div>{this.badge(value.isactive)}</div>
                  <Badge color="secondary">Configuration id: {value.configid}</Badge>
                  <i className="icon-arrow-right icons position-right"></i>
                  <div style={{ fontWeight: "bold", marginBottom: "10px" }}>{agents[idx]}</div>
                  {value.key && (<p style={{ color: "#73818F" }}>{value.key}</p>)}
                  {!value.key && (<p style={{ color: "#73818F" }}>No keys</p>)}
                </Card>
              )
            })}
          </CardBody>
          <Button 
            color="primary" 
            className="save" 
            style={{ margin: "17px", marginBottom: "0px", paddingTop: "5px", paddingBottom: "6px" }} 
            onClick={this.createNewAgentxCompany}
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
    agxComs: fromJS(state.configuration.get('agentsxcompanies')).toJS(),
    company: fromJS(state.configuration.get('company')).toJS(),
    agents: fromJS(state.agents.get('agents')).toJS(),
  }))(MenuAgxCom),
)
