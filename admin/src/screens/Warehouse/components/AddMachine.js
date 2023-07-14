import React, { useState } from "react";
import "../screen/App.css";
import { useForm } from "react-hook-form";
import { default as api } from "../components/store/apiSlice";
import { Box, Button, Typography } from "@mui/material";

export default function AddMachine({ machineData }) {
  const { register, resetField } = useForm();
  const [addMachinep] = api.useAddMachinepMutation();
  const [editMachinep] = api.useEditMachinepMutation();
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
  });

  const handleChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return {};
    resetField("name");
    resetField("amount");
    resetField("date");
    if (machineData) {
      // Update existing record
      console.log(machineData._id);
      await editMachinep({
        _id: machineData._id, // Assuming `id` is the unique identifier for the record
        data: formData,
      });
    } else {
      // Create new record
      await addMachinep(formData).unwrap();
    }
  };

  return (
    <div className="form max-w-sm mx-auto w-96">
      <Typography
        sx={{
          fontSize: "30px",
          color: "white",
          fontFamily: "Arvo",
          textAlign: "center",
          fontWeight: "bold",
          marginTop: "-10px",
        }}
      >
        Enter Machine Part
      </Typography>
      <form id="form" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter Name"
              {...register("name")}
              name="name"
              className="form-input"
              defaultValue={machineData ? machineData.name : formData?.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="number"
              placeholder="EnterAmount"
              {...register("amount")}
              name="amount"
              className="form-input"
              defaultValue={machineData ? machineData.amount : formData?.amount}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="date"
              placeholder="Date"
              {...register("date")}
              name="date"
              className="form-input"
              defaultValue={machineData ? machineData.date : formData?.date}
              onChange={handleChange}
            />
          </div>
          <div className="submit-btn">
            <Button
              type="submit"
              variant="contained"
              color="success"
              className="border py-2 text-white bg-indigo-500 w-full"
            >
              {machineData ? "Update" : "Store Machine"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
