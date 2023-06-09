import React, { useState } from 'react'
import {
  Card,
  CardBody,
  Input,
  Button,
  Container,
  CustomInput,
  Alert,
} from 'reactstrap'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { actionCreator } from "../../redux/agents/action-creators";
import { getData, localStorageKey } from "../../redux/utils";

import "../../scss/styles.css";

function CreateNewAgent(props) {
  const [agentData, setAgentData] = useState({
    agentname: '',
    description: '',
    isconnected: false,
    sourcetype: '',
    dbschemasource: '',
    repoidfield: '',
    oauthuri: '',
    authenticationmethod: '',
    accesstokenendpoint: '',
    authorizationbaseurl: '',
    requesttokenendpoint: '',
    apikey: '',
    apisecret: '',
  })

  const [isModified, setIsModified] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setAgentData(previousState => {
      return { ...previousState, [key]: value }});
    setIsModified(true);
    setError("");
  }

  const handleCheck = (e) => {
    const value = e.target.checked;
    setAgentData(previousState => {
      return { ...previousState, isconnected: value }});
  }

  const submit = async () => {
    if (agentData.agentname === "") {
      setError("empty agent name");
      return ;
    }
    const payload = {
      ...(agentData)
    }
    for (const v in payload){
      if (payload[v] === "") payload[v] = null;
      if (payload[v] === false) payload[v] = "N";
      if (payload[v] === true) payload[v] = "Y";
    }
    try {
      const token = getData(localStorageKey).token;
      await actionCreator.postAgent(token, payload)();
      await actionCreator.fetchAgents(token, 0)(props.dispatch);
    }
    catch (e) {
      setError(e);
    }
    finally {
      props.history.push("/agentMenu");
    }
  }

  const {isconnected, ...agentStateData} = agentData;
  
  return (
    <div className="animated fadeIn" style={{ margin: "0 auto", position: "relative" }}>
      <Card style={{ width: "100%", alignItems: "first baseline" }}>
        <h3 style={{ fontWeight: "bold", margin: "20px", marginBottom: "0px" }}>Create integration</h3>
          <CardBody>
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
                  onChange={handleChange("agentname")}
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
                  onChange={handleChange("description")}
                />
              </Container>
            </div>
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
                  onChange={handleChange("apikey")}
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
                  onChange={handleChange("authorizationbaseurl")}
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
                  onChange={handleChange("oauthuri")}
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
                  onChange={handleChange("apisecret")}
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
                  onChange={handleChange("accesstokenendpoint")}
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
                  onChange={handleChange("repositoryid")}
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
                  onChange={handleChange("sourcetype")}
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
                  onChange={handleChange("authenticationmethod")}
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
                  onChange={handleChange("dbschemasource")}
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
                  onChange={handleChange("requesttokenendpoint")}
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
                    onChange={handleCheck}
                  />
              </Container>
            </div>
            <hr/>
            {error === "empty agent name" && (
              <Alert color="danger" style={{ marginBottom: "15px", marginTop: "-7px" }}>
                Agent name cannot be empty
              </Alert>
            )}
            <Button color="primary" onClick={submit} disabled={!isModified || error === "empty agent name"}>
              <i className="fa fa-save fa-lg" style={{ marginRight: "7px" }}></i>
              Create integration
            </Button>
          </CardBody>
        </Card>
    </div>
  )
}

export default withRouter(
  connect()(CreateNewAgent),
)
