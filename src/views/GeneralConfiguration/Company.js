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
import { actionCreator } from "../../redux/generalConfiguration/action-creators";

import "../../scss/styles.css";

class Company extends Component {
  state = {}

  handleChange = (e) => {
    this.setState({ companyname: e.target.value })
  }

  handleCheck = (e) => {
    this.setState({ isactive: e.target.checked })
  }

  goToAgents_x_company = () => {
    this.props.history.push(this.props.history.location.pathname + '/agxcom')
  }

  goToTeams = () => {
    this.props.history.push(this.props.history.location.pathname + '/teams')
  }

  save = async () => {
    const payload = {};
    for (const v in this.state){
      if (this.state[v] === ""){ 
        payload[v] = null; 
        continue;
      }
      if (v ==="isactive") {
        payload[v] = this.state[v] ? "Y" : "N"; 
        continue;
      }
      if (v === "updateby") continue;
      if (v === "createdby") continue;
      if (v === "lastupdate") continue;
      if (v === "creationdate") continue;
      payload[v] = this.state[v];
    }
    try {
      const id = this.props.match.params.id1;
      const token = getData(localStorageKey).token;
      await actionCreator.putCompany(token, id, payload)();
      await actionCreator.fetchCompanies(token)(this.props.dispatch);
    }
    catch(e) {
      console.log(e.stack);
    }
    finally {
      const url = `/company`;
      this.props.history.push(url);
    }
  }

  remove = async () => {
    try {
      const id = this.props.match.params.id1;
      const token = getData(localStorageKey).token;
      await actionCreator.deleteCompany(token, id)();
      await actionCreator.fetchCompanies(token)(this.props.dispatch);
    }
    catch(e) {
      console.log(e.stack);
    }
    finally {
      const url = `/company`;
      this.props.history.push(url);
    }
  }

  async componentDidMount(){
    const token = getData(localStorageKey).token;
    const id = this.props.match.params.id1;
    await actionCreator.getCompany(token, id)(this.props.dispatch);
    const obj = {};
    Object.entries(this.props.company).forEach(([k, v]) => {
      if (k === "isactive") obj[k] = v === "Y"
      else obj[k] = v
    })
    this.setState(obj);
  }

  render() {
    const {isactive, companyid, creationdate, createdby, lastupdate, updateby, ...companyStateData} = this.state
    return (
      <div className="animated fadeIn">
        <Card style={{ width: "100%", alignItems: "first baseline" }}>
        <h3 style={{ fontWeight: "bold", margin: "20px", marginBottom: "0px" }}>About company</h3>
          <CardBody>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "0px" }}>
              <div className='row-info'>
                <Container className='info'>
                  <p className='header-small'>Company id</p>
                  <p>{companyid}</p>
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
                <p style={{ marginBottom: "0px" }}>Company name:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="companyname"
                  value={companyStateData.companyname}
                  onChange={this.handleChange}
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
                    onChange={this.handleCheck}
                  />
              </Container>
            </div>
            <hr/>
            <div style={{ width: "770px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", marginTop: "20px" }}>
                <Button color="danger" style={{ width: "fit-content" }} onClick={this.remove}>
                  Delete company
                </Button>
                <Button color="secondary" onClick={this.goToAgents_x_company}>
                  Go to Integrations
                </Button>
                <Button color="secondary" style={{ marginLeft: "15px" }} onClick={this.goToTeams}>
                  Go to Teams
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
    company: fromJS(state.configuration.get('company')).toJS(),
  }))(Company),
)
