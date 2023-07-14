import React from "react";
import "../screen/App.css";
import { useForm } from "react-hook-form";
import { default as api } from "./store/apiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Button,
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

const inputSx = {
  color: "#fff",
  fontSize: "16px",
  fontFamily: "Arvo",
};

const mg = {
  color: "green",
  bgcolor: "#2F2F3D",
  width: "500px",
  height: "60px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)",
  boxSizing: "border-box",
  borderRadius: "25px",
  textAlign: "center",
  fontSize: "20px",
};
export default function FormProduct() {
  const {
    register,
    handleSubmit,
    resetField,
    reset,
    formState: { errors },
  } = useForm();
  const [addProduct] = api.useAddProductMutation();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await addProduct(data).unwrap();
      reset();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000); // delay display of form for 2 seconds
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  const handleSuccessMsgClose = () => {
    setSubmitted(false);
  };

  return (
    <div className="form max-w-sm mx-auto w-96">
      {submitted ? (
        <div>
          <Typography sx={mg} variant="h6" color="success">
            Submitted successfully....!
          </Typography>
        </div>
      ) : (
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={titleSx}>Store Final Product Details</Typography>
          <FormControl sx={formSX}>
            <InputLabel style={label}>Select Type</InputLabel>
            <Select
              style={inputSx}
              {...register("type", { required: true })}
              name="type"
            >
              <MenuItem value="Black Tea">Black Tea</MenuItem>
              <MenuItem value="Green Tea">Green Tea</MenuItem>
              <MenuItem value="White Tea">White Tea</MenuItem>
              <MenuItem value="Lemon Tea">Lemon Tea</MenuItem>
              <MenuItem value="Mint Tea">Mint Tea</MenuItem>
            </Select>
            {errors.type && (
              <Typography variant="caption" color="error" textSize="10px">
                Please Select Type
              </Typography>
            )}
          </FormControl>

          <FormControl sx={formSX}>
            <InputLabel style={label}> Enter Date</InputLabel>
            <Input
              style={inputSx}
              type="date"
              placeholder="Date"
              {...register("date", { required: true })}
              name="date"
            />
            {errors.date && (
              <Typography variant="caption" color="error" textSize="10px">
                Please Select Date
              </Typography>
            )}
          </FormControl>

          <FormControl sx={formSX}>
            <InputLabel style={label}> Enter Grade</InputLabel>
            <Input
              style={inputSx}
              type="text"
              placeholder="Grade"
              {...register("grade", { required: true })}
              name="grade"
            />
            {errors.grade && (
              <Typography variant="caption" color="error" textSize="10px">
                Please Enter Grade
              </Typography>
            )}
          </FormControl>
          <FormControl sx={formSX}>
            <InputLabel style={label}> Enter Amount</InputLabel>
            <Input
              style={inputSx}
              name="amount"
              {...register("amount", { required: true, min: 1 })}
              type="Number"
            />
            {errors.amount && (
              <Typography variant="caption" color="error" textSize="10px">
                Please Enter Amount
              </Typography>
            )}
          </FormControl>
          <Button
            color="success"
            variant="contained"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Add Final Product"}
          </Button>
        </form>
      )}
    </div>
  );
}
