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
import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
} from "@mui/material";

const titleSx = {
  fontSize: "25px",
  color: "white",
  fontFamily: "Arvo",
  fontWeight: "bold",
};

const boxSX = {
  bgcolor: "#2F2F3D",
  width: "350px",
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

export default function EditPaymentDialog({
  open,
  setOpen,
  paymentData,
  onUpdate,
}) {
  const { register, } = useForm();
  const [addpayment] = api.useAddpaymentMutation();
  const [editpayment] = api.useEditpaymentMutation();
  const [formData, setFormData] = useState({
    quantity: "",
    cost: "",
    packetcost: "",
    transecost: "",
  });

  const handleQuantity = (event) => {
    setFormData({ ...formData, quantity: event.target.value });
  };
  const handleCost = (event) => {
    setFormData({ ...formData, cost: event.target.value });
  };
  const handleNic = (event) => {
    setFormData({ ...formData, packetcost: event.target.value });
  };
  const handleTransport = (event) => {
    setFormData({ ...formData,transecost:event.target.value });
  };
  React.useEffect(() => {
    setFormData(paymentData);
  }, []);
  
  const handleChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return {};
  
    if (paymentData) {
      // Update existing record
      console.log(paymentData._id);
      await editpayment({
        _id: paymentData._id, // Assuming `id` is the unique identifier for the record
        data: formData,
      });
      onUpdate(formData); // Pass the updated data to the onUpdate callback
    } else {
      // Create new record
      const response = await addpayment(formData);
      onUpdate(response.data); // Pass the newly added data to the onUpdate callback
    }
  
    handleClose();
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
          Edit payment Details
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form id="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6} justifyContent="flex-start">
                <Box sx={boxSX}>
                  <Typography sx={titleSx}>Enter Details</Typography>
  
                  <FormControl sx={formSX}></FormControl>
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Tea leaves Quantity</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("quantity")}
                      name="quantity"
                      required
                      defaultValue={
                        paymentData ? paymentData.quantity : formData?.quantity
                      }
                      onChange={handleQuantity}
                    />
                  </FormControl>
  
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Fertilizer Cost</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("cost")}
                      name="cost"
                      required
                      defaultValue={
                        paymentData ? paymentData.cost : formData?.cost
                      }
                      onChange={handleCost}
                    />
                  </FormControl>
  
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Transport Cost</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("transecost")}
                      name="transecost"
                      rows={3}
                      defaultValue={
                        paymentData ? paymentData.transecost : formData?.transecost
                      }
                      onChange={handleTransport}
                    />
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus type="submit" onClick={handleSubmit}>
            Update
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
  }
  
