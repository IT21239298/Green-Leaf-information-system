import React from "react";
import { Routes, Route } from "react-router-dom";
import { Paths } from "../utils/Paths";

import Dashboard from "../screen/Dashboard";
import Customers from "../screen/Customers";
import Orders from "../screen/Orders";
import Reports from "../screen/Reports";

const Content = () => {
  return (
    <Routes>
      <Route path={Paths["Dashboard"]} element={<Dashboard />} />
      <Route path={Paths["Customers"]} element={<Customers />} />
      <Route path={Paths["Orders"]} element={<Orders />} />
      <Route path={Paths["Reports"]} element={<Reports />} />
    </Routes>
  );
};

export default Content;
