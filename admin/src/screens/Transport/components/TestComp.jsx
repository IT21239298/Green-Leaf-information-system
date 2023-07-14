import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";

import DriverDatePicker from "./DateSelector";

export default function TestComp() {
  const [driverDOB, setDriverDOB] = useState(null);
  const [driverEmploymentDate, setDriverEmploymentDate] = useState(null);

  const categories = [
    "science",
    "sports",
    "business",
    "politics",
    "entertainment",
    "technology",
    "world",
    "all",
  ];
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
        <Grid item xs={12} sm={7}>
          <TextField
            required
            id="driverId"
            name="driverId"
            label="Driver ID"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Button variant="contained" disableElevation sx={{}}>
            Generate ID
          </Button>
        </Grid>
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
            w
          >
            Employment Date
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <DriverDatePicker
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
            Img Upload
          </InputLabel>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Button>
            <UploadFileIcon />
          </Button>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Button variant="contained">Save</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
