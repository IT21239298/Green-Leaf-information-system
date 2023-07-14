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
  bgcolor: "white",
  width: "500px",
  height: "60px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)",
  boxSizing: "border-box",
  borderRadius: "25px",
  textAlign: "center",
  fontSize: "20px",
};

export default function FormPacking() {
  const {
    register,
    handleSubmit,
    resetField,
    reset,
    formState: { errors },
  } = useForm();
  const [addMatirial] = api.useAddMatirialMutation();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await addMatirial(data).unwrap();
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
            Form submitted successfully....!
          </Typography>
        </div>
      ) : (
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={titleSx}> Store Packing Material</Typography>
          <FormControl sx={formSX}>
            <InputLabel style={label}>Select Type</InputLabel>
            <Select
              style={inputSx}
              {...register("type", { required: true })}
              name="type"
            >
              <MenuItem value="MWPS">MWPS</MenuItem>
              <MenuItem value="Glue">Glue</MenuItem>
            </Select>
            {errors.type && (
              <Typography variant="caption" color="error" textSize="10px">
                Please Select Type
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
                Please Select Amount
              </Typography>
            )}
          </FormControl>

          <FormControl sx={formSX}>
            <InputLabel style={label}> Enter Amount</InputLabel>
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
          <Button
            color="success"
            variant="contained"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Add Packing Material"}
          </Button>
        </form>
      )}
    </div>
  );
}
