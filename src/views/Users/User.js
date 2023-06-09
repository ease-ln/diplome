import React, { useState } from 'react'
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

import "../../scss/styles.css";


function User(props) {
  const [userData, setUserData] = useState(getInfo());
  const [password, setPassword] = useState("");
  const [error, setError]= useState("");
  const [isModified, setIsModified]= useState(false);

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError("");
    setIsModified(true);
  }

  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setUserData(previousState => {
      return { ...previousState, [key]: value }});
    setIsModified(true);
  }

  const submit = () => {
    const data = {
      email: userData.email,
      name: userData.name,
      surname: userData.surname,
    }
    if (password !== undefined){
      if (password.length < 8){
        setError("short password");
        return ;
    }}
    try{
      postDataFlow(data)
      .then(() => {
        setError("success");
      })
      if (password !== undefined){
        changePasswordFlow({ password })
        .then(() => {
          setError("success");
        })
      }
    } catch(e) {
      setError(e);
    }
  }

  function getInfo() {
    try {
      const userList = props.users.map((u, i) => ({...u, id: i}))
      const myEmail = localStorage.getItem('email')
      const isMyProfilePage =
        props.location.pathname.split('/').join('').trim() === 'me'

      const user = isMyProfilePage
        ? userList.find((user) => user.email === myEmail)
        : userList.find((user) => user.id.toString() === props.match.params.id)

      return user;
    } catch(_) {
      return null;
    }
  }

  if (userData === null){
    return (
      <h2>Cannot find user page...</h2>
    )
  }

  const isMyProfilePage =
    props.location.pathname.split('/').join('').trim() === 'me'

  return (
    <div className="animated fadeIn" style={{ margin: "0 auto", position: "relative"}}>
      {error === "success" && (
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
            <Button color="primary" className="upload" disabled>
              <i className="icon-cloud-upload icons font-2xl d-block" style={{ marginRight: "5px" }}></i>
              Upload new image
            </Button>
          </div>
          <hr/>
          <h4 className="h4">Profile info</h4>
          {Object.entries(userData).map(([key, value]) => {
            if (key === "name") {
              return (
                <Container className="flex-row">
                  <div>First name:</div>
                  <Input
                    className="input"
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
            } else if (key === "surname") {
              return (
                <Container className="flex-row">
                  <div>Last name:</div>
                  <Input
                    className="input"
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange(key)}
                  />
                </Container>
              )
            } else if (key === "email") {
              return (
                <Container className="flex-row">
                  <div>E-mail:</div>
                  <Input
                    className="input"
                    type="text"
                    name={key}
                    value={value}
                    readOnly
                  />
                </Container>
              )
            } else if (key === "role") {
              return (
                <Container className="flex-row">
                  <div>Role:</div>
                  <Input
                    className="input"
                    type="text"
                    name={key}
                    value={value.toLowerCase()}
                    readOnly
                  />
                </Container>
              )
          }})}
          <hr/>
          <h4 className="h4">Change password</h4>
          <Container className="flex-row">
            <div>New password:</div>
            <Input
              className="input"
              type="text"
              name="password"
              placeholder="Must include 8+ characters"
              value={password}
              onChange={handlePassword}
            />
          </Container>
          {error === "short password" && (
              <Alert color="danger" style={{ marginBottom: "0px", marginTop: "-7px" }}>
                Password is too short. Must include 8+ characters
              </Alert>
          )}
        </CardBody>
      </Card>
      {isMyProfilePage && (
        <>
          <Button 
            className="save"
            color="primary"
            onClick={submit} 
            disabled={!isModified || error === "short password"}
          >
            <i className="fa fa-save fa-lg" style={{ marginRight: "7px" }}></i>
            Save changes
          </Button>
        </>
      )}
    </div>
  )
}


export default withRouter(
  connect((state) => ({
    users: fromJS(state.users.get('users')).toJS(),
  }))(User),
)
