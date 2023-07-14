import React from "react";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Button,
  Card,
  CardContent,
  FormHelperText,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { default as api } from "../components/store/apiSlice";
import InspectQuantityDetails from "../components/viewQuantity";

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
const schema = yup.object().shape({
  vehicle: yup.string().required(),
  quantity: yup.number().required().positive().integer(),
  moisture: yup.number().required().positive().integer(),
});

export default function AddQuantity({ quantityData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      vehicle: "",
      quantity: 0,
      moisture: 0,
    },
  });

  const [addQuantity] = api.useAddQuantityMutation();
  const [totalAmount, setTotalAmount] = useState(null);

  const onSubmit = async (data) => {
    const { vehicle, quantity, moisture } = data;
    const totalAmount = quantity - moisture;
    await addQuantity({ vehicle, quantity, moisture, totalAmount }).unwrap();
    setTotalAmount(totalAmount);
    reset({
      vehicle: "",
      quantity: 0,
      moisture: 0,
    });
  };

  return (
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box
            sx={{
              bgcolor: "#2F2F3D",
              width: "900px",
              height: "80px",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              boxSizing: "border-box",
              borderRadius: "25px",
              textAlign: "center",
              ml: "200px",
            }}
          >
            <Typography
              sx={{
                fontSize: "40px",
                color: "#55C595",
                fontFamily: "Arvo",

                textAlign: "center",
                ml: "10px",
              }}
            >
              Inbound Quantity Details
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={boxSX} ml={"50px"}>
            <Typography sx={titleSx}>Enter Details</Typography>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Enter vehicle Id</InputLabel>
              <Input
                style={inputSx}
                name="vehicle"
                {...register("vehicle")}
                required
                error={!!errors.vehicle}
              />
              {errors.vehicle && (
                <FormHelperText variant="caption" color="red" textSize="10px">
                  {errors.vehicle.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Quantity</InputLabel>
              <Input
                style={inputSx}
                name="quantity"
                {...register("quantity")}
                type="Number"
                required
                error={!!errors.quantity}
              />
              {errors.quantity && (
                <FormHelperText variant="caption" color="red" textSize="10px">
                  {errors.quantity.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl sx={formSX}>
              <InputLabel style={label}>Amount of moisture</InputLabel>
              <Input
                style={inputSx}
                name="moisture"
                {...register("moisture")}
                type="Number"
                required
                error={!!errors.moisture}
              />
              {errors.moisture && (
                <FormHelperText variant="caption" color="error" textSize="10px">
                  {errors.moisture.message}
                </FormHelperText>
              )}
            </FormControl>

            <Button
              color="success"
              variant="contained"
              type="submit"
              sx={{ mt: 2, mb: 4, bgcolor: "green" }}
            >
              Calculate Total Amount
            </Button>
            <Card
              variant="outlined"
              sx={{ mt: 1, bgcolor: "#105949", color: "#ffffff" }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontSize: "25px",
                    fontFamily: "Arvo",

                    color: "white",
                  }}
                >
                  Total Amount
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontSize: "20px",
                    fontFamily: "Arvo",
                    fontWeight: "bold",
                  }}
                >
                  {totalAmount}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              bgcolor: "#2F2F3D",
              width: "550px",
              height: "750px",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              boxSizing: "border-box",
              borderRadius: "25px",
              textAlign: "center",
              mt: "50px",
              mr: "30px",
              px: "10px",
              padding: "5px 18px",
            }}
          >
            <InspectQuantityDetails />
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
