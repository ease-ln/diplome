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
import {actionCreator} from "../../redux/generalConfiguration/action-creators";
import {fromJS} from "immutable";

class CreateMembers extends Component {
  state = {
    isactive: false,
    email: ''
  }

  handleChange = (k) => (e) => {
    const key = k.toLowerCase()
    this.setState({[key]: e.target.value})
  }
  handleCheck = (e) => {
    const key = "isactive"
    this.setState({[key]: e.target.checked})
  }
  handleSelect = (e) => {
    const key = "email"
    this.setState({[key]: e.target.value})
  }
  Create = async () => {
    const id = this.props.match.params.id2
    const payload = {
      teamid: id,
      ...(this.state)
    }
    for (const v in payload){
      if(payload[v] === "")payload[v] = null
      if(payload[v] === false)payload[v] = "N"
      if(payload[v] === true)payload[v] = "Y"
    }
    try{
      const token = getData(localStorageKey).token
      await actionCreator.postMember(token, payload)()
      await actionCreator.fetchMembers(token, id)(this.props.dispatch)
    }
    catch(e){
      console.log(e.stack)
    }
    finally{
      const company_id = this.props.match.params.id1
      this.props.history.push(`/company/${company_id}/teams/${id}/members`)
    }
  }
  render() {
    const {isactive, email, ...agentStateData} = this.state
    const users = this.props.users
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                Create Member Config
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
                    <td>Email</td>
                    <td>
                      <Input type="select" name="select" value={email} onChange={this.handleSelect}>
                        {users.map((user)=>(
                          <option value={user.email}>{user.email}</option>
                        ))}
                      </Input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      isActive
                    </td>
                    <td>
                      <Input
                        type="checkbox"
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
  connect(
    state=>({
    users: fromJS(state.users.get('users')).toJS()
  })
)(CreateMembers),
)
