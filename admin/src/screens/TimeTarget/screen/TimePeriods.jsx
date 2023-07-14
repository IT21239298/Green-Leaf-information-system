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
  Card,
  CardContent,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { default as api } from "../components/store/apiSlice";
import Targets from "../components/viewTimePeriod";

const titleSx = {
  fontSize: "25px",
  color: "white",
  fontFamily: "Arvo",
  fontWeight: "bold",
};

const boxSX = {
  bgcolor: "#2F2F3D",
  width: "600px",
  height: "650px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
  boxSizing: "border-box",
  borderRadius: "25px",
  textAlign: "center",
  px: "10px",
  padding: "5px 18px",
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
export default function AddTime({ timeData }) {
  const { register, handleSubmit, resetField } = useForm();
  const [addTime] = api.useAddTimeMutation();
  const [totalAmount, setTotalAmount] = useState(null);

  const onSubmit = async (data) => {
    if (!data) return {};
    const { targetName, timeAvailable, timePeriod } = data;
    const totalAmount = timeAvailable - timePeriod;
    await addTime({
      targetName,
      timeAvailable,
      timePeriod,
      totalAmount,
    }).unwrap();
    setTotalAmount(totalAmount);
    resetField("targetName");
    resetField("timeAvailable");
    resetField("timePeriod");
  };

  return (
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={boxSX} ml={"100px"}>
            <Typography sx={titleSx}>Enter Details</Typography>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Enter Target Id</InputLabel>
              <Input
                style={inputSx}
                name="targetName"
                {...register("targetName")}
                required
              />
            </FormControl>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Time Available</InputLabel>
              <Input
                style={inputSx}
                name="timeAvailable"
                {...register("timeAvailable")}
                type="Number"
                required
              />
            </FormControl>

            <FormControl sx={formSX}>
              <InputLabel style={label}>Time Period</InputLabel>
              <Input
                style={inputSx}
                name="timePeriod"
                {...register("timePeriod")}
                type="Number"
                required
              />
            </FormControl>

            <Button
              color="success"
              variant="contained"
              type="submit"
              sx={{ mt: 2, mb: 1, bgcolor: "green" }}
            >
              ADD TIME
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={boxSX}>
            <Targets />
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
