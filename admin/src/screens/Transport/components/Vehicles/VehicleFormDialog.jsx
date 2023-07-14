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

import DriverDatePicker from "./DateSelector";

import { Theme } from "../../utils/Theme";
import { generateVehicleId } from "../../utils/generateDriverId";
import axios from "axios";
import VehicleUpdateForm from "./VehicleUpdateForm";

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

const VehicleForm = ({
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
  const handleGenerateId = () => {
    setVehicleId(generateVehicleId());
  };
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
            value={vehicleId}
            onChange={handleVehicleId}
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
            Make Model
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
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
          <DriverDatePicker
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

export default function DriverFormDialog({ varient, open, setOpen, details }) {
  const [id, setId] = useState();
  const [vehicleId, setVehicleId] = useState("");
  const [makeModel, setMakeModel] = useState("");
  const [manufacturerYear, setManufacturerYear] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [color, setColor] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (varient === "update" && open === true) {
      setId(details._id);
    }
  }, [open]);

  const handleClose = () => {
    setVehicleId("");
    setMakeModel("");
    setManufacturerYear("");
    setRegistrationNumber("");
    setColor("");
    setOwnerName("");
    setMaxCapacity("");

    setOpen(false);
  };

  const handleSaveVehicle = () => {
    const vehicle = {
      vehicleId: vehicleId,
      makeModel: makeModel,
      manufacturerYear: manufacturerYear,
      registrationNumber: registrationNumber,
      color: color,
      ownerName: ownerName,
      maxCapacity: maxCapacity,
      status: "Out of work",
    };
    axios
      .post("http://localhost:8082/vehicle/create", vehicle)
      .then((response) => {
        console.log(response);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateVehicle = () => {
    const vehicle = {
      _id: id,
      vehicleId: vehicleId,
      makeModel: makeModel,
      manufacturerYear: manufacturerYear,
      registrationNumber: registrationNumber,
      color: color,
      ownerName: ownerName,
      maxCapacity: maxCapacity,
      status: "Out of work",
    };

    axios
      .put("http://localhost:8082/vehicle/update", vehicle)
      .then((response) => {
        console.log(response);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(vehicle);
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
          <VehicleUpdateForm
            id={id}
            vehicleId={vehicleId}
            setVehicleId={setVehicleId}
            makeModel={makeModel}
            setMakeModel={setMakeModel}
            manufacturerYear={manufacturerYear}
            setManufacturerYear={setManufacturerYear}
            registrationNumber={registrationNumber}
            setRegistrationNumber={setRegistrationNumber}
            color={color}
            setColor={setColor}
            ownerName={ownerName}
            setOwnerName={setOwnerName}
            maxCapacity={maxCapacity}
            setMaxCapacity={setMaxCapacity}
          />
        ) : (
          <VehicleForm
            vehicleId={vehicleId}
            setVehicleId={setVehicleId}
            makeModel={makeModel}
            setMakeModel={setMakeModel}
            manufacturerYear={manufacturerYear}
            setManufacturerYear={setManufacturerYear}
            registrationNumber={registrationNumber}
            setRegistrationNumber={setRegistrationNumber}
            color={color}
            setColor={setColor}
            ownerName={ownerName}
            setOwnerName={setOwnerName}
            maxCapacity={maxCapacity}
            setMaxCapacity={setMaxCapacity}
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
          onClick={varient === "add" ? handleSaveVehicle : handleUpdateVehicle}
          disableElevation
          sx={{
            textTransform: "none",
            mr: "20px",
            bgcolor: Theme.palette.background.primary,
          }}
        >
          {`${varient === "add" ? "Add" : "Update"} Vehicle`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
