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

const MaintenanceUpdateForm = ({
  id,
  partName,
  setPartName,
  machineID,
  setMachineID,
  statues,
  setStatues,
  lastMaintenanceDate,
  setLastMaintenanceDate,
  value,
  setValue,
  // mac,
  // setMac,
}) => {
  const handlePartName = (event) => {
    setPartName(event.target.value);
  };

  const handleMachineID = (event) => {
    setMachineID(event.target.value);
  };

  const handleStatues = (event) => {
    setStatues(event.target.value);
  };

  // const handleMac = (event) => {
  //   setMac(event.target.value);
  // };

  const handleValue = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8082/maintenance/find/${id}`)
      .then((response) => {
        console.log(response.data);

        setPartName(response.data.partName);
        setMachineID(response.data.machineID);
        setStatues(response.data.statues);
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
            Part Name
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id="partName"
            name="partName"
            label="Part Name"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            value={partName}
            onChange={handlePartName}
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
            Statues
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="statues"
            name="statues"
            label="Statues"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleStatues}
            value={statues}
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

export default MaintenanceUpdateForm;
