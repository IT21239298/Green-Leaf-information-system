import React from "react";
import { Routes, Route } from "react-router-dom";
import { Paths } from "../utils/Paths";

import Dashboard from "../screen/Dashboard";
import TimePeriods from "../screen/TimePeriods";
import Targets from "../screen/Targets";
import TimeTable from "../screen/TimeTable";
import Reports from "../screen/Reports";
import QuickTargets from "../screen/QuickTargets";

const Content = () => {
  return (
    <Routes>
      <Route path={Paths["Dashboard"]} element={<Dashboard />} />
      <Route path={Paths["TimePeriods"]} element={<TimePeriods />} />
      <Route path={Paths["Targets"]} element={<Targets />} />
      <Route path={Paths["TimeTable"]} element={<TimeTable />} />
      <Route path={Paths["Reports"]} element={<Reports />} />
      <Route path={Paths["QuickTargets"]} element={<QuickTargets />} />
    </Routes>
  );
};

export default Content;
