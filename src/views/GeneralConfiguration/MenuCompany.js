import React, { Component } from 'react'
import {
  Card,
  Badge,
  CardBody,
  Col,
  Row,
  Table,
  Button
} from 'reactstrap'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { getData, localStorageKey } from "../../redux/utils";
import { actionCreator } from "../../redux/generalConfiguration/action-creators";

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
                  {companies.map((value, idx) => {
                    return (
                      <tr key={idx} onClick={ () => {this.goToCompany(value.companyid)} }>
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
      </div>
    )
  }
}

export default withRouter(
  connect((state) => ({
    companies: fromJS(state.configuration.get('companies')).toJS(),
  }))(MenuCompany),
)
