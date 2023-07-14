import React from "react";
import { Typography, Box } from "@mui/material";
import { default as api } from "./store/apiSlice";

const titleSx = {
  fontSize: "28px",
  color: "white",
  fontFamily: "Arvo",
};

const answerSx = {
  bgcolor: "#fff",
  fontSize: "70px",
  color: "#000",
  width: "80px",
  height: "100px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
  boxSizing: "border-box",
  textAlign: "center",
  borderRadius: "25px",
  fontFamily: "Arvo",
  fontWeight: "bold",
  ml: "95px",
};
function TotalSuppliers() {
  const { data, isFetching, isSuccess, isError } = api.useGetSupplierQuery();

  if (isFetching) {
    return <div>Fetching</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const totalSuppliers = data.length;

  return (
    <Typography sx={titleSx}>
      {" "}
      Total number of registered suppliers
      <Box sx={answerSx}> {totalSuppliers}</Box>
    </Typography>
  );
}

export default TotalSuppliers;
