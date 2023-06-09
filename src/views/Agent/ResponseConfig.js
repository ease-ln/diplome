import React, { Component } from 'react'
import {
  Card,
  CardBody,
  Button,
  Input, 
  CustomInput,
  Container,
} from 'reactstrap'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { getData, localStorageKey } from "../../redux/utils";
import { actionCreator } from "../../redux/agents/action-creators";

import "../../scss/styles.css";

class ResponseConfig extends Component {
  state = {}

  handleChange = (key) => (e) => {
    this.setState({[key]: e.target.value})
  }

  handleCheck = (e) => {
    this.setState({isactive: e.target.checked})
  }

  save = async () => {
    const payload = {}
    for (const v in this.state){
      if (this.state[v] === "") {
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
    const method_id = this.props.match.params.id2
    try {
      const id = this.props.match.params.id3
      const token = getData(localStorageKey).token
      await actionCreator.putResponse(token, id, payload)()
      await actionCreator.fetchAgentResponses(token, method_id)(this.props.dispatch)
    }
    catch(e) {
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
    const {isactive, createdby, creationdate, updateby, lastupdate, configresponseid, ...responseStateData} = this.state
    return (
      <div className="animated fadeIn">
        <Card style={{ width: "100%", alignItems: "first baseline" }}>
        <h3 style={{ fontWeight: "bold", margin: "20px", marginBottom: "0px" }}>About respose</h3>
          <CardBody>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "0px" }}>
              <div className='row-info'>
                <Container className='info'>
                  <p className='header-small'>Response id</p>
                  <p>{configresponseid}</p>
                </Container>
                <Container className='info'>
                  <p className='header-small'>Creation date</p>
                  <p>{new Date(creationdate).toDateString()}</p>
                </Container>
              </div>
              <div className='row-info'>
                <Container className='info'>
                  <p className='header-small'>Created by</p>
                  <p>{createdby}</p>
                </Container>
                <Container className='info'>
                  <p className='header-small'>Last updated by</p>
                  {lastupdate && (<p>{new Date(lastupdate).toDateString()}</p>)}
                  {!lastupdate && (<p>None</p>)}
                </Container>
              </div>
              <div className='row-info'>
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
                <p style={{ marginBottom: "0px" }}>Parameter type:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="paramtype"
                  value={responseStateData.paramtype}
                  onChange={this.handleChange('paramtype')}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Response parameter:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="responseparam"
                  value={responseStateData.responseparam}
                  onChange={this.handleChange('responseparam')}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Parameter name:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="paramname"
                  value={responseStateData.paramname}
                  onChange={this.handleChange('paramname')}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Method ID:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="methodid"
                  value={responseStateData.methodid}
                  onChange={this.handleChange('methodid')}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Response is active:</p>
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
    response: fromJS(state.agents.get('response')).toJS(),
  }))(ResponseConfig),
)
