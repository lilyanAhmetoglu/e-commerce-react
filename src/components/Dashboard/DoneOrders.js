import React, { Component } from "react";
import UserLayout from "../Home/UserLayout";
import { Table } from "react-bootstrap";

import { connect } from "react-redux";
import { getِDoneOrders } from "../../actions/order_actions";
class DoneOrders extends Component {
  render() {
    return (
      <UserLayout>
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
            <tr>
              <td>1</td>
              <td>1001</td>
              <td>01-01-2021</td>
              <td>11$</td>
            </tr>
            <tr>
              <td>2</td>
              <td>1002</td>
              <td>01-01-2021</td>
              <td>110$</td>
            </tr>
            <tr>
              <td>3</td>
              <td>1003</td>
              <td>01-01-2021</td>
              <td>120$</td>
            </tr>
          </tbody>
        </Table>
      </UserLayout>
    );
  }
}

export default DoneOrders;
