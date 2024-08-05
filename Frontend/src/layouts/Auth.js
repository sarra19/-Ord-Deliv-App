/* eslint-disable */
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import ForgotPassword from "views/auth/ResetPass/ForgotPassword";
import PasswordReset from "views/auth/ResetPass/PasswordReset";


export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/login1.jpg").default + ")",
              backgroundSize: "cover", // Added this line to enlarge the background image
            }}
          ></div>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            {/* <Route path="/auth/forgot-password"  exact component={ForgotPassword} />
            <Route path="/auth/password-reset/:id/:token" exact component={PasswordReset} /> */}

            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
