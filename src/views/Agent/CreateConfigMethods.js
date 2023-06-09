import React, {Component} from 'react'
import {
  Card,
  CardBody,
  Container,
  Button,
  Input,
  CustomInput,
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {getData, localStorageKey} from "../../redux/utils";
import {actionCreator} from "../../redux/agents/action-creators";

import "../../scss/styles.css";

class CreateConfigMethods extends Component {
  state = {
    description: '',
    isactive: false,
    endpoint: '',
    operation: '',
    requesttype: ''
  }

  handleChange = (k) => (e) => {
    const key = k.toLowerCase()
    this.setState({[key]: e.target.value})
  }

  handleCheck = (e) => {
    const key = "isactive"
    this.setState({[key]: e.target.checked})
  }

  submit = async () => {
    const id = this.props.match.params.id
    const payload = {
      agentid: id,
      ...(this.state)
    }
    for (const v in payload){
      if(payload[v] === "")payload[v] = null
      if(payload[v] === false)payload[v] = "N"
      if(payload[v] === true)payload[v] = "Y"
    }
    try {
      const token = getData(localStorageKey).token
      await actionCreator.postMethod(token, payload)()
      await actionCreator.fetchAgentMethods(token, id)(this.props.dispatch)
    }
    catch (e) {
      console.log(e.stack)
    }
    finally {
      this.props.history.push(`/agent/${id}/methods`)
    }
  }

  render() {
    const {isactive, ...methodStateData} = this.state
    return (
      <div className="animated fadeIn">
        <Card style={{ width: "100%", alignItems: "first baseline" }}>
        <h3 style={{ fontWeight: "bold", margin: "20px", marginBottom: "0px" }}>Create method</h3>
          <CardBody>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Description:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="companyname"
                  value={methodStateData.description}
                  onChange={this.handleChange('description')}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Endpoint:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="endpoint"
                  value={methodStateData.endpoint}
                  onChange={this.handleChange('endpoint')}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Operation:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="operation"
                  value={methodStateData.operation}
                  onChange={this.handleChange('operation')}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Request type:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="requesttype"
                  value={methodStateData.requesttype}
                  onChange={this.handleChange('requesttype')}
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
            <Button color="primary" onClick={this.submit}>
              <i className="fa fa-save fa-lg" style={{ marginRight: "7px" }}></i>
              Create method
            </Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default withRouter(
  connect()(CreateConfigMethods),
)
