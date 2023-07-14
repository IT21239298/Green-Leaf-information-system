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
import Radio from "@mui/material/Radio";

import MachineDatePicker from "../components/DateSelector";

import { Theme } from "../utils/Theme";
import { generateMachineId } from "../utils/generateMachineId";
import axios from "axios";
import MaintenanceUpdateForm from "./MaintenanceUpdateForm";

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        bgcolor: Theme.palette.background.primary,
        color: "white",
      }}
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

const MaintenanceForm = ({
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
  const [errorMachineId, setErrorMachineId] = useState(false);
  const [helperTextMachineId, setHelperTextMachineId] = useState("");

  // const handleMachineId = (event) => {
  //   const value = event.target.value;
  //   if (value.length === 4 && value.slice(0, 3) !== "MCH") {
  //     setErrorMachineId(true);
  //     setHelperTextMachineId("Enter correct Machine ID");
  //   } else if (value.length > 8) {
  //     setErrorMachineId(true);
  //     setHelperTextMachineId("Maximum no. of characters should be 8");
  //   } else {
  //     setErrorMachineId(false);
  //     setHelperTextMachineId("");
  //     setMachineId(value);
  //   }
  // };

  const handleGenerateId = () => {
    setMachineID(generateMachineId());
  };

  const handlePartName = (event) => {
    setPartName(event.target.value);
  };

  //validate machine ID
  const handleMachineID = (event) => {
    const value = event.target.value;
    if (value.length === 4 && value.slice(0, 3) !== "MCH") {
      setErrorMachineId(true);
      setHelperTextMachineId("Enter correct Machine ID");
    } else if (value.length > 8) {
      setErrorMachineId(true);
      setHelperTextMachineId("Maximum no. of characters should be 8");
    } else {
      setErrorMachineId(false);
      setHelperTextMachineId("");
      setMachineID(value);
    }
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

  return (
    <Box color="white">
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
        <Grid item xs={12} sm={7}>
          <TextField
            required
            error={errorMachineId}
            id="machineID"
            name="machineID"
            label="Machine ID"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            value={machineID}
            onChange={handleMachineID}
            helperText={helperTextMachineId}
            sx={{ input: { color: "white" } }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            disableElevation
            sx={{ bgcolor: Theme.palette.background.primary }}
            onClick={handleGenerateId}
          >
            Machine ID
          </Button>
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
        <Grid container item xs={12} sm={6} alignItems="center">
          <InputLabel sx={{ fontWeight: 700 }}>Statues</InputLabel>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Radio
                checked={statues === "active"}
                onChange={handleStatues}
                value="active"
                name="statues"
                color="primary"
              />
              <InputLabel>Active</InputLabel>
            </Grid>
            <Grid item>
              <Radio
                checked={statues === "maintenance"}
                onChange={handleStatues}
                value="maintenance"
                name="statues"
                color="primary"
              />
              <InputLabel>Under Maintenance</InputLabel>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid container item xs={12} sm={2}>
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
          />
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

export default function MaintenanceFormDialog({
  varient,
  open,
  setOpen,
  details,
}) {
  const [id, setId] = useState();
  const [partName, setPartName] = useState("");
  const [machineID, setMachineID] = useState("");
  const [statues, setStatues] = useState("");
  const [lastMaintenanceDate, setLastMaintenanceDate] = useState("");
  const [value, setValue] = useState("");
  // const [mac, setMac] = useState("");

  // const [errorMachineName, setErrorMachineName] = useState(false);
  // const [helperTextMachineName, setHelperTextMachineName] = useState("");

  useEffect(() => {
    if (varient === "update" && open === true) {
      setId(details._id);
    }
  }, [open]);

  const handleClose = () => {
    setPartName("");
    setMachineID("");
    setStatues("");
    setLastMaintenanceDate("");
    setValue("");
    // setMac("");

    setOpen(false);
  };

  const handleSaveMaintenance = () => {
    const maintenance = {
      partName: partName,
      machineID: machineID,
      statues: statues,
      lastMaintenanceDate: lastMaintenanceDate,
      value: value,
      // mac: mac,
      // status: "Out of work",
    };
    axios
      .post("http://localhost:8082/maintenance/create", maintenance)
      .then((response) => {
        console.log(response);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateMaintenance = () => {
    const maintenance = {
      _id: id,
      partName: partName,
      machineID: machineID,
      statues: statues,
      lastMaintenanceDate: lastMaintenanceDate,
      value: value,
      // mac: mac,
      // status: "Out of work",
    };

    axios
      .put("http://localhost:8082/maintenance/update", maintenance)
      .then((response) => {
        console.log(response);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(maintenance);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="md"
      PaperProps={{
        style: {
          backgroundColor: Theme.palette.background.primary,
          borderRadius: "20px",
          height: "600px",
        },
      }}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {`${
          varient === "add"
            ? "Add new maintenance"
            : "Update maintenance details"
        } `}
      </BootstrapDialogTitle>
      <DialogContent
        dividers
        sx={{
          bgcolor: Theme.palette.background.primary,
          overflowY: "scroll",
          "&::-webkit-scrollbar": { width: 0, height: 0 },
        }}
      >
        {varient === "update" ? (
          <MaintenanceUpdateForm
            id={id}
            partName={partName}
            setPartName={setPartName}
            machineID={machineID}
            setMachineID={setMachineID}
            statues={statues}
            setStatues={setStatues}
            lastMaintenanceDate={lastMaintenanceDate}
            setLastMaintenanceDate={setLastMaintenanceDate}
            value={value}
            setValue={setValue}
            // mac={mac}
            // setMac={setMac}
          />
        ) : (
          <MaintenanceForm
            partName={partName}
            setPartName={setPartName}
            machineID={machineID}
            setMachineID={setMachineID}
            statues={statues}
            setStatues={setStatues}
            lastMaintenanceDate={lastMaintenanceDate}
            setLastMaintenanceDate={setLastMaintenanceDate}
            value={value}
            setValue={setValue}
            // mac={mac}
            // setMac={setMsac}
          />
        )}
      </DialogContent>
      <DialogActions
        sx={{
          bgcolor: Theme.palette.background.primary,
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
          onClick={
            varient === "add" ? handleSaveMaintenance : handleUpdateMaintenance
          }
          disableElevation
          sx={{
            textTransform: "none",
            mr: "20px",
            bgcolor: Theme.palette.background.primary,
          }}
        >
          {`${varient === "add" ? "Add" : "Update"} Maintenance`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
