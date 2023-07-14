import React from "react";
import "../screen/App.css";
import { Box, Typography } from "@mui/material";
import Graph from "../components/Graph";
import Form from "../components/Form";
import Labels from "../components/Labels";
import List from "../components/List";

const titleSx = {
  fontSize: "25px",
  color: "white",
  fontFamily: "Arvo",
  fontWeight: "bold",
};

const RowMaterial = () => {
  return (
    <div className="Row">
      <Box
        sx={{
          bgcolor: "#2F2F3D",
          width: "50%",
          height: "60px",
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
          boxSizing: "border-box",
          borderRadius: "25px",
          textAlign: "center",
          marginLeft: "450px",
        }}
      >
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
          Raw Material Details
        </Typography>
      </Box>
      <div className="grid-container">
        <div className="item3">
          <Box
            sx={{
              bgcolor: "#2F2F3D",
              width: "100%",
              height: "400px",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              boxSizing: "border-box",
              borderRadius: "25px",
              textAlign: "center",
            }}
          >
            <Form></Form>
          </Box>
        </div>
        <div className="item4">
          <Box
            sx={{
              bgcolor: "#2F2F3D",
              width: "500px",
              height: "400px",
              marginLeft: "100px",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              boxSizing: "border-box",
              borderRadius: "25px",
            }}
          >
            <div>
              <div className="Chart1">
                <Typography
                  sx={{
                    fontSize: "25px",
                    color: "white",
                    fontFamily: "Arvo",
                    fontWeight: "bold",
                  }}
                >
                  Available Raw Material
                </Typography>
                <Graph></Graph>
              </div>

              <Labels />
            </div>
          </Box>
        </div>
        <div className="item5">
          <Box
            sx={{
              overflowY: "scroll",
              height: "100%",
              maxHeight: "100vh",
              "&::-webkit-scrollbar": { width: 0, height: 0 },
              bgcolor: "#2F2F3D",
              width: "1100px",
              height: "400px",

              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              boxSizing: "border-box",
              borderRadius: "25px",
              textAlign: "center",
              marginTop: "-10px",
              marginLeft: "200px",
            }}
          >
            <Typography
              sx={{
                fontSize: "25px",
                color: "white",
                fontFamily: "Arvo",
                fontWeight: "bold",
              }}
            >
              Stored Raw Material
            </Typography>
            <Box
              sx={{
                bgcolor: "#105949",
                width: "800px",
                height: "50px",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)",
                boxSizing: "border-box",
                borderRadius: "25px",
                textAlign: "center",
                marginLeft: "120px",
                marginTop: "50px",
                fontSize: "25px",
                color: "white",
                fontFamily: "Arvo",
                marginTop: "-2px",
              }}
            >
              <div className="label flex justify-center bg-100 py-2 rounded-r">
                <span className="block w-full">Date</span>
                <span className="block w-full">Amount</span>
                <span className="block w-full">Type</span>
              </div>
            </Box>
            <List />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default RowMaterial;
