import React from "react";
import { Routes, Route } from "react-router-dom";
import { Paths } from "../utils/Paths";

import Dashboard from "../screen/Dashboard";
import RowMaterial from "../screen/RowMaterial";
import PackingMaterial from "../screen/PackingMaterial";
import FinalProduct from "../screen/FinalProduct";
import MachineParts from "../screen/MachineParts";
import GenerateQR from "../screen/GenerateQR";

const Content = () => {
  return (
    <Routes>
      <Route path={Paths["Dashboard"]} element={<Dashboard />} />
      <Route path={Paths["RowMaterial"]} element={<RowMaterial />} />
      <Route path={Paths["PackingMaterial"]} element={<PackingMaterial />} />
      <Route path={Paths["FinalProduct"]} element={<FinalProduct />} />
      <Route path={Paths["MachineParts"]} element={<MachineParts />} />
      <Route path={Paths["GenerateQR"]} element={<GenerateQR />} />
    </Routes>
  );
};

export default Content;
