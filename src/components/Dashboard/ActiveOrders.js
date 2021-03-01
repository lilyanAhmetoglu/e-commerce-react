import React, { Component } from "react";
import UserLayout from "../Home/UserLayout";
import { Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { getActiveOrders } from "../../actions/order_actions";

class ActiveOrders extends Component {
  showActiveOrders = () =>
  typeof this.props.orders.articles === 'undefined'
      ?  null 
      :  this.props.orders.articles.map((item, i) => (
        <tr key={item._id}>
          <td>{i}</td>
          <td>{item.title}</td>
          <td>{item.createdAt}</td>
          <td>{item.price}</td>
        </tr>
      ));

  componentDidMount() {
    this.props.dispatch(getActiveOrders());
  }
  render() {
    console.log(this.props.orders.articles)
    return (
      <UserLayout>
        <Button className="buttons" variant="success">
          + اضافة طلب
        </Button>
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>رقم الطلب</th>
              <th>تاريخ الطلب</th>
              <th>سعر الطلب</th>
            </tr>
          </thead>
          <tbody>
           {this.showActiveOrders()}
          </tbody>
        </Table>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
  };
};

export default connect(mapStateToProps)(ActiveOrders);
