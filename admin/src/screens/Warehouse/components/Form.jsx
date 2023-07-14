import React, { ToastContainer, otherPropsFromToastConfigure } from "react";
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

import "react-toastify/dist/ReactToastify.css";

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

export default function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await addTransaction(data).unwrap();
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
          <Typography sx={titleSx}>Store Raw Material</Typography>
          <FormControl sx={formSX} error={Boolean(errors.date)}>
            <InputLabel style={label}>Enter Date</InputLabel>
            <Input
              style={inputSx}
              type="date"
              name="date"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <Typography variant="caption" color="error" textSize="10px">
                Please Select Date
              </Typography>
            )}
          </FormControl>

          <FormControl sx={formSX} error={Boolean(errors.type)}>
            <InputLabel style={label}>Type</InputLabel>
            <Select
              style={inputSx}
              {...register("type", { required: true })}
              name="type"
            >
              <MenuItem value="Grade(A)">Grade(A)</MenuItem>
              <MenuItem value="Grade(B)">Grade(B)</MenuItem>
              <MenuItem value="Grade(C)">Grade(C)</MenuItem>
            </Select>
            {errors.type && (
              <Typography variant="caption" color="error">
                Type Select Type
              </Typography>
            )}
          </FormControl>

          <FormControl sx={formSX} error={Boolean(errors.amount)}>
            <InputLabel style={label}>Enter Amount</InputLabel>
            <Input
              style={inputSx}
              name="amount"
              {...register("amount", { required: true, min: 1 })}
              type="number"
            />
            {errors.amount && (
              <Typography variant="caption" color="error">
                Please Enter Amount and should be greater than 0
              </Typography>
            )}
          </FormControl>

          <Button
            color="success"
            variant="contained"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Add Raw Material"}
          </Button>
        </form>
      )}
    </div>
  );
}
