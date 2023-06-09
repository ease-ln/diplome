import React, {Component} from 'react'
import {
  Card,
  CardBody,
  Container,
  Button,
  Input,
  CustomInput
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {fromJS} from 'immutable'
import {getData, localStorageKey} from "../../redux/utils";
import {actionCreator as agent_actions} from "../../redux/agents/action-creators"
import {actionCreator} from "../../redux/generalConfiguration/action-creators";

import "../../scss/styles.css";

class AgentsxCompany extends Component {
  state = {agentid: ''}

  handleChange = (k) => (e) => {
    const key = k.toLowerCase()
    this.setState({[key]: e.target.value})
  }
  handleCheck = (e) => {
    const key = "isactive"
    this.setState({[key]: e.target.checked})
  }
  handleSelect = (e) => {
    const key = "agentid"
    this.setState({[key]: e.target.value})
  }
  save = async () => {
    const payload = {}
    for (const v in this.state){
      if(this.state[v] === ""){payload[v] = null;continue;}
      if(v ==="isactive"){payload[v] = this.state[v] ? "Y" : "N";continue;}
      if(v === "updateby")continue
      if(v === "createdby")continue
      if(v === "lastupdate")continue
      if(v === "creationdate")continue
      payload[v] = this.state[v]
    }
    const company_id = this.props.match.params.id1
    try{
      const id = this.props.match.params.id2
      const token = getData(localStorageKey).token
      await actionCreator.putAgxComp(token, id, payload)()
      await actionCreator.fetchAgentsxCompanies(token, company_id)(this.props.dispatch)
    }
    catch(e){
      console.log(e.stack)
    }
    finally{
      const url = `/company/${company_id}/agxcom`
      this.props.history.push(url)
    }
  }
  remove = async () => {
    const company_id = this.props.match.params.id1
    try{
      const id = this.props.match.params.id2
      const token = getData(localStorageKey).token
      await actionCreator.deleteAgxComp(token, id)()
      await actionCreator.fetchAgentsxCompanies(token, company_id)(this.props.dispatch)
    }
    catch(e){
      console.log(e.stack)
    }
    finally{
      const url = `/company/${company_id}/agxcom`
      this.props.history.push(url)
    }
  }
  async componentDidMount(){
    const token = getData(localStorageKey).token;
    const id = this.props.match.params.id2
    await agent_actions.fetchAgents(token, 0)(this.props.dispatch)
    await actionCreator.getAgxComp(token, id)(this.props.dispatch)
    const obj = {}
    Object.entries(this.props.agxCom).forEach(([k,v])=>{
      if(k==="isactive")obj[k] = v === "Y"
      else obj[k] = v
    })
    this.setState(obj)
  }
  render() {
    const {isactive, configid, companyid, creationdate, agentid, createdby, updateby, lastupdate, ...agentStateData} = this.state
    return (
      <div className="animated fadeIn">
        <Card style={{ width: "100%", alignItems: "first baseline" }}>
        <h3 style={{ fontWeight: "bold", margin: "20px", marginBottom: "0px" }}>About configuration</h3>
          <CardBody>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "0px" }}>
              <div className='row-info'>
                <Container className='info'>
                  <p className='header-small'>Configuration id</p>
                  <p>{configid}</p>
                </Container>
                <Container className='info'>
                  <p className='header-small'>Company id</p>
                  <p>{companyid}</p>
                </Container>
              </div>
              <div className='row-info'>
              <Container className='info'>
                  <p className='header-small'>Creation date</p>
                  <p>{new Date(creationdate).toDateString()}</p>
                </Container>
                <Container className='info'>
                  <p className='header-small'>Created by</p>
                  <p>{createdby}</p>
                </Container>
              </div>
              <div className='row-info'>
                <Container className='info'>
                  <p className='header-small'>Last updated by</p>
                  {lastupdate && (<p>{new Date(lastupdate).toDateString()}</p>)}
                  {!lastupdate && (<p>None</p>)}
                </Container>
                <Container className='info'>
                  <p className='header-small'>Updated by</p>
                  {updateby && (<p>{updateby}</p>)}
                  {!updateby && (<p>None</p>)}
                </Container>
              </div>
            </div>
            <hr/>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Agent name:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="agentname"
                  value={agentStateData.agentname}
                  onChange={this.handleChange("agentname")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Token:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="token"
                  value={agentStateData.token}
                  onChange={this.handleChange("token")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Key:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="key"
                  value={agentStateData.key}
                  onChange={this.handleChange("key")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Configuration is active:</p>
              </Container>
              <Container className='flex-row info'>
                <CustomInput
                    id="isactive"
                    type="switch"
                    name="isactive"
                    checked={isactive}
                    onChange={this.handleCheck}
                  />
              </Container>
            </div>
            <hr/>
            <div style={{ width: "770px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", marginTop: "20px" }}>
                <Button color="danger" style={{ width: "fit-content" }} onClick={this.remove}>
                  Delete configuration
                </Button>
                <Button color="primary" style={{ marginLeft: "15px" }} onClick={this.save}>
                  <i className="fa fa-save fa-lg" style={{ marginRight: "7px" }}></i>
                  Save changes
                </Button>
                </div>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default withRouter(
  connect((state) => ({
    agxCom: fromJS(state.configuration.get('agentsxcompany')).toJS(),
    agents: fromJS(state.agents.get('agents')).toJS()
  }))(AgentsxCompany),
)
