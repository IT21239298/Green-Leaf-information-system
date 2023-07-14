import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
const titleSx = {
  fontSize: "28px",
  color: "white",
  fontFamily: "Arvo",
  textAlign: "center",
};

const answerSx = {
  bgcolor: "#fff",
  fontSize: "60px",
  color: "#000",
  width: "200px",
  height: "50 px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
  boxSizing: "border-box",
  textAlign: "center",
  borderRadius: "25px",
  fontFamily: "Arvo",
  fontWeight: "bold",
  ml: "70px",
};
function TotalRawMaterial() {
  const [sum, setSum] = useState(0);

  useEffect(() => {
    // sum = localStorage.getItem("totalAmount");
    setSum(localStorage.getItem("totalAmount"));
    // console.log(localStorage.getItem("totalAmount"));
  }, []);

  return (
    <Typography sx={titleSx}>
      Total amount of raw materials <Box sx={answerSx}> {sum}</Box>{" "}
    </Typography>
  );
}

export default TotalRawMaterial;
