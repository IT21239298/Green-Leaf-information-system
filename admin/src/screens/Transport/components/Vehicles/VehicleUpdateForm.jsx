import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import VehicleDatePicker from "../DateSelector";

import axios from "axios";

const VehicleUpdateForm = ({
  id,
  vehicleId,
  setVehicleId,
  makeModel,
  setMakeModel,
  manufacturerYear,
  setManufacturerYear,
  registrationNumber,
  setRegistrationNumber,
  color,
  setColor,
  ownerName,
  setOwnerName,
  maxCapacity,
  setMaxCapacity,
}) => {
  const handleVehicleId = (event) => {
    setVehicleId(event.target.value);
  };
  const handleMakeModel = (event) => {
    setMakeModel(event.target.value);
  };
  const handleRegistrationNumber = (event) => {
    setRegistrationNumber(event.target.value);
  };
  const handleColor = (event) => {
    setColor(event.target.value);
  };
  const handleOwnerName = (event) => {
    setOwnerName(event.target.value);
  };
  const handleMaxCapacity = (event) => {
    setMaxCapacity(event.target.value);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8082/vehicle/find/${id}`)
      .then((response) => {
        // console.log(response.data);
        setVehicleId(response.data.vehicleId);
        setMakeModel(response.data.makeModel);
        setManufacturerYear(response.data.manufacturerYear);
        setRegistrationNumber(response.data.registrationNumber);
        setColor(response.data.color);
        setOwnerName(response.data.ownerName);
        setMaxCapacity(response.data.maxCapacity);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });

    // console.log(`ID: ${id}`);
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
            }}
          >
            Vehicle ID
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="driverId"
            name="driverId"
            label="Driver ID"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            value={vehicleId}
            onChange={handleVehicleId}
          />
        </Grid>
        <Grid container item xs={12} sm={2}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
            }}
          >
            Make Model
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="makeModel"
            name="makeModel"
            label="Make Model"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            value={makeModel}
            onChange={handleMakeModel}
          />
        </Grid>
        <Grid container item xs={12} sm={2}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
              whiteSpace: "pre-wrap",
            }}
          >
            Registration Number
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="registrationNumber"
            name="registrationNumber"
            label="Registration Number"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleRegistrationNumber}
            value={registrationNumber}
          />
        </Grid>

        <Grid container item xs={12} sm={2}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
            }}
          >
            Color
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="color"
            name="color"
            label="Color"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleColor}
            value={color}
          />
        </Grid>

        <Grid container item xs={12} sm={2}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
              whiteSpace: "pre-wrap",
            }}
          >
            Manufacturer Year
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <VehicleDatePicker
            selectedDay={manufacturerYear}
            setSelectedDay={setManufacturerYear}
            palceholder="Select manufacturer year"
          />
        </Grid>
        <Grid container item xs={12} sm={2}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
            }}
          >
            Owner Name
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="ownerName"
            name="ownerName"
            label="Owner Name"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleOwnerName}
            value={ownerName}
          />
        </Grid>

        <Grid container item xs={12} sm={2}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
            }}
          >
            Max Capacity
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="maxCapacity"
            name="maxCapacity"
            label="Max Capacity"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleMaxCapacity}
            value={maxCapacity}
          />
        </Grid>

        <Grid container item xs={12} sm={3}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
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

export default VehicleUpdateForm;
