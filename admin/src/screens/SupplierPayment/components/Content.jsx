import React from "react";
import { Routes, Route } from "react-router-dom";
import { Paths } from "../utils/Paths";

import Dashboard from "../screen/Dashboard";
import Suppliers from "../screen/Suppliers";
import Calculation from "../screen/Calculation";
import Report from "../screen/Report";

const Content = () => {
  return (
    <Routes>
      <Route path={Paths["Dashboard"]} element={<Dashboard />} />
      <Route path={Paths["Suppliers"]} element={<Suppliers />} />
      <Route path={Paths["Calculation"]} element={<Calculation />} />
      <Route path={Paths["Report"]} element={<Report />} />
    </Routes>
  );
};

export default Content;
