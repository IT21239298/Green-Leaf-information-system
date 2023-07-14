import React from "react";
import { store } from "./components/store/store";
import Main from "./screen/Main";
import { Provider } from "react-redux";

const TimeTarget = () => {
  return (
    <Provider store={store}>
    <Main />
  </Provider>
  );
};

export default TimeTarget;
