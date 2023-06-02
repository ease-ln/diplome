import React, { Component } from 'react'
import {
  Card,
  Alert,
  CardBody,
  Input,
  Button,
  Container,
} from 'reactstrap'
import AlertSuccess from '../Base/Alert/Alert'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import { changePasswordFlow, postDataFlow } from '../../redux/common/flows'


class User extends Component {
  state = this.getInfo();

  handleChange = (key) => (e) => {
    this.setState({[key]: e.target.value, modified: true, error: ""});
  }

  submit = () => {
    const data = {
      email: this.state.email,
      name: this.state.name,
      surname: this.state.surname,
    }
    if (this.state.password.length < 8){
      this.setState({error: "short password"});
      return ;
    }
    try{
      postDataFlow(data)
      .then(() => {
        this.setState({error: "none"});
      })
      if (this.state.password !== undefined){
        changePasswordFlow({ password: this.state.password })
        .then(() => {
          this.setState({error: "none"});
        })
      }
    } catch(e) {
      this.setState({error: e});
    }
  }

  getInfo() {
    try{
      const userList = this.props.users.map((u, i) => ({...u, id: i}))
      const myEmail = localStorage.getItem('email')
      const isMyProfilePage =
        this.props.location.pathname.split('/').join('').trim() === 'me'

      const user = isMyProfilePage
        ? userList.find((user) => user.email === myEmail)
        : userList.find((user) => user.id.toString() === this.props.match.params.id)

      return user;
    } catch(_) {
      return null;
    }
  }

  render() {
    if (this.state === null){
      return (
        <h2>Cannot find user page...</h2>
      )
    }

    const isMyProfilePage =
      this.props.location.pathname.split('/').join('').trim() === 'me'

    const style = (className) => {
      if (className === "save"){
        return {
          position: "absolute",
          top: "0px",
          right: "0px",
        }
      }
      if (className === "upload"){
        return {
          display: "flex", 
          flexDirection: "row", 
          alignItems: "center",
          color: "#20A8D8",
          backgroundColor: "#F7FAFC",
          borderColor: "#20A8D8",
        }
      }
      if (className === "h4"){
        return {
          paddingRight: "0px",
          paddingLeft: "0px",
          marginBottom: "20px",
          color: "#73818F",
        }
      }
      if (className === "flex-row"){
        return {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: "0px",
          paddingLeft: "0px",
          marginBottom: "20px",
        }
      } 
      if (className === "input"){
        return {
          display: "inline-block", 
          verticalAlign: "middle",
          width: "280px",
        }
      }
    }

    return (
      <div className="animated fadeIn" style={{ margin: "0 auto", position: "relative"}}>
        {this.state.error === "none" && (
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}><AlertSuccess/></div>
        )}
        <h3 style={{ marginBottom: "20px" }}>My profile</h3>
        <Card style={{ margin: "0 auto", width: "482px", backgroundColor: "#F7FAFC" }}>
          <CardBody>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img
                src={"../../assets/img/avatars/3.jpg"}
                className="img-avatar"
                alt="admin@bootstrapmaster.com"
                style={{ width: "106px", marginBottom: "20px" }}
              />
              <Button color="primary" style={style("upload")} disabled>
                <i className="icon-cloud-upload icons font-2xl d-block" style={{ marginRight: "5px" }}></i>
                Upload new image
              </Button>
            </div>
            <hr/>
            <h4 style={style("h4")}>Profile info</h4>
            {Object.entries(this.state).map(([key, value]) => {
              if (key === "name") {
                return (
                  <Container style={style("flex-row")}>
                    <div>First name:</div>
                    <Input
                      type="text"
                      name={key}
                      value={value}
                      style={style("input")}
                      onChange={this.handleChange(key)}
                    />
                  </Container>
                )
              } else if (key === "surname") {
                return (
                  <Container style={style("flex-row")}>
                    <div>Last name:</div>
                    <Input
                      type="text"
                      name={key}
                      value={value}
                      style={style("input")}
                      onChange={this.handleChange(key)}
                    />
                  </Container>
                )
              } else if (key === "email") {
                return (
                  <Container style={style("flex-row")}>
                    <div>E-mail:</div>
                    <Input
                      type="text"
                      name={key}
                      value={value}
                      style={style("input")}
                      readOnly
                    />
                  </Container>
                )
              } else if (key === "role") {
                return (
                  <Container style={style("flex-row")}>
                    <div>Role:</div>
                    <Input
                      type="text"
                      name={key}
                      value={value.toLowerCase()}
                      style={style("input")}
                      readOnly
                    />
                  </Container>
                )
            }})}
            <hr/>
            <h4 style={style("h4")}>Change password</h4>
            <Container style={style("flex-row")}>
              <div>New password:</div>
              <Input
                type="text"
                name="password"
                placeholder="Must include 8+ characters"
                value={this.state.password}
                style={style("input")}
                onChange={this.handleChange("password")}
              />
            </Container>
            {this.state.error === "short password" && (
                <Alert color="danger" style={{ marginBottom: "0px", marginTop: "-7px" }}>
                  Password is too short. Must include 8+ characters
                </Alert>
            )}
          </CardBody>
        </Card>
        {isMyProfilePage && (
          <>
            <Button 
              color="primary" 
              style={style("save")} 
              onClick={this.submit} 
              disabled={!this.state.modified || this.state.error === "short password"}
            >
              <i className="fa fa-save fa-lg" style={{ marginRight: "7px" }}></i>
              Save changes
            </Button>
          </>
        )}
      </div>
    )
  }
}

export default withRouter(
  connect((state) => ({
    users: fromJS(state.users.get('users')).toJS(),
  }))(User),
)
