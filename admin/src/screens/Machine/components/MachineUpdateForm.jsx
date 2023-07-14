import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import MachineDatePicker from "../components/DateSelector";

import { Theme } from "../utils/Theme";
import axios from "axios";

const MachineUpdateForm = ({
  id,
  machineName,
  setMachineName,
  machineID,
  setMachineID,
  serialNumber,
  setSerialNumber,
  lastMaintenanceDate,
  setLastMaintenanceDate,
  value,
  setValue,
  // mac,
  // setMac,
}) => {
  const handleMachineName = (event) => {
    setMachineName(event.target.value);
  };

  const handleMachineID = (event) => {
    setMachineID(event.target.value);
  };

  const handleSerialNumber = (event) => {
    setSerialNumber(event.target.value);
  };

  // const handleMac = (event) => {
  //   setMac(event.target.value);
  // };

  const handleValue = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8082/machine/find/${id}`)
      .then((response) => {
        console.log(response.data);

        setMachineName(response.data.machineName);
        setMachineID(response.data.machineID);
        setSerialNumber(response.data.serialNumber);
        setLastMaintenanceDate(response.data.lastMaintenanceDate);
        setValue(response.data.value);
        // setMac(response.data.mac);
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
            Machine ID
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id="machineID"
            name="machineID"
            label="Machine ID"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            value={machineID}
            onChange={handleMachineID}
            sx={{ input: { color: "white" } }}
          />
        </Grid>

        {/* <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            disableElevation
            sx={{ bgcolor: Theme.palette.background.primary }}
            onClick={handleGenerateId}
          >
            Machine ID
          </Button>
        </Grid> */}
        <Grid container item xs={12} sm={2}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
              color: "white",
            }}
          >
            Machine Name
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id="machineName"
            name="machineName"
            label="Machine Name"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            value={machineName}
            onChange={handleMachineName}
            sx={{ input: { color: "white" } }}
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
            Serial Number
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="serialNumber"
            name="serialNumber"
            label="Serial Number"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleSerialNumber}
            value={serialNumber}
            sx={{ input: { color: "white" } }}
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
            Value
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="value"
            name="value"
            label="Value"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleValue}
            value={value}
            sx={{ input: { color: "white" } }}
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
            Last Maintenance Date
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <MachineDatePicker
            selectedDay={lastMaintenanceDate}
            setSelectedDay={setLastMaintenanceDate}
            palceholder="Select Date"
          />
        </Grid>

        {/* <Grid container item xs={12} sm={2}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
              whiteSpace: "normal",
            }}
            w
          >
            Employment Date
          </InputLabel>
        </Grid> */}
        {/* <Grid item xs={12} sm={4}>
          <DriverDatePicker
            selectedDay={driverEmploymentDate}
            setSelectedDay={setDriverEmploymentDate}
            palceholder="Select Employment Date"
          />
        </Grid> */}
        {/* <Grid container item xs={12} sm={2}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
              color: "white",
            }}
          >
            MAC
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="mac"
            name="mac"
            label="MAC"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleMac}
            value={mac}
          />
        </Grid> */}

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

export default MachineUpdateForm;
