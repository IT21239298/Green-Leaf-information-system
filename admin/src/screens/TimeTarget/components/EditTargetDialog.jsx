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
  width: "250px",
  height: "650px",
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

export default function EditTargetDialog({
  open,
  setOpen,
  targetData,
  // data,
}) {
  const { register, resetField } = useForm();
  const [addTarget] = api.useAddTargetMutation();
  const [editTarget] = api.useEditTargetMutation();
  const [formData, setFormData] = useState({
    targetID: "",
    targetName: "",
    description: "",
    time: "",
    date: "",
    quantity: "",
    age: "",
    gender: "",
    bank:"",
    branch: "",
    accNo: "",
    accName: "",
  });

  const handleTargetID = (event) => {
    setFormData({ ...formData, targetID: event.target.value });
  };
  const handleTargetName = (event) => {
    setFormData({ ...formData, targetName: event.target.value });
  };
  const handleDescription = (event) => {
    setFormData({ ...formData, description: event.target.value });
  };
  const handleTime = (event) => {
    setFormData({ ...formData, time: event.target.value });
  };
  const handleDate = (event) => {
    setFormData({ ...formData, date: event.target.value });
  };
  const handleQuantity = (event) => {
    setFormData({ ...formData, quantity: event.target.value });
  };
  const handleAge = (event) => {
    setFormData({ ...formData, age: event.target.value });
  };
  const handleGender = (event) => {
    setFormData({ ...formData, gender: event.target.value });
  };
  const handleBank = (event) => {
    setFormData({ ...formData, bank: event.target.value });
  };
  const handleBranch = (event) => {
    setFormData({ ...formData, branch: event.target.value });
  };
  const handleAccNo = (event) => {
    setFormData({ ...formData, accNo: event.target.value });
  };
  const handleAccName = (event) => {
    setFormData({ ...formData, accName: event.target.value });
  };

  React.useEffect(() => {
    setFormData(targetData);
  }, []);

  //update
  const handleChange = (event) => {
    event.persist();
    const { targetID, value } = event.target;
    setFormData((formData) => ({ ...formData, [targetID]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return {};

    if (targetData) {
      // Update existing record
      console.log(targetData._id);
      await editTarget({
        _id: targetData._id, // Assuming `id` is the unique identifier for the record
        data: formData,
      });
    } else {
      // Create new record
      await addTarget(formData).unwrap();
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = async (e) => {
    setOpen(false);
    e.preventDefault();
    if (!formData) return {};

    if (targetData) {
      // Update existing record
      console.log(targetData._id);
      await editTarget({
        _id: targetData._id, // Assuming `id` is the unique identifier for the record
        data: formData,
      });
    } else {
      // Create new record
      await addTarget(formData).unwrap();
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
          Edit Target details
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form id="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6} justifyContent="flex-start">
                <Box sx={boxSX}>
                  <Typography sx={titleSx}>Personal Details</Typography>

                  <FormControl
                    sx={{ padding: "20px 15px", width: "45%", float: "left" }}
                  >
                    <InputLabel style={label}>TargetID</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("targetID")}
                      name="targetID"
                      required
                      defaultValue={
                        targetData ? targetData.targetID : formData?.targetID
                      }
                      // onChange={handleChange}
                      onChange={handleTargetID}
                    />
                  </FormControl>
                  <FormControl
                    sx={{ padding: "20px 15px", width: "45%", float: "right" }}
                  >
                    <InputLabel style={label}>TargetName</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("targetName")}
                      name="targetName"
                      required
                      defaultValue={
                        targetData ? targetData.targetName : formData?.value
                      }
                      onChange={handleTargetName}
                    />
                  </FormControl>
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Description</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("description")}
                      name="description"
                      required
                      defaultValue={
                        targetData ? targetData.description : formData?.description
                      }
                      onChange={handleDescription}
                    />
                  </FormControl>
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Time</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("time")}
                      name="time"
                      rows={3}
                      defaultValue={
                        targetData ? targetData.time : formData?.time
                      }
                      onChange={handleTime}
                    />
                  </FormControl>
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Date</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("date")}
                      name="date"
                      defaultValue={
                        targetData
                          ? targetData.date
                          : formData?.date
                      }
                      onChange={handleDate}
                    />
                  </FormControl>
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Quantity</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("quantity")}
                      name="quantity"
                      defaultValue={
                        targetData ? targetData.quantity : formData?.quantity
                      }
                      onChange={handleQuantity}
                    />
                  </FormControl>
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Age</InputLabel>
                    <Select
                      style={inputSx}
                      {...register("age")}
                      name="age"
                      defaultValue={
                        targetData ? targetData.age : formData?.age
                      }
                      onChange={handleAge}
                    >
                      <MenuItem value={1}>Male</MenuItem>
                      <MenuItem value={2}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={boxSX}>
                  <Typography sx={titleSx}>Account Details</Typography>
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Bank</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("bank")}
                      name="bank"
                      required
                      defaultValue={
                        targetData ? targetData.bank : formData?.bank
                      }
                      onChange={handleBank}
                    />
                  </FormControl>
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Branch</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("branch")}
                      name="branch"
                      required
                      defaultValue={
                        targetData ? targetData.branch : formData?.branch
                      }
                      onChange={handleBranch}
                    />
                  </FormControl>
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Account number</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("accNo")}
                      name="accNo"
                      required
                      defaultValue={
                        targetData ? targetData.accNo : formData?.accNo
                      }
                      onChange={handleAccNo}
                    />
                  </FormControl>
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Account holders name</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("accName")}
                      name="accName"
                      required
                      defaultValue={
                        targetData ? targetData.accName : formData?.accName
                      }
                      onChange={handleAccName}
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
