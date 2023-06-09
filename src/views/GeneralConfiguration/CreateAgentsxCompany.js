import React, {Component} from 'react'
import {
  Card,
  CardBody,
  Button,
  Input,
  Container,
  CustomInput,
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {getData, localStorageKey} from "../../redux/utils";
import {actionCreator as agent_actions} from "../../redux/agents/action-creators"
import {actionCreator} from "../../redux/generalConfiguration/action-creators";
import {fromJS} from "immutable";

import "../../scss/styles.css";

class CreateAgentsxCompany extends Component {
  state = {
    isactive: false,
    agentid: '',
    key: '',
    token: '',
    agents: []
  }

  handleChange = (k) => (e) => {
    const key = k.toLowerCase()
    this.setState({[key]: e.target.value})
  }

  handleCheck = (e) => {
    const key = "isactive"
    this.setState({[key]: e.target.checked})
  }

  submit = async () => {
    const id = this.props.match.params.id1
    const payload = {
      companyid: id,
      agentid: this.state.agentid,
      isactive: this.state.isactive,
      key: this.state.key,
      token: this.state.token,
    }

    for (const v in payload){
      if(v==="agentid")payload[v] = Number(payload[v])
      if(payload[v] === "")payload[v] = null
      if(payload[v] === false)payload[v] = "N"
      if(payload[v] === true)payload[v] = "Y"
    }
    try{
      const token = getData(localStorageKey).token
      await actionCreator.postAgxComp(token, payload)()
      await actionCreator.fetchAgentsxCompanies(token, id)(this.props.dispatch)
    }
    catch(e){
      console.log(e.stack)
    }
    finally{
      this.props.history.push(`/company/${id}/agxcom`)
    }
  }

  async componentDidMount(){
    const token = getData(localStorageKey).token;
    await agent_actions.fetchAgents(token, 0)(this.props.dispatch)
    const agents = this.props.agents.sort((a,b)=>a.agentid - b.agentid)
    this.setState({agents})
  }

  handleSelect = (e) => {
    const key = "agentid"
    this.setState({[key]: e.target.value})
  }

  render() {
    const {isactive, agents, agentid, ...agentStateData} = this.state
    return (
      <div className="animated fadeIn">
        <Card style={{ width: "100%", alignItems: "first baseline" }}>
        <h3 style={{ fontWeight: "bold", margin: "20px", marginBottom: "0px" }}>Create configuration</h3>
          <CardBody>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Agent name:</p>
              </Container>
              <Container className='flex-row info'>
                <Input type="select" name="select" value={agentid} onChange={this.handleSelect}>
                  {agents.map((agent)=>(
                    <option value={agent.agentid}>{agent.agentname}</option>
                  ))}
                </Input>
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
                <p style={{ marginBottom: "0px" }}>Token:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="ketokeny"
                  value={agentStateData.ktokeney}
                  onChange={this.handleChange("token")}
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
            <Button color="primary" onClick={this.submit}>
              <i className="fa fa-save fa-lg" style={{ marginRight: "7px" }}></i>
              Create configuration
            </Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default withRouter(
  connect((state) => ({
    agents: fromJS(state.agents.get('agents')).toJS(),
    }))(CreateAgentsxCompany),
)
