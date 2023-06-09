import React, { useState } from 'react'
import {
  Card,
  CardBody,
  Input,
  Button,
  Container,
  CustomInput,
} from 'reactstrap'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { getData, localStorageKey } from "../../redux/utils";
import { actionCreator } from "../../redux/generalConfiguration/action-creators";

import "../../scss/styles.css";

function CreateCompany(props) {
  const [companyData, setCompanyData] = useState({
    isactive: false,
    companyname: '',
  })
  const [isModified, setIsModified] = useState(false);

  const handleChange =  (e) => {
    const value = e.target.value;
    setCompanyData(previousState => {
      return { ...previousState, companyname: value }});
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

  const {isactive, ...companyStateData} = companyData;
  return (
    <div className="animated fadeIn" style={{ margin: "0 auto", position: "relative"}}>
      <Card style={{ width: "100%", alignItems: "first baseline" }}>
        <h3 style={{ fontWeight: "bold", margin: "20px", marginBottom: "0px" }}>Create company</h3>
          <CardBody>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Company name:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="companyname"
                  value={companyStateData.companyname}
                  onChange={handleChange}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Company is active:</p>
              </Container>
              <Container className='flex-row info'>
                <CustomInput
                    id="isactive"
                    type="switch"
                    name="isactive"
                    checked={isactive}
                    onChange={handleCheck}
                  />
              </Container>
            </div>
            <hr/>
            <Button color="primary" onClick={submit} disabled={!isModified}>
              <i className="fa fa-save fa-lg" style={{ marginRight: "7px" }}></i>
              Create company
            </Button>
          </CardBody>
        </Card>
    </div>
  )
}

export default withRouter(
  connect()(CreateCompany),
)
