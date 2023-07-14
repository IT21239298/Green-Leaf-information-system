import React from "react";
import { Routes, Route } from "react-router-dom";
import { Paths } from "../utils/Paths";

import Dashboard from "../screen/Dashboard";
import Tracking from "../screen/Tracking";
import CreateRoute from "../screen/CreateRoute";
import Drivers from "../screen/Drivers";
import Vehicles from "../screen/Vehicles";
import History from "../screen/History";

const Content = () => {
  return (
    <Routes>
      <Route path={Paths["Dashboard"]} element={<Dashboard />} />
      <Route path={Paths["Tracking"]} element={<Tracking />} />
      <Route path={Paths["CreateRoute"]} element={<CreateRoute />} />
      <Route path={Paths["Drivers"]} element={<Drivers />} />
      <Route path={Paths["Vehicles"]} element={<Vehicles />} />
      <Route path={Paths["History"]} element={<History />} />
    </Routes>
  );
};

export default Content;
