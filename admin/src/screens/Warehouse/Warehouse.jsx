import React from "react";

import Main from "./screen/Main";
import { Provider } from "react-redux";
import { store } from "./components/store/store";
const Warehouse = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default Warehouse;
