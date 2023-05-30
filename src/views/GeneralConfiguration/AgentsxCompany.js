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
  CustomInput
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {fromJS} from 'immutable'
import {getData, localStorageKey} from "../../redux/utils";
import {actionCreator as agent_actions} from "../../redux/agents/action-creators"
import {actionCreator} from "../../redux/generalConfiguration/action-creators";

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
    const agents = this.props.agents
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                Change Agent x Company's config info
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
                      Company id
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="companyid"
                        disabled
                        value={companyid}
                        onChange={this.handleChange("companyid")}
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
    agxCom: fromJS(state.configuration.get('agentsxcompany')).toJS(),
    agents: fromJS(state.agents.get('agents')).toJS()
  }))(AgentsxCompany),
)
