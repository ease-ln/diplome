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
import {getData, localStorageKey} from "../../redux/utils";
import {actionCreator} from "../../redux/agents/action-creators";

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
  Create = async () => {
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
    const {isactive, ...agentStateData} = this.state
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                Create Detail Config
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
                      isActive
                    </td>
                    <td>
                      <Input
                        id="isactive"
                        type="switch"
                        name="isactive"
                        value={isactive}
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
  connect()(CreateConfigDetails),
)
