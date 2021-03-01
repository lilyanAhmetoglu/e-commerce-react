import React, { Component } from "react";
import UserLayout from "../Home/UserLayout";
import FormField from "../utils/Forms/formField";
import {
  update,
  generateData,
  isFormValid,
  resetFields,
} from "../utils/Forms/formActions";

import { connect } from "react-redux";
import { addCustomer } from "../../actions/customer_actions";

class AddCustomer extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter the name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      phone: {
        element: "input",
        value: "",
        config: {
          name: "phonenumber_input",
          type: "text",
          placeholder: "Enter phone number",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      address: {
        element: "input",
        value: "",
        config: {
          name: "address_input",
          type: "text",
          placeholder: "Enter  address",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter email",
        },
        validation: {
          required: false,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      tag: {
        element: "input",
        value: "",
        config: {
          name: "tag_input",
          type: "text",
          placeholder: "Enter Tag",
        },
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  };
  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "customers");
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };
  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "customers");
    let formIsValid = isFormValid(this.state.formdata, "customers");

    if (formIsValid) {
      this.props.dispatch(addCustomer(dataToSubmit)).then(() => {
        this.setState(
          {
            formSuccess: true,
          },
          () => {
            setTimeout(() => {
              this.setState({
                formSuccess: false,
              });
            }, 2000);
          }
        );
      });
    } else {
      this.setState({
        formError: true,
      });
    }
  };
  render() {
    return (
      <UserLayout>
        <div className="container">
          <h1>Add product</h1>
          <form onSubmit={(event) => this.submitForm(event)}>
            <h1>Site info</h1>
            <FormField
              id={"name"}
              formdata={this.state.formdata.name}
              change={(element) => this.updateForm(element)}
            />

            <FormField
              id={"address"}
              formdata={this.state.formdata.address}
              change={(element) => this.updateForm(element)}
            />

            <FormField
              id={"phone"}
              formdata={this.state.formdata.phone}
              change={(element) => this.updateForm(element)}
            />

            <FormField
              id={"email"}
              formdata={this.state.formdata.email}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={"tag"}
              formdata={this.state.formdata.tag}
              change={(element) => this.updateForm(element)}
            />
            <div>
              {this.state.formSuccess ? (
                <div className="form_success">Success</div>
              ) : null}
              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}
              <button onClick={(event) => this.submitForm(event)}>
                اضافة
              </button>
            </div>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customer: state.customer,
  };
};

export default connect(mapStateToProps)(AddCustomer);
