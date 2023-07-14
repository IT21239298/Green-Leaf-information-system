import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "nanoid";

import {
  Grid,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { default as api } from "../components/store/apiSlice";

const titleSx = {
  fontSize: "25px",
  color: "white",
  fontFamily: "Arvo",
  fontWeight: "bold",
};

const boxSX = {
  bgcolor: "#2F2F3D",
  width: "600px",
  height: "650 px",
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

const titleSx1 = {
  fontSize: "30px",
  color: "white",
  fontFamily: "Arvo",
  marginLeft: "400px",
};
const inputSx = {
  color: "#fff",
  fontSize: "16px",
  fontFamily: "Arvo",
};

// Define the validation schema using the yup library
const schema = yup.object().shape({
  fname: yup.string().required("First name is required"),
  lname: yup.string().required("Last name is required"),
  nic: yup
    .string()
    .required("NIC is required")
    .matches(/^\d{9}[vVxX]?$|^\d{12}$/, "Invalid NIC format"), // regex pattern to validate NIC
  address: yup.string().required("Address is required"),
  contactNo: yup
    .string()
    .required("Contact number is required")
    .matches(/^\d{10}$/, "Invalid phone number format"),
  bank: yup.string().required("Bank is required"),
  branch: yup.string().required("Branch is required"),
  accNo: yup.string().required("Account number is required"),
  accName: yup.string().required("Account holder name is required"),
});

// Generate a unique supplier ID
const supplierId = nanoid();
export default function AddSupplier({ supplierData }) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [addSupplier] = api.useAddSupplierMutation();

  const [supplierId, setSupplierId] = useState("");

  const onSubmit = async (data) => {
    if (!data) return {};
    data.supID = supplierId;
    await addSupplier(data).unwrap();
    resetField("fname");
    resetField("lname");
    resetField("nic");
    resetField("address");
    resetField("contactNo");
    resetField("age");
    resetField("gender");
    resetField("bank");
    resetField("branch");
    resetField("accNo");
    resetField("accName");
    resetField("supID");
  };
  function handleGenerateId() {
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    const supplierId = `SUP${randomNum}`;
    setSupplierId(supplierId);
  }
  return (
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} marginBottom={"50px"}>
          <Typography sx={titleSx1}>
            FILL THE FORM TO REGISTER SUPPLIER
          </Typography>
        </Grid>
        <Grid item xs={6} justifyContent="flex-start">
          <Box sx={boxSX}>
            <Typography sx={titleSx}>Personal Details</Typography>

            <FormControl
              sx={{ padding: "20px 15px", width: "45%", float: "left" }}
              error={Boolean(errors.fname)}
            >
              <InputLabel style={label}>First name</InputLabel>
              <Input style={inputSx} {...register("fname")} name="fname" />
              {errors.fname && (
                <FormHelperText>{errors.fname.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              sx={{ padding: "20px 15px", width: "45%", float: "right" }}
              error={Boolean(errors.lname)}
            >
              <InputLabel style={label}>Last name</InputLabel>
              <Input style={inputSx} {...register("lname")} name="lname" />
              {errors.lname && (
                <FormHelperText>{errors.lname.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl sx={formSX} error={Boolean(errors.nic)}>
              <InputLabel style={label}>NIC</InputLabel>
              <Input style={inputSx} {...register("nic")} name="nic" />
              {errors.nic && (
                <FormHelperText>{errors.nic.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl sx={formSX} error={Boolean(errors.address)}>
              <InputLabel style={label}>Address</InputLabel>
              <Input
                style={inputSx}
                {...register("address")}
                name="address"
                rows={3}
              />
              {errors.address && (
                <FormHelperText>{errors.address.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl sx={formSX} error={Boolean(errors.contactNo)}>
              <InputLabel style={label}>Contact number</InputLabel>
              <Input
                style={inputSx}
                {...register("contactNo")}
                name="contactNo"
              />
              {errors.contactNo && (
                <FormHelperText>{errors.contactNo.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Age</InputLabel>
              <Input style={inputSx} {...register("age")} name="age" />
              {errors.fname && (
                <FormHelperText>{errors.fname.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl sx={formSX}>
              <InputLabel style={label}>Gender</InputLabel>
              <Select style={inputSx} {...register("gender")} name="gender">
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={2}>Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={boxSX}>
            <Typography sx={titleSx}>Account Details</Typography>
            <FormControl sx={formSX} error={Boolean(errors.bank)}>
              <InputLabel style={label}>Bank</InputLabel>
              <Input style={inputSx} {...register("bank")} name="bank" />
              {errors.bank && (
                <FormHelperText>{errors.bank.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl sx={formSX} error={Boolean(errors.branch)}>
              <InputLabel style={label}>Branch</InputLabel>
              <Input style={inputSx} {...register("branch")} name="branch" />
              {errors.branch && (
                <FormHelperText>{errors.branch.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl sx={formSX} error={Boolean(errors.accNo)}>
              <InputLabel style={label}>Account number</InputLabel>
              <Input style={inputSx} {...register("accNo")} name="accNo" />
              {errors.accNo && (
                <FormHelperText>{errors.accNo.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl sx={formSX} error={Boolean(errors.accName)}>
              <InputLabel style={label}>Account holders name</InputLabel>
              <Input style={inputSx} {...register("accName")} name="accName" />
              {errors.accName && (
                <FormHelperText>{errors.accName.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl sx={formSX} error={Boolean(errors.supID)}>
              <InputLabel style={label}>Supplier ID</InputLabel>
              <Input
                style={inputSx}
                name="supID"
                value={supplierId}
                {...register("supID")}
                disabled
              />
              <Button variant="contained" onClick={handleGenerateId}>
                Generate ID
              </Button>
            </FormControl>

            <FormControl>
              <Button color="success" variant="contained" type="submit">
                Register
              </Button>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
