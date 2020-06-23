import React, { Component } from "react";
import FormField from "../../utils/Forms/formField";
import {
  update,
  generateData,
  isFormValid,
  resetFields,
} from "../../utils/Forms/formActions";
import { connect } from "react-redux";
import { getFabrics, addFabric } from "../../../actions/products_actions";

class ManageFabrics extends Component {
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
          placeholder: "Enter the Fabric",
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

  showCategoryItems = () =>
    this.props.products.fabrics
      ? this.props.products.fabrics.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;
  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "fabrics");
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formdata, "fabrics");

    this.setState({
      formdata: newFormData,
      formSuccess: true,
    });
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "fabrics");
    let formIsValid = isFormValid(this.state.formdata, "fabrics");
    let existingFabrics = this.props.products.fabrics;

    if (formIsValid) {
      this.props
        .dispatch(addFabric(dataToSubmit, existingFabrics))
        .then((response) => {
          if (response.payload.success) {
            this.resetFieldsHandler();
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
    this.props.dispatch(getFabrics());
  }
  render() {
    return (
        <div className="admin_category_wrapper" style={{ marginTop: "30px" }}>
        <h1>Fabrics</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoryItems()}</div>
          </div>
          <div className="right">
            <form onSubmit={(event) => this.submitForm(event)}>
              <FormField
                id={"name"}
                formdata={this.state.formdata.name}
                change={(element) => this.updateForm(element)}
              />

              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}
              <button onClick={(event) => this.submitForm(event)}>
                Add fabric
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      products: state.products,
    };
  };
export default connect(mapStateToProps)(ManageFabrics);
