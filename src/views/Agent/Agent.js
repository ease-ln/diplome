import React, {Component} from 'react'
import {
  Card,
  CardBody,
  Container,
  Button,
  Input, CustomInput,
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {fromJS} from 'immutable'
import {actionCreator} from '../../redux/agents/action-creators'
import {getData, localStorageKey} from "../../redux/utils";

import "../../scss/styles.css";

class Agent extends Component {
  state = {creationdate: ""}

  handleChange = (key) => (e) => {
    this.setState({[key]: e.target.value})
  }
  handleCheck = (e) => {
    this.setState({isconnected: e.target.checked})
  }
  goToMethods = () => {
    this.props.history.push(this.props.history.location.pathname + '/methods')
  }

  save = async () => {
    const payload = {}
    for (const v in this.state){
      if (this.state[v] === "") { 
        payload[v] = null;
        continue; 
      }
      if (v ==="isconnected") { 
        payload[v] = this.state[v] ? "Y" : "N";
        continue;
      }
      if (v === "createdby") continue;
      if (v === "creationdate") continue;
      payload[v] = this.state[v];
    }
    try{
      const id = this.props.match.params.id;
      const token = getData(localStorageKey).token;
      await actionCreator.putAgent(token, id, payload)();
      await actionCreator.fetchAgents(token, 0)(this.props.dispatch);
    }
    catch(e){
      console.log(e.stack);
    }
    finally {
      this.props.history.push('/agentMenu');
    }
  }
  remove = async () => {
    try{
      const id = this.props.match.params.id;
      const token = getData(localStorageKey).token;
      await actionCreator.deleteAgent(token, id)();
      await actionCreator.fetchAgents(token, 0)(this.props.dispatch);
    }
    catch(e){
      console.log(e.stack);
    }
    finally {
      this.props.history.push('/agentMenu');
    }
  }
  async componentDidMount(){
    const token = getData(localStorageKey).token;
    const id = this.props.match.params.id;
    await actionCreator.getAgent(token, id)(this.props.dispatch);
    const obj = {};
    Object.entries(this.props.agent).forEach(([k, v]) => {
      if (k === "isconnected") obj[k] = v === "Y"
      else obj[k] = v
    })
    this.setState(obj);
  }
  render() {
    const {isconnected, lastupdate, updateby, creationdate, agentid, createdby, ...agentStateData} = this.state;
    return (
      <div className="animated fadeIn">
        <Card style={{ width: "100%", alignItems: "first baseline" }}>
        <h3 style={{ fontWeight: "bold", margin: "20px", marginBottom: "0px" }}>About integration</h3>
          <CardBody>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "0px" }}>
              <div className='row-info'>
                <Container className='info'>
                  <p className='header-small'>Integration id</p>
                  <p>{agentid}</p>
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
                <p style={{ marginBottom: "0px" }}>API key:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="apikey"
                  value={agentStateData.apikey}
                  onChange={this.handleChange("apikey")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Authorization base URL:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="authorizationbaseurl"
                  value={agentStateData.authorizationbaseurl}
                  onChange={this.handleChange("authorizationbaseurl")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>OAuth URI:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="oauthuri"
                  value={agentStateData.oauthuri}
                  onChange={this.handleChange("oauthuri")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>API secret:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="apisecret"
                  value={agentStateData.apisecret}
                  onChange={this.handleChange("apisecret")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Access token endpoint:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="accesstokenendpoint"
                  value={agentStateData.accesstokenendpoint}
                  onChange={this.handleChange("accesstokenendpoint")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Repository ID:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="repositoryid"
                  value={agentStateData.repositoryid}
                  onChange={this.handleChange("repositoryid")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Agent name:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="agentname"
                  value={agentStateData.agentname}
                  onChange={this.handleChange("agentname")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Source type:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="sourcetype"
                  value={agentStateData.sourcetype}
                  onChange={this.handleChange("sourcetype")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Authentication method:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="authenticationmethod"
                  value={agentStateData.authenticationmethod}
                  onChange={this.handleChange("authenticationmethod")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>DB schema source:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="dbschemasource"
                  value={agentStateData.dbschemasource}
                  onChange={this.handleChange("dbschemasource")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Request token endpoint:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="requesttokenendpoint"
                  value={agentStateData.requesttokenendpoint}
                  onChange={this.handleChange("requesttokenendpoint")}
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
                  value={agentStateData.description}
                  onChange={this.handleChange("description")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Integration is connected:</p>
              </Container>
              <Container className='flex-row info'>
                <CustomInput
                    id="isconnected"
                    type="switch"
                    name="isconnected"
                    checked={isconnected}
                    onChange={this.handleCheck}
                  />
              </Container>
            </div>
            <hr/>
            <div style={{ width: "1025px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", marginTop: "20px" }}>
                <Button color="danger" style={{ width: "fit-content" }} onClick={this.remove}>
                  Delete integration
                </Button>
                <Button color="secondary" style={{ marginLeft: "15px" }} onClick={this.goToMethods}>
                  Go to Methods
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
      agent: fromJS(state.agents.get('agent')).toJS(),
    }))(Agent),
)
