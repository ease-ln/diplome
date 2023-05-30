import React, {Component} from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Input,
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {actionCreator} from "../../redux/agents/action-creators";
import {getData, localStorageKey} from "../../redux/utils";

class CreateNewAgent extends Component {
  state = {
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
    apisecret: ''
  }

  handleChange = (k) => (e) => {
    const key = k.toLowerCase()
    this.setState({[key]: e.target.value})
  }
  handleCheck = (e) => {
    const key = "isconnected"
    this.setState({[key]: e.target.checked})
  }
  Create = async () => {
    const payload = {
      ...(this.state)
    }
    for (const v in payload){
      if(payload[v] === "")payload[v] = null
      if(payload[v] === false)payload[v] = "N"
      if(payload[v] === true)payload[v] = "Y"
    }
    try {
      const token = getData(localStorageKey).token
      await actionCreator.postAgent(token, payload)()
      await actionCreator.fetchAgents(token, 0)(this.props.dispatch)
    }
    catch (e) {
      console.log(e.stack)
    }
    finally {
      this.props.history.push("/agentMenu")
    }
  }
  render() {
    const {isconnected, ...agentStateData} = this.state
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                Create new Agent
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  {Object.keys(agentStateData).map(
                    (k) => (
                      <tr key={k}>
                        <td>{`${k}:`}</td>
                        <td>
                          <Input
                            type="text"
                            name={k}
                            value={agentStateData[k]}
                            onChange={this.handleChange(k)}
                          />
                        </td>
                      </tr>
                    ),
                  )}
                  <tr>
                    <td>
                      isconnected
                    </td>
                    <td>
                      <Input
                        type="checkbox"
                        name="isconnected"
                        value={isconnected}
                        onChange={this.handleCheck}
                      />
                    </td>
                  </tr>
                  </tbody>
                </Table>
                <>
                  <Button color="success" onClick={this.Create}>
                    Create
                  </Button>
                </>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(
  connect()(CreateNewAgent),
)
