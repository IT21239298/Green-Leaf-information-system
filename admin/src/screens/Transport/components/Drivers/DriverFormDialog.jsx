import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import DriverDatePicker from "../DateSelector";

import { Theme } from "../../utils/Theme";
import { generateDriverId } from "../../utils/generateDriverId";
import axios from "axios";
import DriverUpdateForm from "./DriverUpdateForm";

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2, bgcolor: Theme.palette.background.secondary }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const DriverForm = ({
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

  errorDriverFullName,
  helperTextDriverFullName,
  errorPhoneNumber,
  helperTextPhoneNumber,
  errorLicenseNumber,
  helperTextLicenseNumber,
  errorHometown,
  helperTextHometown,
}) => {
  const [errorDriverId, setErrorDriverId] = useState(false);
  const [helperTextDriverId, setHelperTextDriverId] = useState("");

  const handleGenerateId = () => {
    setDriverId(generateDriverId());
  };

  const handleDriverId = (event) => {
    const value = event.target.value;
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
    setDriverFullName(event.target.value);
  };

  const handleLicense = (event) => {
    setDriverLicense(event.target.value);
  };

  const handlePhone = (event) => {
    const value = event.target.value;
    // if (value.length > 10) {
    //   setErrorDriverId(true);
    //   setHelperTextDriverId("Maximum no. of numbers should be 10");
    // }
    setDriverPhone(value);
  };

  const handleHometown = (event) => {
    setDriverHometown(event.target.value);
  };

  // useEffect(() => {
  //   console.log(`DriverForm: ${driverEmploymentDate}`);
  // }, [driverEmploymentDate]);

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
          <Button>
            <UploadFileIcon />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default function DriverFormDialog({ varient, open, setOpen, details }) {
  // varient = `add` or `update`
  const [id, setId] = useState();
  const [driverId, setDriverId] = useState("");
  const [driverFullName, setDriverFullName] = useState("");
  const [driverLicense, setDriverLicense] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [driverHometown, setDriverHometown] = useState("");
  const [driverDOB, setDriverDOB] = useState("");
  const [driverEmploymentDate, setDriverEmploymentDate] = useState("");

  const [errorDriverFullName, setErrorDriverFullName] = useState(false);
  const [helperTextDriverFullName, setHelperTextDriverFullName] = useState("");

  const [errorLicenseNumber, setErrorLicenseNumber] = useState(false);
  const [helperTextLicenseNumber, setHelperTextLicenseNumber] = useState("");

  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [helperTextPhoneNumber, setHelperTextPhoneNumber] = useState("");

  const [errorHometown, setErrorHometown] = useState(false);
  const [helperTextHometown, setHelperTextHometown] = useState("");

  useEffect(() => {
    if (varient === "update" && open === true) {
      setId(details._id);
    }
  }, [open]);

  // useEffect(() => {
  //   console.log(`DriverFormDialog: ${driverEmploymentDate}`);
  // }, [driverEmploymentDate]);

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
    axios
      .post("http://localhost:8082/driver/create", driver)
      .then((response) => {
        console.log(response);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateDriver = () => {
    const driver = {
      _id: id,
      driverId: driverId,
      fullName: driverFullName,
      licenseNumber: driverLicense,
      phoneNumber: driverPhone,
      employmentDate: driverEmploymentDate,
      dob: driverDOB,
      homeTown: driverHometown,
      status: "Out of work",
    };

    axios
      .put("http://localhost:8082/driver/update", driver)
      .then((response) => {
        console.log(response);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(driver);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="md"
      PaperProps={{
        style: {
          backgroundColor: Theme.palette.background.secondary,
          borderRadius: "20px",
          height: "600px",
        },
      }}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {`${varient === "add" ? "Add new driver" : "Update driver details"} `}
      </BootstrapDialogTitle>
      <DialogContent
        dividers
        sx={{
          bgcolor: Theme.palette.background.secondary,
          overflowY: "scroll",
          "&::-webkit-scrollbar": { width: 0, height: 0 },
        }}
      >
        {varient === "update" ? (
          <DriverUpdateForm
            id={id}
            driverId={driverId}
            setDriverId={setDriverId}
            driverFullName={driverFullName}
            setDriverFullName={setDriverFullName}
            driverLicense={driverLicense}
            setDriverLicense={setDriverLicense}
            driverPhone={driverPhone}
            setDriverPhone={setDriverPhone}
            driverHometown={driverHometown}
            setDriverHometown={setDriverHometown}
            driverDOB={driverDOB}
            setDriverDOB={setDriverDOB}
            driverEmploymentDate={driverEmploymentDate}
            setDriverEmploymentDate={setDriverEmploymentDate}
          />
        ) : (
          <DriverForm
            driverId={driverId}
            setDriverId={setDriverId}
            driverFullName={driverFullName}
            setDriverFullName={setDriverFullName}
            driverLicense={driverLicense}
            setDriverLicense={setDriverLicense}
            driverPhone={driverPhone}
            setDriverPhone={setDriverPhone}
            driverHometown={driverHometown}
            setDriverHometown={setDriverHometown}
            driverDOB={driverDOB}
            setDriverDOB={setDriverDOB}
            driverEmploymentDate={driverEmploymentDate}
            setDriverEmploymentDate={setDriverEmploymentDate}
            errorDriverFullName={errorDriverFullName}
            helperTextDriverFullName={helperTextDriverFullName}
            errorPhoneNumber={errorPhoneNumber}
            helperTextPhoneNumber={helperTextPhoneNumber}
            errorLicenseNumber={errorLicenseNumber}
            helperTextLicenseNumber={helperTextLicenseNumber}
            errorHometown={errorHometown}
            helperTextHometown={helperTextHometown}
          />
        )}
      </DialogContent>
      <DialogActions
        sx={{
          bgcolor: Theme.palette.background.secondary,
          borderRadius: "20px",
          height: "80px",
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
          onClick={varient === "add" ? handleSaveDriver : handleUpdateDriver}
          disableElevation
          sx={{
            textTransform: "none",
            mr: "20px",
            bgcolor: Theme.palette.background.primary,
          }}
        >
          {`${varient === "add" ? "Add" : "Update"} Driver`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
