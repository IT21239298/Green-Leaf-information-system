import React from "react";
import { useForm } from "react-hook-form";
import { default as api } from "../components/store/apiSlice";

import {
  Box,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Button,
  Grid,
} from "@mui/material";

const titleSx = {
  fontSize: "20px",
  color: "white",
  fontFamily: "Arvo",
  fontWeight: "bold",
};

const title2Sx = {
  fontSize: "25px",
  color: "white",
  fontFamily: "Arvo",
  fontWeight: "bold",
  padding: "30px",
};

const formSX = {
  width: "60%",
  padding: "20px 10px",
  mt: "-10px",
};

const formSX2 = {
  width: "100%",
  padding: "50px 20px",
};

const label = {
  color: "#14EDBD",
  fontSize: "20px",
  fontFamily: "Arvo",
};

const label2 = {
  color: "#14EDBD",
  fontSize: "20px",
  fontFamily: "Arvo",
};

const inputSx = {
  color: "#fff",
  fontSize: "16px",
  fontFamily: "Arvo",
};

const inputSx2 = {
  color: "#fff",
  fontSize: "16px",
  fontFamily: "Arvo",
};

export default function Calculation() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [addpayment] = api.useAddpaymentMutation();

  const onSubmit = async (data) => {
    // Calculate Tea leaves quantity
    data.mquantity = data.unitprice * data.quantity;

    // Calculate Monthly Payment
    data.mPay =
      data.mquantity - data.cost - data.packetcost - data.transecost;

    if (!data) return {};
    await addpayment(data).unwrap();
    reset();

    // Display calculated values
    alert(`Tea Leaves Price (Monthly): ${data.mquantity}`);
    alert(`Monthly Payment: ${data.mPay}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box
          sx={{
            bgcolor: "#2F2F3D",
            width: "500px",
            height: "770px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "60px",
            mt: "10px",
          }}
        >
          <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography sx={titleSx}>Enter Details</Typography>

            <FormControl sx={formSX}>
              <InputLabel style={label}>Supplier ID</InputLabel>
              <Input
                style={inputSx}
                name="supID"
                {...register("supID", {
                  required: "Supplier ID is required",
                  validate: (value) =>
                    value !== "existingID" || "Supplier ID already exists",
                })}
              />
              {errors.supID && (
                <Typography style={{ color: "red" }}>
                  {errors.supID.message}
                </Typography>
              )}
            </FormControl>

            <FormControl sx={formSX}></FormControl>
            <FormControl sx={formSX}>
            <InputLabel style={label}> Tea leaves Quantity</InputLabel>
              <Input
                style={inputSx}
                name="quantity"
                {...register("quantity")}
              />
            </FormControl>

            <FormControl sx={formSX}></FormControl>
            <FormControl sx={formSX}>
              <InputLabel style={label}> Tea leaves Price(Monthly)</InputLabel>
              <Input
                style={inputSx}
                name="mquantity"
                {...register("mquantity")}
              />
            </FormControl>

            <FormControl sx={formSX}>
              <InputLabel style={label}> Fertilizer Cost</InputLabel>
              <Input style={inputSx} name="cost" {...register("cost")} />
            </FormControl>

            <FormControl sx={formSX}>
              <InputLabel style={label}> Tea packet Cost</InputLabel>
              <Input
                style={inputSx}
                name="packetcost"
                {...register("packetcost")}
              />
            </FormControl>

            <FormControl sx={formSX}>
              <InputLabel style={label}> Transport Cost</InputLabel>
              <Input
                style={inputSx}
                name="transecost"
                {...register("transecost")}
              />
            </FormControl>

            <FormControl sx={formSX}>
              <InputLabel style={label}> Monthly Payment </InputLabel>
              <Input style={inputSx} name="mPay" {...register("mPay")} />
            </FormControl>
          </form>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            bgcolor: "#2F2F3D",
            width: "500px",
            height: "400px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            mt: "150px",
            ml: "60px",
          }}
        >
          <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography sx={title2Sx}>Monthly Unit Price(1Kg)</Typography>

            <FormControl sx={title2Sx}></FormControl>
            <FormControl sx={formSX2}>
              <InputLabel style={label2}> Unit Price(Monthly)</InputLabel>
              <Input
                style={inputSx2}
                name="unitprice"
                {...register("unitprice")}
              />
            </FormControl>

            <Button color="success" variant="contained" type="submit">
              Calculate
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

