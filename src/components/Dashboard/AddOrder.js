import React, { Component } from "react";
import UserLayout from "../Home/UserLayout";
import FormField from "../utils/Forms/formField";
import {
  update,
  generateData,
  isFormValid,
  populateOptionFields,
  resetFields,
} from "../utils/Forms/formActions";

import { connect } from "react-redux";
import { addOrder } from "../../actions/order_actions";
import { getCustomers } from "../../actions/customer_actions";

class AddOrder extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      title: {
        element: "input",
        value: "",
        config: {
          label: "رقم الطلب",
          name: "op_input",
          type: "text",
          placeholder: "أدخل رقم الطلب",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      price: {
        element: "input",
        value: "",
        config: {
          label: "السعر الكلي",
          name: "price_input",
          type: "number",
          placeholder: "ادخل السعر الكلي",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      currency: {
        element: "select",
        value: "",
        config: {
          label: "العملة",
          name: "currency_input",
          options: [
            { key: 0, value: "USD" },
            { key: 1, value: "EUR" },
            { key: 2, value: "GBP" },
            { key: 3, value: "CD" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      customer: {
        element: "select",
        value: "",
        config: {
          label: "العميل",
          name: "customer_input",
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      shipped: {
        element: "select",
        value: "",
        config: {
          label: "مكتملة",
          name: "shipped_input",
          options: [
            { key: true, value: "مكتملة" },
            { key: false, value: "جديدة" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
    },
  };

  updateFields = (newFormdata) => {
    this.setState({
      formdata: newFormdata,
    });
  };
  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "orders");
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };
  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "orders");
    let formIsValid = isFormValid(this.state.formdata, "orders");

    if (formIsValid) {
      this.props.dispatch(addOrder(dataToSubmit)).then(() => {
        if (this.props.orders.addOrder.success) {
        } else {
          this.setState({ formError: true });
        }
      });
    } else {
      this.setState({
        formError: true,
      });
    }
  };
  componentDidMount() {
    const formdata = this.state.formdata;
    console.log(this.props.orders);
    this.props.dispatch(getCustomers()).then((response) => {
      console.log(response.payload);
      const newFormData = populateOptionFields(
        formdata,
        response.payload,
        "customer"
      );
      this.updateFields(newFormData);
    });
  }
  render() {
    return (
      <UserLayout>
        <div className="container" style={{ marginTop: "30px" }}>
          <h1>اضافة طلب</h1>
          <form
            onSubmit={(event) => this.submitForm(event)}
            style={{ marginTop: "30px" }}
          >
            <FormField
              id={"title"}
              formdata={this.state.formdata.title}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={"price"}
              formdata={this.state.formdata.price}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={"currency"}
              formdata={this.state.formdata.currency}
              change={(element) => this.updateForm(element)}
            />
            <div className="form_devider"></div>

            <FormField
              id={"customer"}
              formdata={this.state.formdata.customer}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={"shipped"}
              formdata={this.state.formdata.shipped}
              change={(element) => this.updateForm(element)}
            />

            {this.state.formSuccess ? (
              <div className="form_success">Success</div>
            ) : null}

            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
            <button onClick={(event) => this.submitForm(event)}>
              Add order
            </button>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
  };
};

export default connect(mapStateToProps)(AddOrder);
