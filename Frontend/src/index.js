import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import EmailVerify from "views/auth/EmailVerify/index";

// Function to check if token exists in local storage
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/landing" exact component={Landing} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/user/:id/verify/:token"  exact component={EmailVerify} />
      {isAuthenticated() ? (
        <Route path="/" exact component={Index} />
      ) : (
        <Redirect to="/auth/login" />
      )}
      {/* add redirect for any other paths */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
