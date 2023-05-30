import React, {Component} from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Input, CustomInput,
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {fromJS} from 'immutable'
import {getData, localStorageKey} from "../../redux/utils";
import {actionCreator as agent_actions} from "../../redux/agents/action-creators"
import {actionCreator} from "../../redux/generalConfiguration/action-creators";

class ExternalProjectxTeam extends Component {
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
    const id = this.props.match.params.id3
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
    const team_id = this.props.match.params.id2
    const company_id = this.props.match.params.id1
    try{
      const token = getData(localStorageKey).token
      await actionCreator.putExtProjxTeam(token, id, payload)()
      await actionCreator.fetchExtProjxTeams(token, team_id)(this.props.dispatch)
    }
    catch(e){
      console.log(e.stack)
    }
    finally{
      const url = `/company/${company_id}/teams/${team_id}/extprojxteams`
      this.props.history.push(url)
    }
  }
  remove = async () => {
    const team_id = this.props.match.params.id2
    try{
      const id = this.props.match.params.id3
      const token = getData(localStorageKey).token
      await actionCreator.deleteExtProjxTeam(token, id)()
      await actionCreator.fetchExtProjxTeams(token, team_id)(this.props.dispatch)
    }
    catch(e){
      console.log(e.stack)
    }
    finally{
      const company_id = this.props.match.params.id1
      const url = `/company/${company_id}/teams/${team_id}/extprojxteams`
      this.props.history.push(url)
    }
  }
  async componentDidMount(){
    const token = getData(localStorageKey).token;
    const id = this.props.match.params.id3
    await actionCreator.getExtProjxTeam(token, id)(this.props.dispatch)
    await agent_actions.fetchAgents(token, 0)(this.props.dispatch)
    const obj = {}
    Object.entries(this.props.extProjxTeam).forEach(([k,v])=>{
      if(k==="isactive")obj[k] = v === "Y"
      else obj[k] = v
    })
    this.setState(obj)
  }
  render() {
    const {isactive, configid, teamid, creationdate, agentid, createdby, lastupdate, updateby, ...agentStateData} = this.state
    const agents = this.props.agents
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                Change External Project x Team's config info
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  <tr>
                    <td>
                      Config id
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="configid"
                        disabled
                        value={configid}
                        onChange={this.handleChange("configid")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Team id
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="teamid"
                        disabled
                        value={teamid}
                        onChange={this.handleChange("teamid")}
                      />
                    </td>
                  </tr>
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
                    <td>
                      Creation Date
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="creationdate"
                        disabled
                        value={creationdate}
                        onChange={this.handleChange("creationdate")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Creation Date
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="creationdate"
                        disabled
                        value={creationdate===null ? "" : new Date(creationdate).toDateString()}
                        onChange={this.handleChange("creationdate")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Created By
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="createdby"
                        disabled
                        value={createdby===null ? "" : createdby}
                        onChange={this.handleChange("createdby")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Last Update
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="lastupdate"
                        disabled
                        value={lastupdate===null ? "" : new Date(lastupdate).toDateString()}
                        onChange={this.handleChange("lastupdate")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Updated By
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="updateby"
                        disabled
                        value={updateby===null ? "" : updateby}
                        onChange={this.handleChange("updateby")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Is Active
                    </td>
                    <td>
                      <CustomInput
                        id="isactive"
                        type="switch"
                        name="isactive"
                        checked={isactive}
                        onChange={this.handleCheck}
                      />
                    </td>
                  </tr>
                  </tbody>
                </Table>
                <>
                  <Button color="success" onClick={this.save}>
                    Save
                  </Button>
                  <Button color="danger" onClick={this.remove}>
                    Delete
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
    extProjxTeam: fromJS(state.configuration.get('extprojxteam')).toJS(),
    agents: fromJS(state.agents.get('agents')).toJS()
  }))(ExternalProjectxTeam),
)
