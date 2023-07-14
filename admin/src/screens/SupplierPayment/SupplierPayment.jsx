import React from "react";

import Main from "./screen/Main";
import { Provider } from "react-redux";
import { store } from "./components/store/store";

const SupplierPayment = () => {
  return (
    <Provider store={store}>
    <Main />
  </Provider>
  );
};

export default SupplierPayment;
