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
import {actionCreator} from '../../redux/agents/action-creators'
import {getData, localStorageKey} from "../../redux/utils";

class Agent extends Component {
  state = {creationdate: ""}

  handleChange = (k) => (e) => {
    const key = k.toLowerCase()
    this.setState({[key]: e.target.value})
  }
  handleCheck = (e) => {
    const key = "isconnected"
    this.setState({[key]: e.target.checked})
  }
  goToMethods = () => {
    this.props.history.push(this.props.history.location.pathname + '/methods')
  }

  save = async () => {
    const payload = {}
    for (const v in this.state){
      if(this.state[v] === ""){payload[v] = null;continue;}
      if(v ==="isconnected"){payload[v] = this.state[v] ? "Y" : "N";continue;}
      if(v === "createdby")continue
      if(v === "creationdate")continue
      payload[v] = this.state[v]
    }
    try{
      const id = this.props.match.params.id
      const token = getData(localStorageKey).token
      await actionCreator.putAgent(token, id, payload)()
      await actionCreator.fetchAgents(token, 0)(this.props.dispatch)
    }
    catch(e){
      console.log(e.stack)
    }
    finally {
      this.props.history.push('/agentMenu')
    }
  }
  remove = async () => {
    try{
      const id = this.props.match.params.id
      const token = getData(localStorageKey).token
      await actionCreator.deleteAgent(token, id)()
      await actionCreator.fetchAgents(token, 0)(this.props.dispatch)
    }
    catch(e){
      console.log(e.stack)
    }
    finally {
      this.props.history.push('/agentMenu')
    }
  }
  async componentDidMount(){
    const token = getData(localStorageKey).token;
    const id = this.props.match.params.id
    await actionCreator.getAgent(token, id)(this.props.dispatch)
    const obj = {}
    Object.entries(this.props.agent).forEach(([k,v])=>{
      if(k==="isconnected")obj[k] = v === "Y"
      else obj[k] = v
    })
    this.setState(obj)
  }
  render() {
    const {isconnected, lastupdate, updateby, creationdate, agentid, createdby, ...agentStateData} = this.state
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                Change Agent's config info
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  <tr>
                    <td>
                      Agent id
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="agentid"
                        disabled
                        value={agentid}
                        onChange={this.handleChange("agentid")}
                      />
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
                        value={createdby}
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
                      is Connected
                    </td>
                    <td>
                      <CustomInput
                        id="isconnected"
                        type="switch"
                        name="isconnected"
                        checked={isconnected}
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
                    <Button color="secondary" onClick={this.goToMethods}>
                      Go to config methods
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
      agent: fromJS(state.agents.get('agent')).toJS(),
    }))(Agent),
)
