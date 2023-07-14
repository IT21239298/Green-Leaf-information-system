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

export default function EditSupplierDialog({
  open,
  setOpen,
  supplierData,
  // data,
}) {
  const { register, resetField } = useForm();
  const [addSupplier] = api.useAddSupplierMutation();
  const [editSupplier] = api.useEditSupplierMutation();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    nic: "",
    address: "",
    contactNo: "",
    age: "",
    gender: "",
    bank: "",
    branch: "",
    accNo: "",
    accName: "",
  });

  const handleFname = (event) => {
    setFormData({ ...formData, fname: event.target.value });
  };
  const handleLname = (event) => {
    setFormData({ ...formData, lname: event.target.value });
  };
  const handleNic = (event) => {
    setFormData({ ...formData, nic: event.target.value });
  };
  const handleAddress = (event) => {
    setFormData({ ...formData, address: event.target.value });
  };
  const handleContactNo = (event) => {
    setFormData({ ...formData, contactNo: event.target.value });
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
    setFormData(supplierData);
  }, []);

  //update
  const handleChange = (event) => {
    event.persist();
    const { fname, value } = event.target;
    setFormData((formData) => ({ ...formData, [fname]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return {};

    if (supplierData) {
      // Update existing record
      console.log(supplierData._id);
      await editSupplier({
        _id: supplierData._id, // Assuming `id` is the unique identifier for the record
        data: formData,
      });
    } else {
      // Create new record
      await addSupplier(formData).unwrap();
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = async (e) => {
    setOpen(false);
    e.preventDefault();
    if (!formData) return {};

    if (supplierData) {
      // Update existing record
      console.log(supplierData._id);
      await editSupplier({
        _id: supplierData._id, // Assuming `id` is the unique identifier for the record
        data: formData,
      });
    } else {
      // Create new record
      await addSupplier(formData).unwrap();
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
          Edit Supplier details
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
                    <InputLabel style={label}>First name</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("fname")}
                      name="fname"
                      required
                      defaultValue={
                        supplierData ? supplierData.fname : formData?.fname
                      }
                      // onChange={handleChange}
                      onChange={handleFname}
                    />
                  </FormControl>
                  <FormControl
                    sx={{ padding: "20px 15px", width: "45%", float: "right" }}
                  >
                    <InputLabel style={label}>Last name</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("lname")}
                      name="lname"
                      required
                      defaultValue={
                        supplierData ? supplierData.lname : formData?.lname
                      }
                      onChange={handleLname}
                    />
                  </FormControl>
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>NIC</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("nic")}
                      name="nic"
                      required
                      defaultValue={
                        supplierData ? supplierData.nic : formData?.nic
                      }
                      onChange={handleNic}
                    />
                  </FormControl>
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Address</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("address")}
                      name="address"
                      rows={3}
                      defaultValue={
                        supplierData ? supplierData.address : formData?.address
                      }
                      onChange={handleAddress}
                    />
                  </FormControl>
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Contact number</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("contactNo")}
                      name="contactNo"
                      defaultValue={
                        supplierData
                          ? supplierData.contactNo
                          : formData?.contactNo
                      }
                      onChange={handleContactNo}
                    />
                  </FormControl>
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Age</InputLabel>
                    <Input
                      style={inputSx}
                      {...register("age")}
                      name="age"
                      defaultValue={
                        supplierData ? supplierData.age : formData?.age
                      }
                      onChange={handleAge}
                    />
                  </FormControl>
                  <FormControl sx={formSX}>
                    <InputLabel style={label}>Gender</InputLabel>
                    <Select
                      style={inputSx}
                      {...register("gender")}
                      name="gender"
                      defaultValue={
                        supplierData ? supplierData.gender : formData?.gender
                      }
                      onChange={handleGender}
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
                        supplierData ? supplierData.bank : formData?.bank
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
                        supplierData ? supplierData.branch : formData?.branch
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
                        supplierData ? supplierData.accNo : formData?.accNo
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
                        supplierData ? supplierData.accName : formData?.accName
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
