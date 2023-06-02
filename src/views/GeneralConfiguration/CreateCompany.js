import React, {Component} from 'react'
import {
  Card,
  CardBody,
  Input,
  Button,
  Container,
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {getData, localStorageKey} from "../../redux/utils";
import {actionCreator} from "../../redux/generalConfiguration/action-creators";

class CreateCompany extends Component {
  state = {
    isactive: false,
    companyname: '',
    modified: false,
  }

  handleChange = (k) => (e) => {
    const key = k.toLowerCase()
    this.setState({[key]: e.target.value, modified: true})
  }

  handleCheck = (e) => {
    this.setState({isactive: e.target.checked})
  }

  Create = async () => {
    const payload = {
      ...(this.state)
    }
    for (const v in payload){
      if (payload[v] === "") payload[v] = null
      if (payload[v] === false) payload[v] = "N"
      if (payload[v] === true) payload[v] = "Y"
    }
    try{
      const token = getData(localStorageKey).token
      await actionCreator.postCompany(token, payload)()
      await actionCreator.fetchCompanies(token)(this.props.dispatch)
    }
    catch(e){
      console.log(e.stack)
    }
    finally{
      this.props.history.push("/company")
    }
  }
  render() {
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

    const {isactive, modified, ...agentStateData} = this.state
    return (
      <div className="animated fadeIn" style={{ margin: "0 auto", position: "relative"}}>
        <h3 style={{ marginBottom: "20px" }}>Create new company</h3>
        <Card style={{ margin: "0 auto", marginBottom: "40px", width: "482px", backgroundColor: "#F7FAFC" }}>
          <CardBody>
            <h4 style={style("h4")}>Company info</h4>
            {Object.keys(agentStateData).map((key) => {
              switch (key){
                case "companyname": return (
                  <Container style={style("flex-row")}>
                    <div>Company name</div>
                    <Input
                      type="text"
                      name={key}
                      value={agentStateData[key]}
                      style={style("input")}
                      onChange={this.handleChange(key)}
                    />
                  </Container>
                )
              } 
            })}
            <Container style={style("flex-row")}>
              <div>Active</div>
              <Input
                type="checkbox"
                name="isactive"
                value={isactive}
                style={{ marginLeft: "160px", }}
                onChange={this.handleCheck}
              />
            </Container>
          </CardBody>
        </Card>
        <>
          <Button 
            color="primary" 
            style={style("save")} 
            onClick={this.Create} 
            disabled={!modified}
          >
            <i className="fa fa-save fa-lg" style={{ marginRight: "7px" }}></i>
            Create company
          </Button>
        </>
      </div>
    )
  }
}

export default withRouter(
  connect()(CreateCompany),
)
