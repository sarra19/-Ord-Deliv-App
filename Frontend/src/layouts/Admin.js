import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Tables from "views/admin/Tables.js";
import AddUser from "views/admin/AddUser";
import AddProd from "views/admin/AddProd";
import ModifyUser from "views/admin/ModifyUser";
import ModifyProd from "views/admin/ModifyProd";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/AddUser" exact component={AddUser} />
            <Route path="/admin/AddProd" exact component={AddProd} />
            <Route path="/admin/ModifyUser/:id" exact component={ModifyUser} />
            <Route path="/admin/ModifyProd/:id" exact component={ModifyProd} />

            <Route path="/admin/tables" exact component={Tables} />

            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
