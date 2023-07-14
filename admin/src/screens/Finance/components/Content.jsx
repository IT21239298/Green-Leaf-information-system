import React from "react";
import { Routes, Route } from "react-router-dom";
import { Paths } from "../utils/Paths";

import Dashboard from "../screen/Dashboard";
import AddIncomes from "../screen/AddIncomes";
import AddExpenses from "../screen/AddExpenses";
import Report from "../screen/Report";

const Content = () => {
  return (
    <Routes>
      <Route path={Paths["Dashboard"]} element={<Dashboard />} />
      <Route path={Paths["AddIncomes"]} element={<AddIncomes />} />
      <Route path={Paths["AddExpenses"]} element={<AddExpenses />} />
      <Route path={Paths["Report"]} element={<Report />} />
    </Routes>
  );
};

export default Content;
