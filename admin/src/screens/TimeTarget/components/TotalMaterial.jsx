import React from "react";
import { Typography, Box } from "@mui/material";
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
function TotalMaterial() {
  return <Typography sx={titleSx}> Total amount of time available</Typography>;
}

export default TotalMaterial;
