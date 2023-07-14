import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import TotalTargets from "../components/TotalTargets";
import TotalMaterial from "../components/TotalMaterial";
//import Targetimg from "../components/Targetimg";
//import Timeimg from "../components/Timeimg";

const titleSx = {
  fontSize: "20px",
  color: "white",
  fontFamily: "Arvo",
  fontWeight: "bold",
  textAlign: "center",
};

const Dashboard = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "220px",
            height: "200px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
          }}
        >
          <TotalTargets />
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "220px",
            height: "200px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
          }}
        >
          <TotalMaterial />
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "220px",
            height: "200px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
          }}
        >
          <Typography sx={titleSx}> Quick Targets</Typography>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box
          sx={{
            bgcolor: "#2F2F3D",
            width: "280px",
            height: "200px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
          }}
        >
          <Typography>Profile</Typography>
        </Box>
      </Grid>

      <Grid item xs={4}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "180px",
            height: "350px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "200px",
          }}
        ></Box>
      </Grid>

      <Grid item xs={4}>
        <Box
          sx={{
            bgcolor: "#2F2F3D",
            width: "280px",
            height: "350px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "590px",
          }}
        >
          {" "}
          <Typography>Notification</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
