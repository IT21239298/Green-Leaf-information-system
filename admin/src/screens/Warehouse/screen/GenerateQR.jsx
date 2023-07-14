import React, { useRef, useState } from "react";
import QRCode from "qrcode.react";
import { Box, Typography, Grid } from "@mui/material";
import html2canvas from "html2canvas";

import { FormControl, InputLabel, Input, Button } from "@mui/material";

import "react-toastify/dist/ReactToastify.css";

const titleSx = {
  fontSize: "25px",
  color: "white",
  fontFamily: "Arvo",
  fontWeight: "bold",
  marginTop: "20px",
};
const btn = {
  marginTop: "10px",
  marginLeft: "5px",
};
const formSX = {
  width: "100%",
  padding: "25px 20px",
};

const label = {
  color: "#14EDBD",
  fontSize: "20px",
  fontFamily: "Arvo",
};

const inputSx = {
  color: "#fff",
  fontSize: "16px",
  fontFamily: "Arvo",
};
const mg = {
  color: "green",
  bgcolor: "#2F2F3D",
  width: "500px",
  height: "60px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)",
  boxSizing: "border-box",
  borderRadius: "25px",
  textAlign: "center",
  fontSize: "20px",
};

function GenerateQR() {
  const [details, setDetails] = useState({
    envNo: "",
    date: "",
    grade: "",
    amount: "",
  });

  const [count, setCount] = useState(1);

  const qrCodeRefs = useRef([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleCountChange = (e) => {
    const value = e.target.value;
    setCount(value);
  };

  const generateUniqueId = () => {
    return `${details.envNo}-${Math.random().toString(36).substr(2, 9)}`;
  };
  const handleDownload = (index) => () => {
    const uniqueId = generateUniqueId();
    const button = document.getElementById(`download-button-${index}`);
    button.style.display = "none";
    html2canvas(qrCodeRefs.current[index]).then((canvas) => {
      button.style.display = "block";
      const link = document.createElement("a");
      link.download = `qrcode-${uniqueId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  const renderQRCodes = () => {
    const qrcodes = [];
    const rows = Math.ceil(count / 3); // 3 columns
    for (let i = 0; i < rows; i++) {
      const columns = Math.min(count - i * 3, 3);
      const rowQRCodes = [];
      for (let j = 0; j < columns; j++) {
        const index = i * 3 + j;
        const uniqueId = generateUniqueId();
        rowQRCodes.push(
          <div key={index} style={{ display: "inline-block", margin: "10px" }}>
            <div ref={(el) => (qrCodeRefs.current[index] = el)}>
              <h4>QR Code #{index + 1}</h4>
              <QRCode value={JSON.stringify({ ...details, uniqueId })} />
              <Button
                id={`download-button-${index}`}
                onClick={handleDownload(index)}
                color="success"
                variant="contained"
                type="submit"
                sx={btn}
              >
                Download
              </Button>
            </div>
          </div>
        );
      }
      qrcodes.push(<div key={i}>{rowQRCodes}</div>);
    }
    return qrcodes;
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Typography sx={titleSx}>QR Code Generator</Typography>
        <form>
          <Box
            sx={{
              bgcolor: "#2F2F3D",
              width: "500px",
              height: "600px",
              marginLeft: "100px",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              boxSizing: "border-box",
              borderRadius: "25px",
              marginTop: "30px",
            }}
          >
            <FormControl sx={formSX}>
              <InputLabel style={label}>Enter Env No</InputLabel>
              <Input
                style={inputSx}
                type="text"
                id="name"
                name="envNo"
                value={details.envNo}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl sx={formSX}>
              <InputLabel style={label}>Enter Date:</InputLabel>
              <Input
                style={inputSx}
                type="date"
                id="date"
                name="date"
                value={details.date}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Enter Amount:</InputLabel>
              <Input
                style={inputSx}
                type="number"
                id="amount"
                name="amount"
                value={details.amount}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Enter Grade:</InputLabel>
              <Input
                style={inputSx}
                type="text"
                id="grade"
                name="grade"
                value={details.grade}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl sx={formSX}>
              <InputLabel style={label} marginTop="50px">
                Number of QR Codes:
              </InputLabel>
              <Input
                style={inputSx}
                type="number"
                id="count"
                name="count"
                min={1}
                max={10}
                value={count}
                onChange={handleCountChange}
              />
            </FormControl>
          </Box>
        </form>
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            bgcolor: "#fff",
            width: "780px",
            height: "800px",
            marginRight: "500px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            marginTop: "50px",
          }}
        >
          {renderQRCodes()}
        </Box>
      </Grid>
    </Grid>
  );
}

export default GenerateQR;
