import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Layout from "./components/hoc/layout";
import RegisterLogin from './components/Register_Login'

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/register_login" exact component={RegisterLogin} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
};

export default Routes;
