import React, { Component } from "react";
import Logo from "../resources/logo.png";
import { Navbar, Button } from "react-bootstrap";
class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={Logo}
              width="100"
              className="d-inline-block align-top"
            />{" "}
            نظام الطلبيات
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button variant="danger">خروج</Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <div className="app">{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;
