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
import {actionCreator as agent_actions} from "../../redux/agents/action-creators"
import {actionCreator} from "../../redux/generalConfiguration/action-creators";
import {fromJS} from "immutable";

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
  Create = async () => {
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
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                Create Agent x Company Config
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
    }))(CreateAgentsxCompany),
)
