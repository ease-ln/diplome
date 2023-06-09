import React, { useState } from 'react'
import {
  Card,
  CardBody,
  Input,
  Button,
  Container,
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
  const [, setError] = useState('');

  const handleChange = (k) => (e) => {
    const key = k.toLowerCase();
    const value = e.target.value;
    setAgentData(previousState => {
      return { ...previousState, [key]: value }});
    setIsModified(true);
  }

  const handleCheck = (e) => {
    const value = e.target.checked;
    setAgentData(previousState => {
      return { ...previousState, isconnected: value }});
  }

  const submit = async () => {
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
      await actionCreator.postAgent(token, payload)()
      .then((response) => console.log(response));
      await actionCreator.fetchAgents(token, 0)(props.dispatch);
    }
    catch (e) {
      setError(e);
      console.log(e.stack);
    }
    finally {
      props.history.push("/agentMenu");
    }
  }

  const {isconnected, ...agentStateData} = agentData;
  
  return (
    <div className="animated fadeIn" style={{ margin: "0 auto", position: "relative" }}>
      <h3 style={{ marginBottom: "20px" }}>Create new agent</h3>
      <Card style={{ margin: "0 auto", marginBottom: "40px", width: "482px", backgroundColor: "#F7FAFC" }}>
        <CardBody>
          <h4 className="h4">Agent info</h4>
          {Object.keys(agentStateData).map((key) => {
            switch (key){
              case "agentname": return (
                <Container className="flex-row">
                  <div>Agent name</div>
                  <Input
                    className="input"
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "description": return (
                <Container className="flex-row">
                  <div>Description</div>
                  <Input
                    className="input"
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "sourcetype": return (
                <Container className="flex-row">
                  <div>Source type</div>
                  <Input
                    className="input"
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "dbschemasource": return (
                <Container className="flex-row">
                  <div>DB schema source</div>
                  <Input
                    className="input"
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "repoidfield": return (
                <Container className="flex-row">
                  <div>Repository ID</div>
                  <Input
                    className="input"
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "oauthuri": return (
                <Container className="flex-row">
                  <div>OAuth URI</div>
                  <Input
                    className="input"
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "authenticationmethod": return (
                <Container className="flex-row">
                  <div>Authentication method</div>
                  <Input
                    className="input"
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "accesstokenendpoint": return (
                <Container className="flex-row">
                  <div>Access token</div>
                  <Input
                    className="input"
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "authorizationbaseurl": return (
                <Container className="flex-row">
                  <div>Authorization base URL</div>
                  <Input
                    className="input"
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "requesttokenendpoint": return (
                <Container className="flex-row">
                  <div>Request token</div>
                  <Input
                    className="input"
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "apikey": return (
                <Container className="flex-row">
                  <div>API key</div>
                  <Input
                    className="input"
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "apisecret": return (
                <Container className="flex-row">
                  <div>API secret</div>
                  <Input
                    className="input"
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
            } 
          })}
          <Container className="flex-row">
            <div>Connected</div>
            <Input
              type="checkbox"
              name="isconnected"
              value={isconnected}
              style={{ marginLeft: "160px", }}
              onChange={handleCheck}
            />
          </Container>
        </CardBody>
      </Card>
      <>
        <Button 
          className="save"
          color="primary" 
          onClick={submit} 
          disabled={!isModified}
        >
          <i className="fa fa-save fa-lg" style={{ marginRight: "7px" }}></i>
          Create agent
        </Button>
      </>
    </div>
  )
}

export default withRouter(
  connect()(CreateNewAgent),
)
