import React from "react";
import { ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";

import { Theme } from "./utils/Theme";

import Main from "./screen/Main";
import Test from "./screen/Test";

const Transport = () => {
  return (
    <ThemeProvider theme={Theme}>
      <div>
        <Main />
        {/* <Test /> */}
        {/* <TestComp /> */}
        {/* <DriverDatePicker /> */}
        <Toaster />
      </div>
    </ThemeProvider>
  );
};

export default Transport;
