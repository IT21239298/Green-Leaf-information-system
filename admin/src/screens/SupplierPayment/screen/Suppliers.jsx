import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { default as api } from "../components/store/apiSlice";

import {
  Box,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Button,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
  fontSize: "15px",
  fontFamily: "Arvo",
};

const inputSx = {
  color: "#fff",
  fontSize: "16px",
  fontFamily: "Arvo",
};

const inputSx1 = {
  color: "#fff",
  fontSize: "16px",
  fontFamily: "Arvo",
  width: "1000px",

};

export default function Suppliers() {
  const { register, handleSubmit, reset } = useForm();
  const [addsupplierF] = api.useAddsupplierFMutation();
  const [formData, setFormData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmit = async (data) => {
    if (!data) return;
    await addsupplierF(data).unwrap();
    setFormData((prevData) => [...prevData, data]);
    reset();
  };

  //search 

  const filteredData = formData.filter((data) => {
    const searchData = `${data.supID}`.toLowerCase();
    return searchData.includes(searchQuery.toLowerCase());
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "auto",
        bgcolor: "#2F2F3D",
        padding: "40px",
      }}
    >
      <Grid container spacing={2}>
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: "#2F2F3D",
                width: "500px",
                height: "650px",
                margin: "40px",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
                boxSizing: "border-box",
                borderRadius: "25px",
                textAlign: "center",
              }}
            >
              <Typography sx={titleSx}>Supplier Account Details</Typography>

              <FormControl sx={formSX}>
                <InputLabel style={label}>Supplier ID</InputLabel>
                <Input style={inputSx} name="supID" {...register("supID")} />
              </FormControl>
              <FormControl sx={formSX}>
                <InputLabel style={label}>Account Holder Name</InputLabel>
                <Input
                  style={inputSx}
                  name="ahName"
                  {...register("ahName")}
                />
              </FormControl>
              <FormControl sx={formSX}>
                <InputLabel style={label}>Bank Name</InputLabel>
                <Input style={inputSx} name="bName" {...register("bName")} />
              </FormControl>

              <FormControl sx={formSX}>
                <InputLabel style={label}>Account Number</InputLabel>
                <Input style={inputSx} name="aNumber"
                  {...register("aNumber")}
                />
              </FormControl>
              <FormControl sx={formSX}>
                <InputLabel style={label}>Branch</InputLabel>
                <Input style={inputSx} name="branch" {...register("branch")} />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: "#2F2F3D",
                width: "500px",
                height: "650px",
                ml: "620px",
                mt: "-690px",
                boxShadow: "0px 5px 10px rgba(0, 0,  0, 0.5)",
                boxSizing: "border-box",
                borderRadius: "25px",
                textAlign: "center",
              }}
            >
              <Typography sx={titleSx}>Supplier Additional Offers</Typography>
              <FormControl sx={formSX}>
                <InputLabel style={label}>Fertilizer</InputLabel>
                <Input
                  style={inputSx}
                  name="fertilizer"
                  {...register("fertilizer")}
                />
              </FormControl>

              <FormControl sx={formSX}>
                <InputLabel style={label}>Teapackets</InputLabel>
                <Input
                  style={inputSx}
                  name="teapackets"
                  {...register("teapackets")}
                />
              </FormControl>

              <FormControl sx={formSX}>
                <InputLabel style={label}>Transport</InputLabel>
                <Input
                  style={inputSx}
                  name="transport"
                  {...register("transport")}
                />
              </FormControl>

              <Button color="success" variant="contained" type="submit">
                ADD
              </Button>
            </Box>
          </Grid>
        </form>
        <Grid item xs={12}>
          <Box
            sx={{
              mt: "20px",
              ml: "10px",
              bgcolor: "#2F2F3D",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              borderRadius: "25px",
              padding: "20px",
              maxHeight: "400px",
              overflowY: "auto",
              height: "1000px",
            }}
          >
            <FormControl>
              <Input
                style={inputSx1}
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search"
                endAdornment={
                  <IconButton>
                  <SearchIcon style={{ color: "#14EDBD" }} />
                  </IconButton>

                }
              />
            </FormControl>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={label}>Supplier ID</TableCell>
                    <TableCell style={label}>Account Holder Name</TableCell>
                    <TableCell style={label}>Bank Name</TableCell>
                    <TableCell style={label}>Account Number</TableCell>
                    <TableCell style={label}>Branch</TableCell>
                    <TableCell style={label}>Fertilizer</TableCell>
                    <TableCell style={label}>Tea Packet</TableCell>
                    <TableCell style={label}>Transport</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{data.supID}</TableCell>
                      <TableCell>{data.ahName}</TableCell>
                      <TableCell>{data.bName}</TableCell>
                      <TableCell>{data.aNumber}</TableCell>
                      <TableCell>{data.branch}</TableCell>
                      <TableCell>{data.fertilizer}</TableCell>
                      <TableCell>{data.teapackets}</TableCell>
                      <TableCell>{data.transport}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}