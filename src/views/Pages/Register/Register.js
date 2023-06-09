import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Alert,
} from "reactstrap";
import { saveUser } from '../../../views/GQMConfig/GQM/GQMHelper'
import { useCookies } from 'react-cookie';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

// redux
import { registerFlow } from "../../../redux/common/flows";

import { isEmail } from "../Login/Login.helper";

function Register(props) {

  const [error, setError] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    fields: "",
    auth: "",
  });
  const [, setToken] = useCookies(['mr-token']);

  const handleChange = () => {
  }

  const handleFocus = (_, inputType) => {
    let err = error;
    err[inputType] = "";
    setError(err);
  }

  const verification = (firstName, surname, email, password) => {
    let err = {
      firstName: "",
      surname: "",
      email: "",
      password: "",
      fields: "",
      auth: "",
    };

    if (firstName === ""){
      err.firstName = "error";
    }

    if (surname === ""){
      err.surname = "error";
    }

    if (firstName === "" || surname === "" || email === "" || password === "") {
      err.fields = "All fields are required";
    }
    
    if (!isEmail(email)) {
      err.email = "Invalid e-mail";
    }

    if (password.length < 8) {
      err.password = "Password is too short. Must include 8+ characters";
    }

    if (!Object.values(err).every(value => value === "")){
      setError(err);
      return false;
    }

    return true;
  }

  const submitForm = (e) => {
    e.preventDefault();
    setError({
      firstName: "",
      surname: "",
      email: "",
      password: "",
      fields: "",
      auth: "",
    });

    let firstName = document.getElementsByName('firstName')[0].value;
    let surname = document.getElementsByName('surname')[0].value;
    let email = document.getElementsByName('email')[0].value;
    let password = document.getElementsByName('password')[0].value;

    if (!verification(firstName, surname, email, password)) {
      return ;
    }

    registerFlow(firstName, surname, email, password)
    .then((res) => {
        saveUser(email, password).then((resp) => {
          if (!resp || !resp.ok) {
            setError({auth: "User does not added to GQM model"})
            return;
          }
          setToken('mr-token', resp.token)
        })
        props.history.push("/dashboard")
    })
    .catch((e) => {setError({auth: "Username already exists."})})

  }

  const style = (err) => {
    if (err !== "") {
      return {
        border: "1px solid #FFA9AF",
      };
    }
  }

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="6">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={submitForm}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="firstName"
                      type="text"
                      placeholder="First name"
                      autoComplete="given-name"
                      style={style(error.firstName)}
                      onFocus={e => handleFocus(e, "firstName")}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="surname"
                      type="text"
                      placeholder="Last name"
                      autoComplete="family-name"
                      style={style(error.surname)}
                      onFocus={e => handleFocus(e, "surname")}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="email"
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      style={style(error.email)}
                      onFocus={e => handleFocus(e, "email")}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      style={style(error.password)}
                      onFocus={e => handleFocus(e, "password")}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <p className="text-muted" style={{ marginTop: "-10px" }}>Must include 8+ characters</p>
                  {Object.values(error).some(value => value !== "") && (
                      <Alert color="danger">
                        <div>{error.fields}</div>
                        <div>{error.email}</div>
                        <div>{error.password}</div>
                        <div>{error.auth}</div>
                      </Alert>
                  )}
                  <Button color="primary" block>
                    Create Account
                  </Button>
                  <Link to="/login" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Button color="link" className="px-0">
                        Already have an account? Sign In
                      </Button>
                  </Link>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default withRouter(
  connect()(Register)
);
