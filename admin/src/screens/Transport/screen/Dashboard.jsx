import { Box, Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {
  return (
    <Box
      sx={{
        bgcolor: "#105949",
        width: "400px",
        height: "400px",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
        boxSizing: "border-box",
        borderRadius: "25px",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "20px",
          color: "white",
          fontFamily: "Arvo",
          fontWeight: "bold",
        }}
      >
        Dashboard
        <Typography
          sx={{
            fontSize: "20px",
            color: "white",
            fontFamily: "Arvo",
            fontWeight: "bold",
          }}
        >
          Dashboard
          <iframe
            style={{
              background: "#21313C",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
            }}
            width="640"
            height="480"
            src="https://charts.mongodb.com/charts-project-0-oejeh/embed/charts?id=645ddf7b-ed0f-4655-8606-19f68797b4ec&maxDataAge=60&theme=dark&autoRefresh=true"
          ></iframe>
        </Typography>
      </Typography>
    </Box>
  );
};

export default Dashboard;
