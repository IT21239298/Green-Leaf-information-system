import { Box, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import TotalSuppliers from "../components/TotalSuppliers";
import TotalRawMaterial from "../components/TotalRawMaterial";
import Supplierimg from "../components/Supplierimg";
import Quantityimg from "../components/Quantityimg";
import LossPage from "../components/Loss";
import { default as api } from "../components/store/apiSlice";

const titleSx = {
  fontSize: "30px",
  color: "white",
  fontFamily: "Arvo",
  fontWeight: "bold",
  textAlign: "center",
};

const Dashboard = () => {
  const { data, isFetching, isSuccess, isError } = api.useGetQuantityQuery();
  const [message, setMessage] = useState(0);
  useEffect(() => {
    setMessage(localStorage.getItem("message"));
  });
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box
          sx={{
            bgcolor: "#2F2F3D",
            width: "900px",
            height: "80px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "200px",
          }}
        >
          <Typography
            sx={{
              fontSize: "40px",
              color: "#55C595",
              fontFamily: "Arvo",
              fontWeight: "bold",
              textAlign: "center",
              ml: "10px",
            }}
          >
            SUPPLIER & QUANTITY MANAGEMENT
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "300px",
            height: "250px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            mt: "40px",
          }}
        >
          <TotalSuppliers />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "300px",
            height: "250px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            mt: "40px",
          }}
        >
          <TotalRawMaterial />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "300px",
            height: "250px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            mt: "40px",
          }}
        >
          <Typography
            sx={{ fontSize: "28px", color: "white", fontFamily: "Arvo" }}
          >
            {" "}
            Loss
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={4}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "280px",
            height: "370px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            mt: "10px",
            ml: "200px",
          }}
        >
          <Typography sx={titleSx} mb={"50px"}>
            {" "}
            Supply Quantity
          </Typography>

          <Supplierimg />
        </Box>
      </Grid>

      <Grid item xs={4}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "280px",
            height: "370px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            mt: "10px",
            ml: "100px",
          }}
        >
          <Typography sx={titleSx}> Inboud Logistics Quantity</Typography>
          <Quantityimg />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "380px",
            height: "350px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            mt: "40px",
            lineHeight: "4em",
          }}
        >
          <Typography
            sx={{ ...titleSx, textAlign: "center", marginTop: "20px" }}
          >
            Raw material details
          </Typography>
          <LossPage />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
