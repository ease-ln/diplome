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

class CreateConfigDetails extends Component {
  state = {
    isactive: false,
    paramname: '',
    paramtype: '',
    requestparam: '',
    requesttype: '',
    defaultvalue: ''
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
    const id = this.props.match.params.id2
    const payload = {
      methodid: id,
      ...(this.state)
    }
    for (const v in payload){
      if(payload[v] === "")payload[v] = null
      if(payload[v] === false)payload[v] = "N"
      if(payload[v] === true)payload[v] = "Y"
    }
    try {
      const token = getData(localStorageKey).token
      await actionCreator.postDetail(token, payload)()
      await actionCreator.fetchAgentDetails(token, id)(this.props.dispatch)
    }
    catch (e) {
      console.log(e.stack)
    }
    finally {
      const agent_id = this.props.match.params.id
      this.props.history.push(`/agent/${agent_id}/methods/${id}/details`)
    }
  }
  render() {
    const {isactive, ...detailStateData} = this.state
    return (
      <div className="animated fadeIn">
        <Card style={{ width: "100%", alignItems: "first baseline" }}>
        <h3 style={{ fontWeight: "bold", margin: "20px", marginBottom: "0px" }}>Create detail</h3>
          <CardBody>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Parameter name:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="paramname"
                  value={detailStateData.paramname}
                  onChange={this.handleChange("paramname")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Parameter type:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="paramtype"
                  value={detailStateData.paramtype}
                  onChange={this.handleChange("paramtype")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Request parameter:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="requestparam"
                  value={detailStateData.requestparam}
                  onChange={this.handleChange("requestparam")}
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
                  value={detailStateData.requesttype}
                  onChange={this.handleChange("requesttype")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Default value:</p>
              </Container>
              <Container className='flex-row info'>
                <Input
                  className="input"
                  style={{ width: "100%" }}
                  type="text"
                  name="defaultvalue"
                  value={detailStateData.defaultvalue}
                  onChange={this.handleChange("defaultvalue")}
                />
              </Container>
            </div>
            <div className='row-info'>
              <Container className='flex-row info'>
                <p style={{ marginBottom: "0px" }}>Detail is active:</p>
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
              Create detail
            </Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default withRouter(
  connect()(CreateConfigDetails),
)
