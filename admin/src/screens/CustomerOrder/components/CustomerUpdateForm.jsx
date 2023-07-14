import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import CustomerDatePicker from "./DateSelector";

import { Theme } from "../utils/Theme";
import axios from "axios";

const CustomerUpdateForm = ({
  id,
  customerName,
  setCustomerName,
  customerID,
  setCustomerID,
  contactNumber,
  setContactNumber,
  requestedDate,
  setRequestedDate,
  orderID,
  setOrderID,
  
}) => {
  
  const handleCustomerName = (event) => {
    setCustomerName(event.target.value);
  };

  const handleCustomerID = (event) => {
    setCustomerID(event.target.value);
  };

  const handleContactNumber = (event) => {
    setContactNumber(event.target.value);
  };

  const handleOrderID = (event) => {
    setOrderID(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8082/customer/find/${id}`)
      .then((response) => {
        console.log(response.data);
        setCustomerName(response.data.customerName);
        setCustomerID(response.data.customerID);
        setContactNumber(response.data.contactNumber);
        setRequestedDate(response.data.requestedDate);
        setOrderID(response.data.value);
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
            Customer ID
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id="customerID"
            name="customerID"
            label="Customer ID"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            value={customerID}
            onChange={handleCustomerID}
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
            Customer Name
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id="customerName"
            name="customerName"
            label="Customer Name"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            value={customerName}
            onChange={handleCustomerName}
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
            Contact Number
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="contactNumber"
            name="contactNumber"
            label="Contact Number"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleContactNumber}
            value={contactNumber}
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
            OrderID
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="orderID"
            name="orderID"
            label="orderID"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleOrderID}
            value={orderID}
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
            Requested Date
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomerDatePicker
            selectedDay={requestedDate}
            setSelectedDay={setRequestedDate}
            palceholder="Select Date"
          />
        </Grid>
  
      </Grid>
    </Box>
  );
};

export default CustomerUpdateForm;
