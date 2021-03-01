import React, { Component } from "react";
import UserLayout from "../Home/UserLayout";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getCustomers } from "../../actions/customer_actions";

class Customers extends Component {
  
  showCustomers = () =>
    this.props.customers.customers
      ? this.props.customers.customers.map((item, i) => (
          <tr key={item._id}>
          <td>{i}</td>
          <td>{item.name}</td>
          <td>{item.phone}</td>
          <td>{item.tag}</td>
        </tr>
        ))
      : null;

  componentDidMount() {
    this.props.dispatch(getCustomers());
  }
  render() {
    return (
      <UserLayout>
        <Link to="/add-customer">
          <Button className="buttons" variant="success">
            {" "}
            + اضافة زبون
          </Button>
        </Link>
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th> اسم الزبون</th>
              <th> رقم التلفون</th>
              <th>الاهمية </th>
            </tr>
          </thead>
          <tbody>
          {this.showCustomers()}
          </tbody>
        </Table>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.customers,
  };
};

export default connect(mapStateToProps)(Customers);
