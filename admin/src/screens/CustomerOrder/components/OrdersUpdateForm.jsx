import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import MachineDatePicker from "./DateSelector";

import { Theme } from "../utils/Theme";
import axios from "axios";

const OrdersUpdateForm = ({
  id,
  orderID,
  setOrderID,
  amount,
  setAmount,
  requiredDate,
  setRequiredDate,
  type,
  setType,
}) => {

  const handleOrderID = (event) => {
    setOrderID(event.target.value);
  };

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleRequiredDate = (event) => {
    setRequiredDate(event.target.value);
  };
  const handleType = (event) => {
    setType(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8082/order/find/${id}`)
      .then((response) => {
        console.log(response.data);

        setOrderID(response.data.orderID);
        setAmount(response.data.amount);
        setRequiredDate(response.data.requiredDate);
        setType(response.data.type);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });

    console.log(`ID: ${id}`);
  }, [id]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid container item xs={12} sm={2}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
              color: "white",
            }}
          >
            Order ID
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={7}>
          <TextField
            required
            id="orderID"
            name="orderID"
            label="Order ID"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            value={orderID}
            onChange={handleOrderID}
          />
        </Grid>
       
        <Grid container item xs={12} sm={2}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
              color: "white",
            }}
          >
            Amount / KG
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="amount"
            name="amount"
            label="amount"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleAmount}
            value={amount}
          />
        </Grid>

        <Grid container item xs={12} sm={2}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
              color: "white",
            }}
          >
            Required Date
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
           <MachineDatePicker
            selectedDay={type}
            setSelectedDay={setType}
            palceholder="Select Date"
          />
        </Grid>

        <Grid container item xs={12} sm={2}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
              color: "white",
            }}
          >
            Type
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
             required
             id="type"
             name="type"
             label="type"
             fullWidth
             size="small"
             autoComplete="off"
             variant="outlined"
             onChange={handleType}
             value={type}
          />
        </Grid>

        <Grid container item xs={12} sm={3}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
              color: "white",
            }}
          >
            Profile Picture Upload
          </InputLabel>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Button>
            <UploadFileIcon />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrdersUpdateForm;
