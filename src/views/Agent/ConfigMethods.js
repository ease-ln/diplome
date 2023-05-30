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
import {actionCreator} from "../../redux/agents/action-creators";

class ConfigMethods extends Component {
  state = {}

  handleChange = (k) => (e) => {
    const key = k.toLowerCase()
    this.setState({[key]: e.target.value})
  }
  handleCheck = (e) => {
    const key = "isactive"
    this.setState({[key]: e.target.checked})
  }
  goToDetails = () => {
    this.props.history.push(this.props.history.location.pathname + '/details')
  }
  goToResponses = () => {
    this.props.history.push(this.props.history.location.pathname + '/responses')
  }
  save = async () => {
    const payload = {}
    for (const v in this.state){
      if(this.state[v] === ""){payload[v] = null;continue;}
      if(v ==="isactive"){payload[v] = this.state[v] ? "Y" : "N";continue;}
      if(v === "createdby")continue
      if(v === "creationdate")continue
      payload[v] = this.state[v]
    }
    const agent_id = this.props.match.params.id
    try {
      const id = this.props.match.params.id2
      const token = getData(localStorageKey).token
      await actionCreator.putMethod(token, id, payload)()
      await actionCreator.fetchAgentMethods(token, agent_id)(this.props.dispatch)
    }
    catch (e) {
      console.log(e.stack)
    }
    finally {
      const url = `/agent/${agent_id}/methods/`
      this.props.history.push(url)
    }
  }
  remove = async () => {
    const agent_id = this.props.match.params.id
    try {
      const id = this.props.match.params.id2
      const token = getData(localStorageKey).token
      await actionCreator.deleteMethod(token, id)()
      await actionCreator.fetchAgentMethods(token, agent_id)(this.props.dispatch)
    }
    catch (e) {
      console.log(e.stack)
    }
    finally {
      const url = `/agent/${agent_id}/methods/`
      this.props.history.push(url)
    }
  }
  async componentDidMount(){
    const token = getData(localStorageKey).token;
    const id = this.props.match.params.id2
    await actionCreator.getMethod(token, id)(this.props.dispatch)
    const obj = {}
    Object.entries(this.props.method).forEach(([k,v])=>{
      if(k==="configParameters")return;
      if(k==="isactive")obj[k] = v === "Y"
      else obj[k] = v
    })
    this.setState(obj)
  }
  render() {
    const {isactive, methodid, lastupdate, updateby, creationdate, agentid, createdby, ...agentStateData} = this.state
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                Change Method's config info
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  <tr>
                    <td>
                      Method id
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="methodid"
                        disabled
                        value={methodid}
                        onChange={this.handleChange("methodid")}
                      />
                    </td>
                  </tr>
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
                      is Active
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
                  <Button color="secondary" onClick={this.goToResponses}>
                    Go to response config
                  </Button>
                  <Button color="secondary" onClick={this.goToDetails}>
                    Go to config details
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
    method: fromJS(state.agents.get('method')).toJS(),
  }))(ConfigMethods),
)
