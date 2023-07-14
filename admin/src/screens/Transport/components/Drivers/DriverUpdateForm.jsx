import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import DriverDatePicker from "../DateSelector";

import { Theme } from "../../utils/Theme";
import axios from "axios";

const DriverUpdateForm = ({
  id,
  driverId,
  setDriverId,
  driverFullName,
  setDriverFullName,
  driverLicense,
  setDriverLicense,
  driverPhone,
  setDriverPhone,
  driverHometown,
  setDriverHometown,
  driverDOB,
  setDriverDOB,
  driverEmploymentDate,
  setDriverEmploymentDate,
}) => {
  // const [driverId, setDriverId] = useState("");
  // const [driverFullName, setDriverFullName] = useState("");
  // const [driverLicense, setDriverLicense] = useState("");
  // const [driverPhone, setDriverPhone] = useState("");
  // const [driverHometown, setDriverHometown] = useState("");
  // const [driverDOB, setDriverDOB] = useState("");
  // const [driverEmploymentDate, setDriverEmploymentDate] = useState("");

  const handleDriverId = (event) => {
    setDriverId(event.target.value);
  };

  const handleFullName = (event) => {
    setDriverFullName(event.target.value);
  };

  const handleLicense = (event) => {
    setDriverLicense(event.target.value);
  };

  const handlePhone = (event) => {
    setDriverPhone(event.target.value);
  };

  const handleHometown = (event) => {
    setDriverHometown(event.target.value);
  };

  useEffect(() => {
    console.log(`driverID: ${driverId}`);
    axios
      .get(`http://localhost:8082/driver/find/${id}/${driverId}`)
      .then((response) => {
        console.log(response.data);
        setDriverId(response.data.driverId);
        setDriverFullName(response.data.fullName);
        setDriverLicense(response.data.licenseNumber);
        setDriverPhone(response.data.phoneNumber);
        setDriverHometown(response.data.homeTown);
        setDriverDOB(response.data.dob);
        setDriverEmploymentDate(response.data.employmentDate);
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
            }}
          >
            Driver ID
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id="driverId"
            name="driverId"
            label="Driver ID"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            value={driverId}
            onChange={handleDriverId}
          />
        </Grid>

        {/* <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            disableElevation
            sx={{ bgcolor: Theme.palette.background.primary }}
            // onClick={handleGenerateId}
          >
            Generate ID
          </Button>
        </Grid> */}
        <Grid container item xs={12} sm={2}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
            }}
          >
            Full Name
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Full Name"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            value={driverFullName}
            onChange={handleFullName}
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
            License Number
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="licenseNumber"
            name="licenseNumber"
            label="License Number"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleLicense}
            value={driverLicense}
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
            Phone Number
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handlePhone}
            value={driverPhone}
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
            Birthday
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <DriverDatePicker
            selectedDay={driverDOB}
            setSelectedDay={setDriverDOB}
            palceholder="Select birthday"
          />
        </Grid>

        <Grid container item xs={12} sm={2}>
          <InputLabel
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
              whiteSpace: "normal",
            }}
          >
            Employment Date
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <DriverDatePicker
            selectedDay={driverEmploymentDate}
            setSelectedDay={setDriverEmploymentDate}
            palceholder="Select Employment Date"
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
            Home Town
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="hometown"
            name="hometown"
            label="Home Town"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleHometown}
            value={driverHometown}
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

export default DriverUpdateForm;
