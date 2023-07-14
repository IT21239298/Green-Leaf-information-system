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

import OrderDatePicker from "./DateSelector";

import { Theme } from "../utils/Theme";
import { generateCustomerId } from "../utils/generateCustomerId";
import axios from "axios";
import OrdersUpdateForm from "./OrdersUpdateForm";

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

const OrdersForm = ({
  orderID,
  setOrderID,
  amount,
  setAmount,
  requiredDate,
  setRequiredDate,
  type,
  setType,
  //   mac,
  //   setMac,
}) => {
  const handleGenerateId = () => {
    setOrderID(generateCustomerId());
  };

  const handleOrderID = (event) => {
    setOrderID(event.target.value);
  };
  const handleAmount = (event) => {
    setAmount(event.target.value);
  };
  const handleRequiredDate = (event) => {
    setRequiredDate(event.target.value);
  };

  const handleType = (event) => {
    setType(event.target.value);
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
            Order ID
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={7}>
          <TextField
            required
            id="orderID"
            name="orderID"
            label="Order ID"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            value={orderID}
            onChange={handleOrderID}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            disableElevation
            sx={{ bgcolor: Theme.palette.background.primary }}
            onClick={handleGenerateId}
          >
            Order ID
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
            Amount / KG
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id="amount"
            name="amount"
            label="amount"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            value={amount}
            onChange={handleAmount}
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
            Required Date
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
        <OrderDatePicker
            selectedDay={requiredDate}
            setSelectedDay={setRequiredDate}
            palceholder="Select Date"
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
            Type
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="type"
            name="type"
            label="type"
            fullWidth
            size="small"
            autoComplete="off"
            variant="outlined"
            onChange={handleType}
            value={type}
          />
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default function OrdersFormDialog({
  varient,
  open,
  setOpen,
  details,
}) {
  const [id, setId] = useState();
  const [orderID, setOrderID] = useState();
  const [amount, setAmount] = useState("");
  const [requiredDate, setRequiredDate] = useState("");
  const [type, setType] = useState("");
 
  useEffect(() => {
    if (varient === "update" && open === true) {
      setId(details._id);
    }
  }, [open]);

  const handleClose = () => {
    setId("");
    setAmount("");
    setRequiredDate("");
    setType("");
    setOpen(false);
  };

  const handleSaveOrders = () => {
    const orders = {
      orderID: orderID,
      amount: amount,
      requiredDate: requiredDate,
      type: type,
    };
    axios
      .post("http://localhost:8082/order/create", orders)
      .then((response) => {
        console.log(response);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateOrders = () => {
    const orders = {
      _id: id,
      orderID: orderID,
      amount: amount,
      requiredDate: requiredDate,
      type: type
    };

    axios
      .put(`http://localhost:8082/order/update/${id}`, orders)
      .then((response) => {
        console.log(response);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(orders);
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
            ? "Add new orders"
            : "Update orders details"
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
          <OrdersUpdateForm
            id={id}
            orderID={orderID}
            setOrderID={setOrderID}
            amount={amount}
            setAmount={setAmount}
            requiredDate={requiredDate}
            setRequiredDate={setRequiredDate}
            type={type}
            setType={setType}

          />
        ) : (
          <OrdersForm
          orderID={orderID}
          setOrderID={setOrderID}
          amount={amount}
          setAmount={setAmount}
          requiredDate={requiredDate}
          setRequiredDate={setRequiredDate}
          type={type}
          setType={setType}
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
          onClick={varient === "add" ? handleSaveOrders : handleUpdateOrders }
          disableElevation
          sx={{
            textTransform: "none",
            mr: "20px",
            bgcolor: Theme.palette.background.primary,
          }}
        >
          {`${varient === "add" ? "Add" : "Update"} Orders`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
