import React, { useState } from "react";

import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Button,
  Select,
  MenuItem,
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
  height: "650 px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
  boxSizing: "border-box",
  borderRadius: "25px",
  textAlign: "center",
  ml: "30px",
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

export default function AddTarget({ targetData }) {
  const { register, handleSubmit, resetField } = useForm();
  const [addTarget] = api.useAddTargetMutation();
  const [targetID, setTargetID] = useState("");

  const onSubmit = async (data) => {
    if (!data) return {};
    await addTarget(data).unwrap();
    resetField("targetID");
    resetField("targetName");
    resetField("description");
    resetField("time");
    resetField("date");
    resetField("quantity");
    resetField("value");
    resetField("targetType");
    resetField("quickTarget");
    resetField("orderDate");
    resetField("finalDate");
    resetField("driverDetails");
  };

  const generateTargetId = () => {
    setTargetID(generateTargetId());
  };

  const addTargetDetails = async () => {
    console.log(targetData);
    await addTarget(targetData);
  };

  return (
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={6} justifyContent="flex-start">
          <Box sx={boxSX}>
            <Typography sx={titleSx}>Target Details</Typography>

            <FormControl
              sx={{ padding: "20px 15px", width: "45%", float: "left" }}
            >
              <InputLabel style={label}>Target ID</InputLabel>
              <Input
                style={inputSx}
                {...register("targetID")}
                name="targetID"
                required
              />
            </FormControl>
            <FormControl
              sx={{ padding: "20px 15px", width: "45%", float: "right" }}
            >
              <InputLabel style={label}>Target name</InputLabel>
              <Input
                style={inputSx}
                {...register("targetName")}
                name="targetName"
                required
              />
            </FormControl>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Description</InputLabel>
              <Input
                style={inputSx}
                {...register("description")}
                name="description"
                required
              />
            </FormControl>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Time</InputLabel>
              <Input
                style={inputSx}
                {...register("time")}
                name="time"
                rows={3}
              />
            </FormControl>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Date</InputLabel>
              <Input style={inputSx} {...register("date")} name="date" />
            </FormControl>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Quick target?</InputLabel>
              <Select style={inputSx} {...register("quantity")} name="quantity">
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={2}>No</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Time to be completed</InputLabel>
              <Select style={inputSx} {...register("value")} name="value">
                <MenuItem value={1}>1 day</MenuItem>
                <MenuItem value={2}>3 days</MenuItem>
                <MenuItem value={2}>1 week</MenuItem>
                <MenuItem value={2}>1 month</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={boxSX}>
            <Typography sx={titleSx}>Timetable Details</Typography>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Timetable ID</InputLabel>
              <Input
                style={inputSx}
                {...register("targetType")}
                name="targetType"
                required
              />
            </FormControl>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Target</InputLabel>
              <Input
                style={inputSx}
                {...register("quickTarget")}
                name="quickTarget"
                required
              />
            </FormControl>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Time period</InputLabel>
              <Input
                style={inputSx}
                {...register("orderDate")}
                name="orderDate"
                required
              />
            </FormControl>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Quantity</InputLabel>
              <Input
                style={inputSx}
                {...register("finalDate")}
                name="finalDate"
                required
              />
            </FormControl>
            {/* <Button variant="outlined" onClick={handleGenerateID}>
              Generate ID
            </Button> */}
            <FormControl sx={formSX}>
              <InputLabel style={label}>Details</InputLabel>
              <Input
                style={inputSx}
                name="driverDetails"
                required
                // value={supID}
                {...register("driverDetails")}
              />
            </FormControl>

            <FormControl>
              <Button
                color="success"
                variant="contained"
                type="submit"
                onClick={() => addTargetDetails()}
              >
                Save Details
              </Button>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
