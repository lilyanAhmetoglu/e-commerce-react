import React from "react";

import MyButton from "../utils/buttons";
import Login from './login'
const RegisterLogin = () => {
  return (
    <div className="page_Wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customer</h1>
            <p>signup tpday and get a gift</p>
            <MyButton
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{
                margin: "10px 0 0 0",
              }}
            />
          </div>
          <div className="right">
              <h2>Registered customers</h2>
              <p>If you have an account please login</p>
              <Login/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
