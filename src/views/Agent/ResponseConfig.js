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

class ResponseConfig extends Component {
  state = {}

  handleChange = (k) => (e) => {
    const key = k.toLowerCase()
    this.setState({[key]: e.target.value})
  }
  handleCheck = (e) => {
    const key = "isactive"
    this.setState({[key]: e.target.checked})
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
    const method_id = this.props.match.params.id2
    try{
      const id = this.props.match.params.id3
      const token = getData(localStorageKey).token
      await actionCreator.putResponse(token, id, payload)()
      await actionCreator.fetchAgentResponses(token, method_id)(this.props.dispatch)
    }
    catch(e){
      console.log(e.stack)
    }
    finally {
      const url = `/agent/${this.props.match.params.id}/methods/${method_id}/responses`
      this.props.history.push(url)
    }
  }
  remove = async () => {
    const method_id = this.props.match.params.id2
    try {
      const id = this.props.match.params.id3
      const token = getData(localStorageKey).token
      await actionCreator.deleteResponse(token, id)()
      await actionCreator.fetchAgentResponses(token, method_id)(this.props.dispatch)
    }
    finally {
      const url = `/agent/${this.props.match.params.id}/methods/${method_id}/responses`
      this.props.history.push(url)
    }
  }
  async componentDidMount(){
    const token = getData(localStorageKey).token;
    const id = this.props.match.params.id3
    await actionCreator.getResponse(token, id)(this.props.dispatch)
    const obj = {}
    Object.entries(this.props.response).forEach(([k,v])=>{
      if(k==="isactive")obj[k] = v === "Y"
      else obj[k] = v
    })
    this.setState(obj)
  }
  render() {
    const {isactive, createdby, creationdate, updateby, lastupdate, configresponseid, ...agentStateData} = this.state
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                Change Response's config info
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  <tr>
                    <td>
                      Config Response id
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="configresponseid"
                        disabled
                        value={configresponseid}
                        onChange={this.handleChange("configresponseid")}
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
    response: fromJS(state.agents.get('response')).toJS(),
  }))(ResponseConfig),
)
