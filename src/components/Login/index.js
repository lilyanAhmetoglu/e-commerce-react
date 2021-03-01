import React, { Component } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import FormField from "../utils/Forms/formField";
import { update, generateData, isFormValid } from "../utils/Forms/formActions";
import { loginUser } from "../../actions/user_actions";

import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
class Login extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formdata: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email",
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  };
  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, "login");
    let formIsValid = isFormValid(this.state.formdata, "login");

    if (formIsValid) {
        this.props.dispatch(loginUser(dataToSubmit)).then(response =>{
            if(response.payload.loginSuccess){
                console.log(response.payload);
                this.props.history.push('/')
            }else{
                this.setState({
                    formError: true
                })
            }
        });
    } else {
      this.setState({
        formError: true,
      });
    }
  };
  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "login");
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };
  render() {
    return (
      <div className="vertical">
        <Container>
          <Row>
            <Col>
              <form onSubmit={(event) => this.submitForm(event)}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <FormField
                    type="email"
                    placeholder="Enter email"
                    id={"email"}
                    formdata={this.state.formdata.email}
                    change={(element) => this.updateForm(element)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <FormField
                    type="password"
                    placeholder="Password"
                    id={"password"}
                    formdata={this.state.formdata.password}
                    change={(element) => this.updateForm(element)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  {this.state.formError ? (
                    <div className="error_label">Please check your data</div>
                  ) : null}
                </Form.Group>
                <button onClick={(event) => this.submitForm(event)}>Login</button>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect()(withRouter(Login));