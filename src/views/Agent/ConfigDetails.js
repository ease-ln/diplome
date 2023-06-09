import React, {Component} from 'react'
import {
  Card,
  CardBody,
  Container,
  Button,
  Input, 
  CustomInput,
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {fromJS} from 'immutable'
import {getData, localStorageKey} from "../../redux/utils";
import {actionCreator} from "../../redux/agents/action-creators";

import "../../scss/styles.css";

class ConfigDetails extends Component {
  state = {}

  handleChange = (k) => (e) => {
    const key = k.toLowerCase()
    this.setState({[key]: e.target.value})
  }
  handleCheck = (e) => {
    const key = "isactive"
    this.setState({[key]: e.target.checked})
  }
  save = async ()=>{
    const method_id = this.props.match.params.id2
    const payload = {}
    for (const v in this.state){
      if(this.state[v] === ""){payload[v] = null;continue;}
      if(v ==="isactive"){payload[v] = this.state[v] ? "Y" : "N";continue;}
      if(v === "createdby")continue
      if(v === "creationdate")continue
      payload[v] = this.state[v]
    }
    try {
      const id = this.props.match.params.id3
      const token = getData(localStorageKey).token
      await actionCreator.putDetail(token, id, payload)()
      await actionCreator.fetchAgentDetails(token, method_id)(this.props.dispatch)
    }
    catch (e) {
      console.log(e.stack)
    }
    finally {
      const url = `/agent/${this.props.match.params.id}/methods/${method_id}/details`
      this.props.history.push(url)
    }
  }
  remove = async ()=>{
    const id = this.props.match.params.id3
    const method_id = this.props.match.params.id2
    const token = getData(localStorageKey).token
    await actionCreator.deleteDetail(token, id)()
    await actionCreator.fetchAgentDetails(token, method_id)(this.props.dispatch)
    const url = `/agent/${this.props.match.params.id}/methods/${method_id}/details`
    this.props.history.push(url)
  }
  async componentDidMount(){
    const token = getData(localStorageKey).token;
    const id = this.props.match.params.id3
    await actionCreator.getDetail(token, id)(this.props.dispatch)
    const obj = {}
    Object.entries(this.props.detail).forEach(([k,v])=>{
      if(k==="isactive")obj[k] = v === "Y"
      else obj[k] = v
    })
    this.setState(obj)
  }
  render() {
    const {isactive, updateby, lastupdate, createdby, creationdate, methodid, configDetId,  ...detailStateData} = this.state
    return (
      <div className="animated fadeIn">
        <Card style={{ width: "100%", alignItems: "first baseline" }}>
        <h3 style={{ fontWeight: "bold", margin: "20px", marginBottom: "0px" }}>About detail</h3>
          <CardBody>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "0px" }}>
              <div className='row-info'>
                <Container className='info'>
                  <p className='header-small'>Detail id</p>
                  <p>{configDetId}</p>
                </Container>
                <Container className='info'>
                  <p className='header-small'>Method id</p>
                  <p>{methodid}</p>
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
                <p style={{ marginBottom: "0px" }}>Parameter type:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="paramtype"
                  value={detailStateData.paramtype}
                  onChange={this.handleChange('paramtype')}
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
                  value={detailStateData.requesttype}
                  onChange={this.handleChange('requesttype')}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Default value:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="defaultvalue"
                  value={detailStateData.defaultvalue}
                  onChange={this.handleChange('defaultvalue')}
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
                  value={detailStateData.paramname}
                  onChange={this.handleChange('paramname')}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Request parameter:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="requestparam"
                  value={detailStateData.requestparam}
                  onChange={this.handleChange('requestparam')}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Detail is active:</p>
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
    detail: fromJS(state.agents.get('detail')).toJS(),
  }))(ConfigDetails),
)
