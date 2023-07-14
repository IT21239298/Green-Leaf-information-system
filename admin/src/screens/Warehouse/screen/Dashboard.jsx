import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import LabelsPacking from "../components/LabelsPacking";

import LabelsFinal from "../components/LabelsFinal";
import GraphPacking from "../components/GraphPacking";
import GraphFinal from "../components/GraphFinal";
import Graph from "../components/Graph";

const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          sx={{
            bgcolor: "#2F2F3D",
            width: "900px",
            height: "90px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "200px",
            mb: "100px",
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
            WAREHOUSE MANAGEMENT
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "400px",
            height: "600px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
          }}
        >
          {" "}
          <Typography
            sx={{
              fontSize: "30px",
              color: "white",
              fontFamily: "Arvo",
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "-50px",
            }}
          >
            Packing Material Details
            <Box
              sx={{
                bgcolor: "#105949",
                width: "350px",
                height: "350px",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
                boxSizing: "border-box",
                borderRadius: "25px",
                textAlign: "center",
                marginLeft: "22px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <GraphPacking />
              <Box sx={{ marginLeft: "20px" }}>
                <LabelsPacking />
              </Box>
            </Box>
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "400px",
            height: "600px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",

            marginRight: "10px",
          }}
        >
          {" "}
          <Typography
            sx={{
              fontSize: "30px",
              color: "white",
              fontFamily: "Arvo",
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "-50px",
            }}
          >
            Raw Material Details
            <Box
              sx={{
                bgcolor: "#105949",
                width: "350px",
                height: "350px",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
                boxSizing: "border-box",
                borderRadius: "25px",
                textAlign: "center",
                marginLeft: "22px",
              }}
            >
              <Graph />
            </Box>
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={4}>
        <Box
          sx={{
            bgcolor: "#105949",
            width: "400px",
            height: "600px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              color: "white",
              fontFamily: "Arvo",
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "-50px",
            }}
          >
            Final Product Details
            <Box
              sx={{
                bgcolor: "#105949",
                width: "350px",
                height: "350px",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
                boxSizing: "border-box",
                borderRadius: "25px",
                textAlign: "center",
                marginLeft: "22px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <GraphFinal />
              <Box sx={{ marginLeft: "20px" }}>
                <LabelsFinal />
              </Box>
            </Box>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
