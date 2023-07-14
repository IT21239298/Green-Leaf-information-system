import { Button, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const titlesx = {
  fontSize: "24px",
  color: "white",
  fontFamily: "Arvo",
  textAlign: "center",
  lineHeight: "3em",
};

const answerSx = {
  bgcolor: "#fff",
  fontSize: "60px",
  color: "#000",
  width: "250px",
  height: "80 px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
  boxSizing: "border-box",
  textAlign: "center",
  borderRadius: "25px",

  ml: "70px",
};

function LossPage() {
  const [sum, setSum] = useState(0);
  const [supAmount, setSupamount] = useState(0);
  const [difference, setDifference] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSum(localStorage.getItem("totalAmount"));
    setSupamount(localStorage.getItem("supplyAmount"));
  });

  const handleCalculation = () => {
    const result = sum - supAmount;
    setDifference(result);
    if (supAmount > sum) {
      setMessage("There is a loss!");
    } else {
      setMessage("There is no loss.");
    }
  };

  return (
    <div>
      <Typography sx={titlesx}>Inbound amount: {sum}</Typography>
      <Typography sx={titlesx}>Supply amount: {supAmount}</Typography>
      <Button variant="outlined" onClick={handleCalculation}>
        Calculate difference
      </Button>
      <Box sx={answerSx}>
        <Typography
          sx={{
            color: "#000",
            fontSize: "23px",
            fontFamily: "Arvo",
            fontWeight: "bold",
          }}
        >
          Difference: {difference}
        </Typography>
        <Typography
          sx={{
            color: "#000",
            fontSize: "23px",
            fontFamily: "Arvo",
            fontWeight: "bold",
          }}
        >
          {message}
        </Typography>
      </Box>
    </div>
  );
}

export default LossPage;
