import React, { Component } from 'react'
import {
  Card,
  CardBody,
  Container,
  Button,
  Input, 
  CustomInput,
} from 'reactstrap'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { getData, localStorageKey } from "../../redux/utils";
import { actionCreator } from "../../redux/agents/action-creators";

import "../../scss/styles.css";

class ConfigMethods extends Component {
  state = {}

  handleChange = (key) => (e) => {
    this.setState({[key]: e.target.value})
  }
  handleCheck = (e) => {
    this.setState({isactive: e.target.checked})
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
      if (this.state[v] === ""){
        payload[v] = null;
        continue;
      }
      if (v ==="isactive"){
        payload[v] = this.state[v] ? "Y" : "N";
        continue;
      }
      if (v === "createdby") continue;
      if (v === "creationdate") continue;
      payload[v] = this.state[v];
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
      if (k === "configParameters") return;
      if (k === "isactive") obj[k] = v === "Y"
      else obj[k] = v
    })
    this.setState(obj)
  }
  render() {
    const {isactive, methodid, lastupdate, updateby, creationdate, agentid, createdby, ...methodStateData} = this.state
    return (
      <div className="animated fadeIn">
        <Card style={{ width: "100%", alignItems: "first baseline" }}>
        <h3 style={{ fontWeight: "bold", margin: "20px", marginBottom: "0px" }}>Config Method</h3>
          <CardBody>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "0px" }}>
              <div className='row-info'>
                <Container className='info'>
                  <p className='header-small'>Method id</p>
                  <p>{methodid}</p>
                </Container>
                <Container className='info'>
                  <p className='header-small'>Agent id</p>
                  <p>{agentid}</p>
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
                <p style={{ marginBottom: "0px" }}>Operation:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="operation"
                  value={methodStateData.operation}
                  onChange={this.handleChange('operation')}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Request Type:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="requesttype"
                  value={methodStateData.requesttype}
                  onChange={this.handleChange('requesttype')}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Endpoint:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="endpoint"
                  value={methodStateData.endpoint}
                  onChange={this.handleChange('endpoint')}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Description:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="description"
                  value={methodStateData.description}
                  onChange={this.handleChange('description')}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Method is active:</p>
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
                  Delete method
                </Button>
                <Button color="secondary" onClick={this.goToResponses}>
                  Go to Response Config
                </Button>
                <Button color="secondary" style={{ marginLeft: "15px" }} onClick={this.goToDetails}>
                  Go to Config Details
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
    method: fromJS(state.agents.get('method')).toJS(),
  }))(ConfigMethods),
)
