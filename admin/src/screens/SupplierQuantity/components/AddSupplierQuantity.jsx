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

import { default as api } from "../components/store/apiSlice";

const titleSx = {
  fontSize: "25px",
  color: "white",
  fontFamily: "Arvo",
  fontWeight: "bold",
};

const boxSX = {
  bgcolor: "#2F2F3D",
  width: "500px",
  height: "650px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
  boxSizing: "border-box",
  borderRadius: "25px",
  textAlign: "center",
  px: "10px",
  padding: "5px 18px",
  mt: "80px",

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
    const { supplierID, supQuantity, Date, supMoisture, supTotalQuantity } =
      data;
    await addSupplierQuantity({
      supplierID,
      supQuantity,
      Date,
      supMoisture,
      supTotalQuantity,
    }).unwrap();
  };

  return (
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}></Grid>
        <Grid item xs={6}>
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

          <FormControl>
            <Button color="success" variant="contained" type="submit">
              ADD
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
}
