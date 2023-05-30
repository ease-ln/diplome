import React, {Component} from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Input,
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {getData, localStorageKey} from "../../redux/utils";
import {actionCreator} from "../../redux/generalConfiguration/action-creators";
import {fromJS} from "immutable";
import {actionCreator as agent_actions} from "../../redux/agents/action-creators";

class CreateExtProjxTeam extends Component {
  state = {
    isactive: false,
    agentid: '',
    repoid: '',
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
  Create = async () => {
    const id = this.props.match.params.id2
    const payload = {
      teamid: id,
      isactive: this.state.isactive,
      agentid: this.state.agentid,
      repoid: this.state.repoid
    }
    for (const v in payload){
      if(payload[v] === "")payload[v] = null
      if(payload[v] === false)payload[v] = "N"
      if(payload[v] === true)payload[v] = "Y"
      if(v==="agentid")payload[v] = Number(payload[v])
    }
    try{
      const token = getData(localStorageKey).token
      await actionCreator.postExtProjxTeam(token, payload)()
      await actionCreator.fetchExtProjxTeams(token, id)(this.props.dispatch)
    }
    catch(e){
      console.log(e.stack)
    }
    finally{
      const company_id = this.props.match.params.id1
      this.props.history.push(`/company/${company_id}/teams/${id}/extprojxteams`)
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
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                Create External Project x Team Config
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  {Object.keys(agentStateData).map(
                    (k) => (
                      <tr key={k}>
                        <td>{`${k}:`}</td>
                        <td>
                          <Input
                            type="text"
                            name={k}
                            value={agentStateData[k]}
                            onChange={this.handleChange(k)}
                          />
                        </td>
                      </tr>
                    ),
                  )}
                  <tr>
                    <td>Agent Name</td>
                    <td>
                      <Input type="select" name="select" value={agentid} onChange={this.handleSelect}>
                        {agents.map((agent)=>(
                          <option value={agent.agentid}>{agent.agentname}</option>
                        ))}
                      </Input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      isActive
                    </td>
                    <td>
                      <Input
                        type="checkbox"
                        name="isactive"
                        value={isactive}
                        onChange={this.handleCheck}
                      />
                    </td>
                  </tr>
                  </tbody>
                </Table>
                <>
                  <Button color="success" onClick={this.Create}>
                    Create
                  </Button>
                </>
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
    }))(CreateExtProjxTeam),
)
