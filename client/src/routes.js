import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/hoc/layout";
import Auth from './components/hoc/auth'

import Home from "./components/Home";
import RegisterLogin from "./components/Register_Login";
import Register from "./components/Register_Login/register";

import UserDashboard from "./components/User";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard/" exact component={Auth(UserDashboard,true)}/> {/* true means completly private routs */}
        <Route path="/register" exact component={Auth(Register,false)} />{/* false means partially  private routs */}
        <Route path="/register_login" exact component={Auth(RegisterLogin,false)} />
        <Route path="/" exact component={Auth(Home,null)} />{/* null means completly  puplic routs */}
      </Switch>
    </Layout>
  );
};

export default Routes;
