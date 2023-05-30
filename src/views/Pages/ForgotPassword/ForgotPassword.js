import React, { Component } from "react";
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

import { withRouter } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { isEmail } from "../Login/Login.helper";


class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      error: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitForm(e) {
    e.preventDefault();
    const { email } = this.state;
    !isEmail(email) ? this.setState({ error: "Invalid e-mail" }) : this.setState({ error: "" });

    // TODO: perform API call to reset pw
    if (this.state.error === ""){
      console.log("success");
    }
  }

  style(error) {
    if (error !== "") {
      return {
        border: "1px solid #FFA9AF",
      };
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.submitForm.bind(this)}>
                    <h1>Forgot password?</h1>
                    <p className="text-muted">Reset your credentials</p>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText style={this.style(this.state.error)}>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="email"
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                        style={this.style(this.state.error)}
                        onChange={this.handleChange}
                      />
                    </InputGroup>

                    {(this.state.error !== "") && (
                      <Alert color="danger">
                        <div>
                        {this.state.error}
                        </div>
                      </Alert>
                    )}

                    {/* {this.state.error === "" && (
                      <Alert color="success">
                        A code to reset password was sent to your email!
                      </Alert>
                    )} */}

                    <Button color="info" className="text-white" block>
                      Send email
                    </Button>
                  </Form>
                </CardBody>
              </Card>
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
      auth: state.auth.toJS(),
    }),
    (dispatch) => ({})
  )(ForgotPassword)
);