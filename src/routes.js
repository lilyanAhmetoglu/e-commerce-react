import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import Layout from "./hoc/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
function Routes() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
        path="/login"
        exact
        component={Login}
      />
      </Switch>
    </Layout>
  );
}

export default Routes;
