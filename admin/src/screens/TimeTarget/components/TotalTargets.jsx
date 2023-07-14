import React from "react";
import { Typography, Box } from "@mui/material";
import { default as api } from "./store/apiSlice";

const titleSx = {
  fontSize: "20px",
  color: "white",
  fontFamily: "Arvo",
};

const answerSx = {
  bgcolor: "#fff",
  fontSize: "60px",
  color: "#000",
  width: "70px",
  height: "50 px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
  boxSizing: "border-box",
  textAlign: "center",
  borderRadius: "25px",
  fontFamily: "Arvo",
  fontWeight: "bold",
  ml: "70px",
};
function TotalTargets() {
  const { data, isFetching, isSuccess, isError } = api.useGetTargetQuery();

  if (isFetching) {
    return <div>Fetching</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const totalTargets = data.length;

  return (
    <Typography sx={titleSx}>
      {" "}
      Total number of targets
      <Box sx={answerSx}> {totalTargets}</Box>
    </Typography>
  );
}

export default TotalTargets;
