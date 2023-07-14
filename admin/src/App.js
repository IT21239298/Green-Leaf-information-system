import Home from "./screens/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Paths } from "./utils/Paths";

import SupplierQuantity from "./screens/SupplierQuantity/SupplierQuantity";
import Transport from "./screens/Transport/Transport";
import Warehouse from "./screens/Warehouse/Warehouse";
import CustomerOrder from "./screens/CustomerOrder/CustomerOrder";
import Machine from "./screens/Machine/Machine";
import Finance from "./screens/Finance/Finance";
import TimeTarget from "./screens/TimeTarget/TimeTarget";
import SupplierPayment from "./screens/SupplierPayment/SupplierPayment";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={`${Paths["Home"]}/*`} element={<Home />} />
        <Route
          path={`${Paths["SupplierQuantity"]}/*`}
          element={<SupplierQuantity />}
        />
        <Route path={`${Paths["Transport"]}/*`} element={<Transport />} />
        <Route path={`${Paths["Warehouse"]}/*`} element={<Warehouse />} />
        <Route
          path={`${Paths["CustomerOrder"]}/*`}
          element={<CustomerOrder />}
        />
        <Route path={`${Paths["Machine"]}/*`} element={<Machine />} />
        <Route path={`${Paths["Finance"]}/*`} element={<Finance />} />
        <Route path={`${Paths["TimeTarget"]}/*`} element={<TimeTarget />} />
        
      
        <Route
          path={`${Paths["SupplierPayment"]}/*`}
          element={<SupplierPayment />}
        />
      </Routes>
    </Router>
  );
}

export default App;
