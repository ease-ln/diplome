import React, { Component } from 'react'
import {
  Card,
  Badge,
  CardBody,
  Button,
} from 'reactstrap'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { getData, localStorageKey } from "../../redux/utils";
import { actionCreator } from "../../redux/generalConfiguration/action-creators";

import "../../scss/styles.css";

class MenuCompany extends Component {
  state = { companies: [] }

  createNewCompany = () => {
    this.props.history.push(this.props.history.location.pathname + '/create')
  }

  goToCompany = (id) => {
    this.props.history.push(this.props.history.location.pathname + '/' + id)
  }

  loadData(token) {
    let promise = new Promise(() => { 
      actionCreator.fetchCompanies(token)(this.props.dispatch).catch(error => {
        console.error('An error occurred:', error)});
    });
    return promise
  }
 

  async componentDidMount(){
    const token = getData(localStorageKey).token;
    this.loadData(token).catch(error => {
      console.error('An error occurred:', error);
    });
  }

  badge = (status) => {
    if (status === "Y") return (<Badge color="success">Active</Badge>);
    else return (<Badge color="danger">Not active</Badge>)
  }

  render() {
    const companies = this.props.companies
    companies.sort((a, b) => a.companyid - b.companyid)

    if (companies.length === 0) {
      return (
        <div className="animated fadeIn">
          <h3 style={{ marginBottom: "20px" }}>There are no companies yet</h3>
          <Button color="primary" onClick={this.createNewCompany}>Create new company</Button>
        </div>
    )} 
    else return (
      <div className="animated fadeIn">
<<<<<<< HEAD
          <Card>
          <h3 style={{ fontWeight: "bold", margin: "20px", marginBottom: "0px" }}>Companies</h3>
            <CardBody className="card-grid">
              {companies.map((value, idx) => {
                return (
                  <Card key={idx} onClick={ () => {this.goToCompany(value.companyid)} } style={{ padding: "10px", margin: "10px" }}>
                    <div>{this.badge(value.isactive)}</div>
                    <Badge color="secondary">Company id: {value.companyid}</Badge>
                    <i className="icon-arrow-right icons position-right"></i>
                    <div style={{ fontWeight: "bold", marginBottom: "10px" }}>{value.companyname}</div>
                    {value.updateby && (<p style={{ color: "#73818F" }}>Last updated by {value.updateby}</p>)}
                    {!value.updateby && (<p style={{ color: "#73818F" }}>Has not been updated</p>)}
                  </Card>
                )
              })}
            </CardBody>
            <Button 
              color="primary" 
              className="save" 
              style={{ margin: "17px", marginBottom: "0px", paddingTop: "5px", paddingBottom: "6px" }} 
              onClick={this.createNewCompany}
            >
              <i className="icon-plus icons" style={{ marginRight: "7px" }}></i>
              Create new company
            </Button>
          </Card>
=======
        <Row>
          <Col lg={6}>
          <h3 style={{ marginBottom: "20px" }}>List of companies</h3>
            <Card>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  <tr>
                    <td><strong>Company id</strong></td>
                    <td><strong>Company Name</strong></td>
                    <td><strong>Updated By</strong></td>
                    <td><strong>Is Active</strong></td>
                  </tr>
                  {companies.map((value) => {
                    return (
                      <tr key={`${value.companyid} ${value.companyname}`} onClick={ () => {this.goToCompany(value.companyid)} }>
                        <td>{value.companyid}</td>
                        <td>{value.companyname}</td>
                        <td>{value.updateby}</td>
                        <td>{this.badge(value.isactive)}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
                <Button color="primary" onClick={this.createNewCompany}>Create new company</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
>>>>>>> dcea76ab (smells 0.8)
      </div>
    )
  }
}

export default withRouter(
  connect((state) => ({
    companies: fromJS(state.configuration.get('companies')).toJS(),
  }))(MenuCompany),
)
