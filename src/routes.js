import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import Layout from "./hoc/Layout";
import Home from "./components/Home/UserLayout";
import Login from "./components/Login";
import ActiveOrders from "./components/Dashboard/ActiveOrders";
import DoneOrders from "./components/Dashboard/DoneOrders";
import AddOrder from './components/Dashboard/AddOrder'
import AddCustomer from './components/Dashboard/AddCustomer'
import Customers from "./components/Dashboard/Customers";
import Users from "./components/Dashboard/Users";
function Routes() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={ActiveOrders} />
        <Route path="/login" exact component={Login} />
        <Route path="/active-orders" exact component={ActiveOrders} />
        <Route path="/done-orders" exact component={DoneOrders} />
        <Route path="/add-orders" exact component={AddOrder} />
        <Route path="/add-customer" exact component={AddCustomer} />
        <Route path="/customers" exact component={Customers} />
        <Route path="/users" exact component={Users} />
      </Switch>
    </Layout>
  );
}

export default Routes;
