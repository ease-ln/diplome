import React, {Component} from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Input, CustomInput,
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {fromJS} from 'immutable'
import {getData, localStorageKey} from "../../redux/utils";
import {actionCreator} from "../../redux/generalConfiguration/action-creators";

class Members extends Component {
  state = {email:''}

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
  save = async () => {
    const payload = {}
    for (const v in this.state){
      if(this.state[v] === ""){payload[v] = null;continue;}
      if(v ==="isactive"){payload[v] = this.state[v] ? "Y" : "N";continue;}
      if(v === "updateby")continue
      if(v === "createdby")continue
      if(v === "lastupdate")continue
      if(v === "creationdate")continue
      payload[v] = this.state[v]
    }
    const team_id = this.props.match.params.id2
    try{
      const id = this.props.match.params.id3
      const token = getData(localStorageKey).token
      await actionCreator.putMember(token, id, payload)()
      await actionCreator.fetchMembers(token, team_id)(this.props.dispatch)
    }
    catch(e){
      console.log(e.stack)
    }
    finally{
      const company_id = this.props.match.params.id1
      const url = `/company/${company_id}/teams/${team_id}/members/`
      this.props.history.push(url)
    }
  }
  remove = async () => {
    const team_id = this.props.match.params.id2
    try{
      const id = this.props.match.params.id3
      const token = getData(localStorageKey).token
      await actionCreator.deleteMember(token, id)()
      await actionCreator.fetchMembers(token, team_id)(this.props.dispatch)
    }
    catch(e){
      console.log(e.stack)
    }
    finally{
      const company_id = this.props.match.params.id1
      const url = `/company/${company_id}/teams/${team_id}/members/`
      this.props.history.push(url)
    }
  }
  async componentDidMount(){
    const token = getData(localStorageKey).token;
    const id = this.props.match.params.id3
    await actionCreator.getMember(token, id)(this.props.dispatch)

    const obj = {}
    Object.entries(this.props.member).forEach(([k,v])=>{
      if(k==="isactive")obj[k] = v === "Y"
      else obj[k] = v
    })
    this.setState(obj)
  }
  render() {
    const {isactive, memberid, email, creationdate, teamid, createdby, updateby, lastupdate, ...agentStateData} = this.state
    const users = this.props.users
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                Change Member's config info
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  <tr>
                    <td>
                      Member id
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="memberid"
                        disabled
                        value={memberid}
                        onChange={this.handleChange("memberid")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Team id
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="teamid"
                        disabled
                        value={teamid}
                        onChange={this.handleChange("teamid")}
                      />
                    </td>
                  </tr>
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
                      Creation Date
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="creationdate"
                        disabled
                        value={creationdate===null ? "" : new Date(creationdate).toDateString()}
                        onChange={this.handleChange("creationdate")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Created By
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="createdby"
                        disabled
                        value={createdby===null ? "" : createdby}
                        onChange={this.handleChange("createdby")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Last Update
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="lastupdate"
                        disabled
                        value={lastupdate===null ? "" : new Date(lastupdate).toDateString()}
                        onChange={this.handleChange("lastupdate")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Updated By
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="updateby"
                        disabled
                        value={updateby===null ? "" : updateby}
                        onChange={this.handleChange("updateby")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Is Active
                    </td>
                    <td>
                      <CustomInput
                        id="isactive"
                        type="switch"
                        name="isactive"
                        checked={isactive}
                        onChange={this.handleCheck}
                      />
                    </td>
                  </tr>
                  </tbody>
                </Table>
                <>
                  <Button color="success" onClick={this.save}>
                    Save
                  </Button>
                  <Button color="danger" onClick={this.remove}>
                    Delete
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
  connect((state) => ({
    member: fromJS(state.configuration.get('member')).toJS(),
    users: fromJS(state.users.get('users')).toJS()
  }))(Members),
)
