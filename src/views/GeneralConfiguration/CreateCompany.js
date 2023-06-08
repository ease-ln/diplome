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
import { getData, localStorageKey } from "../../redux/utils";
import { actionCreator } from "../../redux/generalConfiguration/action-creators";

function CreateCompany(props) {
  const [companyData, setCompanyData] = useState({
    isactive: false,
    companyname: '',
  })
  const [isModified, setIsModified] = useState(false);

  const handleChange = (k) => (e) => {
    const key = k.toLowerCase()
    const value = e.target.value;
    setCompanyData(previousState => {
      return { ...previousState, [key]: value }});
    setIsModified(true);
  }

  const handleCheck = (e) => {
    const value = e.target.checked;
    setCompanyData(previousState => {
      return { ...previousState, isactive: value }});
  }

  const submit = async () => {
    const payload = {
      ...(companyData)
    }
    for (const v in payload){
      if (payload[v] === "") payload[v] = null;
      if (payload[v] === false) payload[v] = "N";
      if (payload[v] === true) payload[v] = "Y";
    }
    try{
      const token = getData(localStorageKey).token;
      await actionCreator.postCompany(token, payload)();
      await actionCreator.fetchCompanies(token)(props.dispatch);
    }
    catch(e){
      console.log(e.stack);
    }
    finally{
      props.history.push("/company");
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

  const {isactive, ...companyStateData} = companyData;
  return (
    <div className="animated fadeIn" style={{ margin: "0 auto", position: "relative"}}>
      <h3 style={{ marginBottom: "20px" }}>Create new company</h3>
      <Card style={{ margin: "0 auto", marginBottom: "40px", width: "482px", backgroundColor: "#F7FAFC" }}>
        <CardBody>
          <h4 style={style("h4")}>Company info</h4>
          {Object.keys(companyStateData).map((key) => {
            switch (key){
              case "companyname": return (
                <Container style={style("flex-row")}>
                  <div>Company name</div>
                  <Input
                    type="text"
                    name={key}
                    value={companyStateData[key]}
                    style={style("input")}
                    onChange={handleChange(key)}
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
          Create company
        </Button>
      </>
    </div>
  )
}

export default withRouter(
  connect()(CreateCompany),
)
