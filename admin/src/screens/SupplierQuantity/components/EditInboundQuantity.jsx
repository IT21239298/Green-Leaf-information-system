import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { default as api } from "../components/store/apiSlice";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Grid, Box, FormControl, InputLabel, Input } from "@mui/material";

const titleSx = {
  fontSize: "25px",
  color: "white",
  fontFamily: "Arvo",
  fontWeight: "bold",
};

const boxSX = {
  bgcolor: "#2F2F3D",
  width: "450px",
  height: "450px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
  boxSizing: "border-box",
  borderRadius: "25px",
  textAlign: "center",
  px: "10px",
  padding: "5px 18px",
};
const formSX = {
  width: "100%",
  padding: "20px 15px",
};

const label = {
  color: "#14EDBD",
  fontSize: "15px",
  fontFamily: "Arvo",
};

const inputSx = {
  color: "#fff",
  fontSize: "16px",
  fontFamily: "Arvo",
};
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
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

export default function EditInboundQuantity({
  open,
  setOpen,
  quantityData,
  // data,
}) {
  const { register, resetField } = useForm();
  const [addQuantity] = api.useAddQuantityMutation();
  const [editQuantity] = api.useEditQuantityMutation();
  const [formData, setFormData] = useState({
    vehicle: "",
    quantity: "",
    moisture: "",
    totalAmount: "",
  });

  const handleVehicle = (event) => {
    setFormData({ ...formData, vehicle: event.target.value });
  };
  const handleQuantity = (event) => {
    setFormData({ ...formData, quantity: event.target.value });
  };
  const handleMoisture = (event) => {
    setFormData({ ...formData, moisture: event.target.value });
  };
  const handleTotalAmount = (event) => {
    setFormData({ ...formData, totalAmount: event.target.value });
  };

  React.useEffect(() => {
    setFormData(quantityData);
  }, []);

  //update
  const handleChange = (event) => {
    event.persist();
    const { vehicle, value } = event.target;
    setFormData((formData) => ({ ...formData, [vehicle]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return {};

    if (quantityData) {
      // Update existing record
      console.log(quantityData._id);
      await editQuantity({
        _id: quantityData._id, // Assuming `id` is the unique identifier for the record
        data: formData,
      });
    } else {
      // Create new record
      await addQuantity(formData).unwrap();
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = async (e) => {
    setOpen(false);
    e.preventDefault();
    if (!formData) return {};

    if (quantityData) {
      // Update existing record
      console.log(quantityData._id);
      await editQuantity({
        _id: quantityData._id, // Assuming `id` is the unique identifier for the record
        data: formData,
      });
    } else {
      // Create new record
      await addQuantity(formData).unwrap();
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Edit Inbound Quatity details
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form id="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6} justifyContent="flex-start">
                <Box sx={boxSX}>
                  <Typography sx={titleSx}>Update Details</Typography>

                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Vehicle Id</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("vehicle")}
                      name="vehicle"
                      required
                      defaultValue={
                        quantityData ? quantityData.vehicle : formData?.vehicle
                      }
                      // onChange={handleChange}
                      onChange={handleVehicle}
                    />
                  </FormControl>

                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Quantity</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("quantity")}
                      name="quantity"
                      required
                      defaultValue={
                        quantityData
                          ? quantityData.quantity
                          : formData?.quantity
                      }
                      onChange={handleQuantity}
                    />
                  </FormControl>
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Moisture</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("moisture")}
                      name="moisture"
                      rows={3}
                      defaultValue={
                        quantityData
                          ? quantityData.moisture
                          : formData?.moisture
                      }
                      onChange={handleMoisture}
                    />
                  </FormControl>
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Total Amount</InputLabel>
                    <Input
                      style={inputSx}
                      {...register(" totalAmount")}
                      name=" totalAmount"
                      defaultValue={
                        quantityData
                          ? quantityData.totalAmount
                          : formData?.totalAmount
                      }
                      onChange={handleTotalAmount}
                    />
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} type="submit">
            update
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
