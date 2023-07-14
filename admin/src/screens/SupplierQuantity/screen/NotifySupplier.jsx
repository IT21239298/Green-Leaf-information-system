import React from "react";
import { useState } from "react";

import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Button,
} from "@mui/material";

import { useForm } from "react-hook-form";
import msg from "../assets/img/msg.png";

import { default as api } from "../components/store/apiSlice";

const titleSx = {
  fontSize: "25px",
  color: "white",
  fontFamily: "Arvo",
  fontWeight: "bold",
};

const boxSX = {
  bgcolor: "#2F2F3D",
  width: "600px",
  height: "700px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
  boxSizing: "border-box",
  borderRadius: "25px",
  textAlign: "center",
  px: "10px",
  padding: "5px 18px",
  mt: "5px",
  ml: "50px",
};
const formSX = {
  width: "100%",
  padding: "20px 15px",
};

const label = {
  color: "#14EDBD",
  fontSize: "15px",
  fontFamily: "Arvo",
};

const inputSx = {
  color: "#fff",
  fontSize: "16px",
  fontFamily: "Arvo",
};

export default function AddSupplierQuantity({ quantityData }) {
  const { register, handleSubmit } = useForm({});
  const [addSupplierQuantity] = api.useAddSupplierQuantityMutation();

  const onSubmit = async (data) => {
    const {
      supplierID,
      supQuantity,
      Date,
      supMoisture,
      supTotalQuantity,
      supContact,
    } = data;

    const message = `*Daily provided raw material quantity 👍*\nSupplier ID: ${supplierID}\nQuantity: ${supQuantity}\nDate: ${Date}\nMoisture: ${supMoisture}\nTotal Quantity: ${supTotalQuantity}`;
    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://web.whatsapp.com/send?phone=${supContact}&text=${encodedMessage}`
    );
  };

  return (
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box
            sx={{
              bgcolor: "#2F2F3D",
              width: "1400px",
              height: "70px",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              boxSizing: "border-box",
              borderRadius: "25px",
              textAlign: "center",
              mt: "40px",
            }}
          >
            <Typography
              sx={{
                fontSize: "35px",
                color: "#55C595",
                fontFamily: "Arvo",

                textAlign: "center",
                ml: "10px",
              }}
            >
              NOTIFY THE SUPPLIER ON DAILY PROVIDED QUANTITY AMOUNT
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={boxSX}>
            <Typography sx={titleSx}>Enter Details</Typography>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Enter Supplier ID Id</InputLabel>
              <Input
                style={inputSx}
                name="supplierID"
                {...register("supplierID")}
              />
            </FormControl>
            <FormControl sx={formSX}>
              <InputLabel style={label}>supplier Quantity</InputLabel>
              <Input
                style={inputSx}
                name="supQuantity"
                type="Number"
                {...register("supQuantity")}
              />
            </FormControl>

            <FormControl sx={formSX}>
              <InputLabel style={label}>date</InputLabel>
              <Input
                style={inputSx}
                name="Date"
                type="date"
                {...register("Date")}
              />
            </FormControl>

            <FormControl sx={formSX}>
              <InputLabel style={label}>sup moisture</InputLabel>
              <Input
                style={inputSx}
                name="supMoisture"
                type="number"
                {...register("supMoisture")}
              />
            </FormControl>

            <FormControl sx={formSX}>
              <InputLabel style={label}>supplier total amount</InputLabel>
              <Input
                style={inputSx}
                name="supTotalQuantity"
                type="number"
                {...register("supTotalQuantity")}
              />
            </FormControl>

            <FormControl sx={formSX}>
              <InputLabel style={label}>supplier contact numbert</InputLabel>
              <Input
                style={inputSx}
                name="supContact"
                type="String"
                {...register("supContact")}
              />
            </FormControl>

            <FormControl>
              <Button color="success" variant="contained" type="submit">
                SEND
              </Button>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <img
            alt="msg"
            src={msg}
            style={{
              width: "100%",
              height: "650px",
              boxShadow: "0px 0px 5px #ccc",
              marginTop: "10px",
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
}
