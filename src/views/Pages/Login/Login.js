import React, { Component } from "react";
import cookie from "react-cookie";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { loginFlow, logout } from "../../../redux/common/flows";
import { loggedIn } from "../../../redux/auth/selectors";

import "./Login.scss";

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Alert,
} from "reactstrap";

import { getUser } from '../../../views/GQMConfig/GQM/GQMHelper'


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      modalOpen: false,
      errorMessage: "",
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitForm(e) {
    e.preventDefault();
    const { email, password } = this.state;

    getUser(email, password)
    .then( resp => {
        localStorage.setItem('mr-token', resp.token)
        localStorage.setItem('user_id', resp.id)
    })

    return this.props.loginFlow(email, password).then((_) => {
      if (this.props.auth.loggedIn) {
        this.props.history.push("/");
      }

      if (this.props.auth.error) {
        return this.toggle(this.props.auth.error.error);
      }
    });
  }

  toggle = (message) => {
    if (this.props.auth.loggedIn) return;

    let newState = {
      modalOpen: !this.state.modalOpen,
    };

    if (message) {
      newState.errorMessage = message;
    } else {
      newState.errorMessage = null;
    }

    this.setState({
      ...this.state,
      ...newState,
    });
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Modal
                      isOpen={this.state.modalOpen}
                      toggle={this.toggle}
                      className={"modal-info " + this.props.className}
                    >
                      <ModalHeader toggle={this.toggle}>
                        An error has occured.
                      </ModalHeader>
                      <ModalBody>
                        {this.state.modalOpen &&
                          this.props.auth &&
                          this.props.auth.error && (
                            <p>{String(this.props.auth.error.error)}</p>
                          )}
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>
                    {this.props.auth.registerSuccess && (
                      <Alert color="success">
                        Your account has been successfully created. Please log
                        in now.
                      </Alert>
                    )}
                    <Form>
                      <h1>Sign in</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="email"
                          type="text"
                          placeholder="E-mail"
                          autoComplete="email"
                          onChange={this.handleChange.bind(this)}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={this.handleChange.bind(this)}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            onClick={this.submitForm.bind(this)}
                          >
                            Login
                          </Button>
                        </Col>

                        <Col xs="6" className="text-right">
                          <Link to="/forgot">
                            <Button color="link" className="px-0" disabled>
                              Forgot password?
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 sign-up"
                  style={{ width: "44%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        If you don't already have an Innometrics account, feel
                        free to sign up. It's free.
                      </p>
                      <Link to="/register">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Sign up Now!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(
  connect(
    (state) => ({
      user: state.user.toJS(),
      loggedIn: loggedIn(state),
      auth: state.auth.toJS(),
    }),
    (dispatch) => ({
      loginFlow: (email, password) => dispatch(loginFlow(email, password)),
      logout: () => dispatch(logout()),
    })
  )(Login)
);
