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

  const style = (className) => {
    if (className === "save"){
      return {
        position: "absolute",
        top: "0px",
        right: "0px",
      }
    }
    if (className === "h4"){
      return {
        paddingRight: "0px",
        paddingLeft: "0px",
        marginBottom: "20px",
        color: "#73818F",
      }
    }
    if (className === "flex-row"){
      return {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: "0px",
        paddingLeft: "0px",
        marginBottom: "20px",
      }
    } 
    if (className === "input"){
      return {
        display: "inline-block", 
        verticalAlign: "middle",
        width: "280px",
      }
    }
  }

  const {isconnected, ...agentStateData} = agentData;
  
  return (
    <div className="animated fadeIn" style={{ margin: "0 auto", position: "relative" }}>
      <h3 style={{ marginBottom: "20px" }}>Create new agent</h3>
      <Card style={{ margin: "0 auto", marginBottom: "40px", width: "482px", backgroundColor: "#F7FAFC" }}>
        <CardBody>
          <h4 style={style("h4")}>Agent info</h4>
          {Object.keys(agentStateData).map((key) => {
            switch (key){
              case "agentname": return (
                <Container style={style("flex-row")}>
                  <div>Agent name</div>
                  <Input
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    style={style("input")}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "description": return (
                <Container style={style("flex-row")}>
                  <div>Description</div>
                  <Input
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    style={style("input")}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "sourcetype": return (
                <Container style={style("flex-row")}>
                  <div>Source type</div>
                  <Input
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    style={style("input")}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "dbschemasource": return (
                <Container style={style("flex-row")}>
                  <div>DB schema source</div>
                  <Input
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    style={style("input")}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "repoidfield": return (
                <Container style={style("flex-row")}>
                  <div>Repository ID</div>
                  <Input
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    style={style("input")}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "oauthuri": return (
                <Container style={style("flex-row")}>
                  <div>OAuth URI</div>
                  <Input
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    style={style("input")}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "authenticationmethod": return (
                <Container style={style("flex-row")}>
                  <div>Authentication method</div>
                  <Input
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    style={style("input")}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "accesstokenendpoint": return (
                <Container style={style("flex-row")}>
                  <div>Access token</div>
                  <Input
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    style={style("input")}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "authorizationbaseurl": return (
                <Container style={style("flex-row")}>
                  <div>Authorization base URL</div>
                  <Input
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    style={style("input")}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "requesttokenendpoint": return (
                <Container style={style("flex-row")}>
                  <div>Request token</div>
                  <Input
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    style={style("input")}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "apikey": return (
                <Container style={style("flex-row")}>
                  <div>API key</div>
                  <Input
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    style={style("input")}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
              case "apisecret": return (
                <Container style={style("flex-row")}>
                  <div>API secret</div>
                  <Input
                    type="text"
                    name={key}
                    value={agentStateData[key]}
                    style={style("input")}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
            } 
          })}
          <Container style={style("flex-row")}>
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
          color="primary" 
          style={style("save")} 
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
