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

import CustomerDatePicker from "./DateSelector";

import { Theme } from "../utils/Theme";
import { generateCustomerId } from "../utils/generateCustomerId";
import axios from "axios";
import CustomerUpdateForm from "./CustomerUpdateForm";

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

const CustomerForm = ({
  customerName,
  setCustomerName,
  customerID,
  setCustomerID,
  contactNumber,
  setContactNumber,
  requestedDate,
  setRequestedDate,
  orderID,
  setOrderID,

}) => {
  const [errorCustomerId, setErrorCustomerId] = useState(false);
  const [helperTextCustomerId, setHelperTextCustomerId] = useState("");


  const handleGenerateId = () => {
    setCustomerID(generateCustomerId());
  };

  const handleCustomerName = (event) => {
    setCustomerName(event.target.value);
  };

  
  const handleCustomerID = (event) => {
    const value = event.target.value;
    if (value.length === 4 && value.slice(0, 3) !== "CUS") {
      setErrorCustomerId(true);
      setHelperTextCustomerId("Enter correct Customer ID");
    } else if (value.length > 8) {
      setErrorCustomerId(true);
      setHelperTextCustomerId("Maximum no. of characters should be 8");
    } else {
      setErrorCustomerId(false);
      setHelperTextCustomerId("");
      setCustomerID(value);
    }
  };

  const handleContactNumber = (event) => {
    setContactNumber(event.target.value);
  };



  const handleOrderID = (event) => {
    setOrderID(event.target.value);
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
            Customer ID
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={7}>
          <TextField
            required
            error={errorCustomerId}
            id="customerID"
            name="customerID"
            label="Customer ID"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            value={customerID}
            onChange={handleCustomerID}
            helperText={helperTextCustomerId}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            disableElevation
            sx={{ bgcolor: Theme.palette.background.primary }}
            onClick={handleGenerateId}
          >
            Customer ID
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
            Customer Name
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id="customerName"
            name="customerName"
            label="Customer Name"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            value={customerName}
            onChange={handleCustomerName}
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
            Contact Number
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="contactNumber"
            name="contactNumber"
            label="Contact Number"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleContactNumber}
            value={contactNumber}
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
            Order ID
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="orderID"
            name="orderID"
            label="orderID"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleOrderID}
            value={orderID}
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
            Requested Date
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomerDatePicker
            selectedDay={requestedDate}
            setSelectedDay={setRequestedDate}
            palceholder="Select Date"
          />
        </Grid>        
      </Grid>
    </Box>
  );
};

export default function CustomerFormDialog({ varient, open, setOpen, details }) {
  const [id, setId] = useState();
  const [customerName, setCustomerName] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [requestedDate, setRequestedDate] = useState("");
  const [orderID, setOrderID] = useState("");
 
  useEffect(() => {
    if (varient === "update" && open === true) {
      setId(details._id);
    }
  }, [open]);

  const handleClose = () => {
    setCustomerName("");
    setCustomerID("");
    setContactNumber("");
    setRequestedDate("");
    setOrderID("");
  

    setOpen(false);
  };

  const handleSaveCustomer = () => {
    const customer = {
      customerName: customerName,
      customerID: customerID,
      contactNumber: contactNumber,
      requestedDate: requestedDate,
      orderID: orderID,
      
    };
    axios
      .post("http://localhost:8082/customer/create", customer)
      .then((response) => {
        console.log(response);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateCustomer = () => {
    const customer = {
      _id: id,
      customerName: customerName,
      customerID: customerID,
      contactNumber: contactNumber,
      requestedDate: requestedDate,
      orderID: orderID,
     
    };

    axios
      .put(`http://localhost:8082/customer/update/${id}`, customer)
      .then((response) => {
        console.log(response);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(customer);
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
        {`${varient === "add" ? "Add new customer" : "Update customer details"} `}
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
          <CustomerUpdateForm
            id={id}
            customerName={customerName}
            setCustomerName={setCustomerName}
            customerID={customerID}
            setCustomerID={setCustomerID}
            contactNumber={contactNumber}
            setContactNumber={setContactNumber}
            requestedDate={requestedDate}
            setRequestedDate={setRequestedDate}
            orderID={orderID}
            setOrderID={setOrderID}
            
          />
        ) : (
          <CustomerForm
            customerName={customerName}
            setCustomerName={setCustomerName}
            customerID={customerID}
            setCustomerID={setCustomerID}
            contactNumber={contactNumber}
            setContactNumber={setContactNumber}
            requestedDate={requestedDate}
            setRequestedDate={setRequestedDate}
            orderID={orderID}
            setOrderID={setOrderID}
           
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
          onClick={varient === "add" ? handleSaveCustomer : handleUpdateCustomer}
          disableElevation
          sx={{
            textTransform: "none",
            mr: "20px",
            bgcolor: Theme.palette.background.primary,
          }}
        >
          {`${varient === "add" ? "Add" : "Update"} Customer`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
