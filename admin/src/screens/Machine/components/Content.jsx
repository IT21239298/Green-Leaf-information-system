import React from "react";
import { Routes, Route } from "react-router-dom";
import { Paths } from "../utils/Paths";

import Dashboard from "../screen/Dashboard";
import Machines from "../screen/Machines";
import MachineParts from "../screen/MachineParts";
import Maintenance from "../screen/Maintenance";
import Values from "../screen/Values";

const Content = () => {
  return (
    <Routes>
      <Route path={Paths["Dashboard"]} element={<Dashboard />} />
      <Route path={Paths["Machines"]} element={<Machines />} />
      <Route path={Paths["MachineParts"]} element={<MachineParts />} />
      <Route path={Paths["Maintenance"]} element={<Maintenance />} />
      <Route path={Paths["Values"]} element={<Values />} />
    </Routes>
  );
};

export default Content;
