import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import DriverDatePicker from "../DateSelector";

import { Theme } from "../../utils/Theme";
import { generateDriverId } from "../../utils/generateDriverId";
import axios from "axios";
import { Toast } from "../../utils/toast";
import { uploadDriverImage } from "../../services/api";

const DriverAddForm = ({ setOpen }) => {
  const [driverId, setDriverId] = useState("");
  const [driverFullName, setDriverFullName] = useState("");
  const [driverLicense, setDriverLicense] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [driverHometown, setDriverHometown] = useState("");
  const [driverDOB, setDriverDOB] = useState("");
  const [driverEmploymentDate, setDriverEmploymentDate] = useState("");

  const [errorDriverId, setErrorDriverId] = useState(false);
  const [helperTextDriverId, setHelperTextDriverId] = useState("");

  const [errorDriverFullName, setErrorDriverFullName] = useState(false);
  const [helperTextDriverFullName, setHelperTextDriverFullName] = useState("");

  const [errorLicenseNumber, setErrorLicenseNumber] = useState(false);
  const [helperTextLicenseNumber, setHelperTextLicenseNumber] = useState("");

  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [helperTextPhoneNumber, setHelperTextPhoneNumber] = useState("");

  const [errorHometown, setErrorHometown] = useState(false);
  const [helperTextHometown, setHelperTextHometown] = useState("");

  const [errorDOB, setErrorDOB] = useState(false);
  const [helperTextDOB, setHelperTextDOB] = useState("");

  const [errorEmploymentDate, setErrorEmploymentDate] = useState(false);
  const [helperTextEmploymentDate, setHelperTextEmploymentDate] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleClose = () => {
    setDriverId("");
    setDriverFullName("");
    setDriverLicense("");
    setDriverPhone("");
    setDriverHometown("");
    setDriverDOB("");
    setDriverEmploymentDate("");

    setOpen(false);
  };

  const handleSaveDriver = () => {
    const formData = new FormData();

    if (driverId === "") {
      setErrorDriverId(true);
      setHelperTextDriverId("Please fill this field");
    } else {
      setErrorDriverId(false);
      setHelperTextDriverId("");
      formData.append("driverId", driverId);
    }

    if (driverFullName === "") {
      setErrorDriverFullName(true);
      setHelperTextDriverFullName("Please fill this field");
    } else {
      setErrorDriverFullName(false);
      setHelperTextDriverFullName("");
    }

    if (driverLicense === "") {
      setErrorLicenseNumber(true);
      setHelperTextLicenseNumber("Please fill this field");
    } else {
      setErrorLicenseNumber(false);
      setHelperTextLicenseNumber("");
    }

    if (driverPhone === "") {
      setErrorPhoneNumber(true);
      setHelperTextPhoneNumber("Please fill this field");
    } else {
      setErrorPhoneNumber(false);
      setHelperTextPhoneNumber("");
    }

    if (driverHometown === "") {
      setErrorHometown(true);
      setHelperTextHometown("Please fill this field");
    } else {
      setErrorHometown(false);
      setHelperTextHometown("");
    }

    if (driverDOB === "") {
      setErrorDOB(true);
      setHelperTextDOB("Please select a date");
    } else {
      setErrorDOB(false);
      setHelperTextDOB("");
    }

    if (driverEmploymentDate === "") {
      setErrorEmploymentDate(true);
      setHelperTextEmploymentDate("Please select a date");
    } else {
      setErrorEmploymentDate(false);
      setHelperTextEmploymentDate("");
    }

    const driver = {
      driverId: driverId,
      fullName: driverFullName,
      licenseNumber: driverLicense,
      phoneNumber: driverPhone,
      employmentDate: driverEmploymentDate,
      dob: driverDOB,
      homeTown: driverHometown,
      status: "Out of work",
    };

    if (
      driverId &&
      driverFullName &&
      driverLicense &&
      driverPhone &&
      driverHometown &&
      driverDOB &&
      driverEmploymentDate &&
      selectedImage
    ) {
      // send driver data to the backend
      axios
        .post("http://localhost:8082/driver/create", driver)
        .then((response) => {
          // console.log(response);
          setOpen(false);
          Toast("success", "Driver added successfully!");
        })
        .catch((error) => {
          // console.log(error);
          Toast("error", "Something went wrong!");
        });

      formData.append("image", selectedImage);

      // upload image to the server
      uploadDriverImage(formData);
    }
  };

  const handleGenerateId = () => {
    setErrorDriverId(false);
    setHelperTextDriverId("");
    setDriverId(generateDriverId());
  };

  const handleDriverId = (event) => {
    const value = event.target.value;

    if (value !== "") {
      setErrorDriverId(false);
      setHelperTextDriverId("");
    }

    if (value.length === 4 && value.slice(0, 3) !== "DRV") {
      setErrorDriverId(true);
      setHelperTextDriverId("Enter correct Driver ID");
    } else if (value.length > 8) {
      setErrorDriverId(true);
      setHelperTextDriverId("Maximum no. of characters should be 8");
    } else {
      setErrorDriverId(false);
      setHelperTextDriverId("");
      setDriverId(value);
    }
  };

  const handleFullName = (event) => {
    if (event.target.value) {
      setErrorDriverFullName(false);
      setHelperTextDriverFullName("");
    }
    setDriverFullName(event.target.value);
  };

  const handleLicense = (event) => {
    if (event.target.value) {
      setErrorLicenseNumber(false);
      setHelperTextLicenseNumber("");
    }
    setDriverLicense(event.target.value);
  };

  const handlePhone = (event) => {
    if (event.target.value) {
      setErrorPhoneNumber(false);
      setHelperTextPhoneNumber("");
    }
    setDriverPhone(event.target.value);
  };

  const handleHometown = (event) => {
    if (event.target.value) {
      setErrorHometown(false);
      setHelperTextHometown("");
    }
    setDriverHometown(event.target.value);
  };

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
            error={errorDriverId}
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
            helperText={helperTextDriverId}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            disableElevation
            sx={{ bgcolor: Theme.palette.background.primary }}
            onClick={handleGenerateId}
          >
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
            error={errorDriverFullName}
            id="fullName"
            name="fullName"
            label="Full Name"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            value={driverFullName}
            onChange={handleFullName}
            helperText={helperTextDriverFullName}
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
            error={errorLicenseNumber}
            id="licenseNumber"
            name="licenseNumber"
            label="License Number"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleLicense}
            value={driverLicense}
            helperText={helperTextLicenseNumber}
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
            error={errorPhoneNumber}
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handlePhone}
            value={driverPhone}
            helperText={helperTextPhoneNumber}
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
            error={errorDOB}
            helperText={helperTextDOB}
            setError={setErrorDOB}
            setHelperText={setHelperTextDOB}
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
            selectedDay={driverEmploymentDate}
            setSelectedDay={setDriverEmploymentDate}
            palceholder="Select Employment Date"
            error={errorEmploymentDate}
            helperText={helperTextEmploymentDate}
            setError={setErrorEmploymentDate}
            setHelperText={setHelperTextEmploymentDate}
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
            error={errorHometown}
            id="hometown"
            name="hometown"
            label="Home Town"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleHometown}
            value={driverHometown}
            helperText={helperTextHometown}
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
          <input
            type="file"
            id="file-input"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="file-input">
            <Button
              variant="text"
              component="span"
              sx={{ color: "white", textTransform: "none" }}
            >
              <AttachFileIcon />
              Choose a image
            </Button>
          </label>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={12}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          {selectedImage && (
            <Grid
              container
              item
              sm={6}
              sx={{ fontSize: "14px" }}
              columnSpacing={4}
            >
              <Grid container item sm={8} justifyContent={"flex-end"}>
                {selectedImage.name.length > 15
                  ? `${selectedImage.name.slice(0, 15)}...${
                      selectedImage.name.split(".")[
                        selectedImage.name.split(".").length - 1
                      ]
                    }`
                  : selectedImage.name}
              </Grid>
              <Grid container item sm={4}>
                {`${(selectedImage.size / 1024).toFixed(2)} KB`}
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid
          container
          item
          justifyContent={"flex-end"}
          sx={{
            bgcolor: Theme.palette.background.secondary,
            borderRadius: "20px",
            height: "70px",
            mt: "50px",
            mb: "20px",
          }}
        >
          <Button
            autoFocus
            onClick={handleClose}
            sx={{
              textTransform: "none",
              color: "white",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            autoFocus
            onClick={handleSaveDriver}
            disableElevation
            sx={{
              textTransform: "none",
              mr: "20px",
              bgcolor: Theme.palette.background.primary,
            }}
          >
            {"Add Driver"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DriverAddForm;
