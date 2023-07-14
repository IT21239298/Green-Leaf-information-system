import * as React from "react";
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
import { default as api } from "../components/store/apiSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  MenuItem,
  Box,
  Select,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
const titleSx = {
  fontSize: "25px",
  color: "white",
  fontFamily: "Arvo",
  fontWeight: "bold",
};

const formSX = {
  width: "100%",
  padding: "25px 20px",
};

const label = {
  color: "#14EDBD",
  fontSize: "20px",
  fontFamily: "Arvo",
};
const boxSX = {
  bgcolor: "#2F2F3D",
  width: "550px",
  height: "650px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
  boxSizing: "border-box",
  borderRadius: "25px",
  textAlign: "center",
  px: "10px",
  padding: "5px 18px",
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

export default function ReleasePacking({ open, setOpena, matirialData }) {
  const { register, resetField } = useForm();
  const [addMatirial] = api.useAddMatirialMutation();
  const [realeseMatirial] = api.useRealeseMatirialMutation();

  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    date: "",
  });
  const handleType = (event) => {
    setFormData({ ...formData, type: event.target.value });
  };

  const handleAmount = (event) => {
    setFormData({ ...formData, amount: event.target.value });
  };
  const handleDate = (event) => {
    setFormData({ ...formData, date: event.target.value });
  };

  React.useEffect(() => {
    setFormData(matirialData);
  }, []);

  //update
  const handleChange = (event) => {
    event.persist();
    const { type, value } = event.target;
    setFormData((formData) => ({ ...formData, [type]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return {};

    if (matirialData) {
      // Update existing record
      console.log(matirialData._id);
      await realeseMatirial({
        _id: matirialData._id,
        data: formData,
      });
    } else {
      // Create new record
      await addMatirial(formData).unwrap();
    }
    const enteredAmount = parseInt(e.amount);
  };
  const handleClickOpen = () => {
    setOpena(true);
  };
  const handleClose = async (e) => {
    setOpena(false);
    e.preventDefault();
    if (!formData) return {};

    if (matirialData) {
      // Update existing record
      console.log(matirialData._id);
      console.log(formData);
      await realeseMatirial({
        _id: matirialData._id, // Assuming `id` is the unique identifier for the record
        data: formData,
      });
    } else {
      // Create new record
      await addMatirial(formData).unwrap();
    }
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form id="form" onSubmit={handleSubmit}>
          <Box sx={boxSX}>
            <Typography sx={titleSx}>Packing</Typography>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Select Type</InputLabel>
              <Select
                style={inputSx}
                {...register("type")}
                name="type"
                required
                defaultValue={matirialData ? matirialData.type : formData?.type}
                onChange={handleType}
              >
                <MenuItem value="MWPS">MWPS</MenuItem>
                <MenuItem value="Glue">Glue</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={formSX}>
              <InputLabel style={label}> Enter Amount</InputLabel>
              <Input
                style={inputSx}
                name="amount"
                {...register("amount")}
                type="Number"
                required
                defaultValue={
                  matirialData ? matirialData.amount : formData?.amount
                }
                onChange={handleAmount}
              />
            </FormControl>

            <FormControl sx={formSX}>
              <InputLabel style={label}> Enter Date</InputLabel>
              <Input
                style={inputSx}
                type="date"
                placeholder="Date"
                {...register("date")}
                name="date"
                required
                defaultValue={matirialData ? matirialData.date : formData?.date}
                onChange={handleDate}
              />
            </FormControl>

            <Button
              size="medium"
              sx={{ fontSize: "12px", bgcolor: "green", fontWeight: "bold" }}
              variant="contained"
              href="#contained-buttons"
              onClick={handleClose}
            >
              UPDATE DETAILS
            </Button>
          </Box>
        </form>
      </BootstrapDialog>
    </div>
  );
}
