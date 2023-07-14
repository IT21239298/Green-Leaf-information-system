import React from "react";
import { Routes, Route } from "react-router-dom";
import { Paths } from "../utils/Paths";

import Dashboard from "../screen/Dashboard";
import RegisterSupplier from "../screen/RegisterSupplier";
import InspectSupplierDetails from "../screen/InspectSupplierDetails";
import NotifySupplier from "../screen/NotifySupplier";
import QuantityDetails from "../screen/QuantityDetails";
import Compare from "../screen/Compare";

import SupplyAmount from "./SupplyAmount";
import InboundAmount from "./InboundAmount";

const Content = () => {
  return (
    <Routes>
      <Route path={Paths["Dashboard"]} element={<Dashboard />} />
      <Route path={Paths["RegisterSupplier"]} element={<RegisterSupplier />} />
      <Route
        path={Paths["InspectSupplierDetails"]}
        element={<InspectSupplierDetails />}
      />
      <Route path={Paths["NotifySupplier"]} element={<NotifySupplier />} />
      <Route path={Paths["QuantityDetails"]} element={<QuantityDetails />} />
      <Route path={Paths["Compare"]} element={<Compare />} />
      <Route path={"inboundAmount"} element={<InboundAmount />} />
      <Route path={"supplyAmount"} element={<SupplyAmount />} />
    </Routes>
  );
};

export default Content;
