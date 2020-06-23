import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/hoc/layout";
import Auth from './components/hoc/auth'

import Home from "./components/Home";
import RegisterLogin from "./components/Register_Login";
import Register from "./components/Register_Login/register";
import Shop from './components/Shop';
import ProductPage from './components/Product'

import UserDashboard from "./components/User";
import AddProduct from './components/User/Admin/add_products';
import ManageCategories from './components/User/Admin/manage_categories'
import UserCart from './components/User/cart'

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard/" exact component={Auth(UserDashboard,true)}/> {/* true means completly private routs */}
        <Route path="/user/cart/" exact component={Auth(UserCart,true)}/>
        <Route path="/admin/add_product" exact component={Auth(AddProduct,true,true)}/>
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories,true,true)}/>

        <Route path="/product_detail/:id" exact component={Auth(ProductPage,null)} />
        <Route path="/register" exact component={Auth(Register,false)} />{/* false means partially  private routs */}
        <Route path="/register_login" exact component={Auth(RegisterLogin,false)} />
        <Route path="/shop" exact component={Auth(Shop,null)}/>
        <Route path="/" exact component={Auth(Home,null)} />{/* null means completly  puplic routs */}
      </Switch>
    </Layout>
  );
};

export default Routes;
