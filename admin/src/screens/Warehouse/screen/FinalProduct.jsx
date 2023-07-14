import React from "react";
import { Box, Typography } from "@mui/material";
import FormProduct from "../components/FormProduct";
import ListProduct from "../components/ListProduct";
import GraphFinal from "../components/GraphFinal";
import LabelsFinal from "../components/LabelsFinal";

import teacup from "../assets/img/teacup.png";

const FinalProduct = () => {
  const styles = {
    position: "relative",
    marginLeft: "50px",
    top: "-100px",
    width: "300px",
    height: "150px",
  };
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
          Final Product Details
        </Typography>
      </Box>
      <div className="grid-container">
        <div className="item3">
          <Box
            sx={{
              bgcolor: "#2F2F3D",
              width: "850px",
              height: "510px",

              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              boxSizing: "border-box",
              borderRadius: "25px",
            }}
          >
            <FormProduct />
          </Box>
          <Box
            sx={{
              overflowY: "scroll",
              height: "100%",
              maxHeight: "100vh",
              "&::-webkit-scrollbar": { width: 0, height: 0 },
              bgcolor: "#2F2F3D",
              width: "850px",
              height: "300px",
              marginTop: "50px",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              boxSizing: "border-box",
              borderRadius: "25px",
              marginTop: "10px",
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
              Stored Final Product
            </Typography>
            <Box
              sx={{
                bgcolor: "#105949",
                width: "650px",
                height: "50px",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)",
                boxSizing: "border-box",
                borderRadius: "25px",
                textAlign: "center",
                marginLeft: "150px",
                marginTop: "50px",
                fontSize: "25px",
                color: "white",
                fontFamily: "Arvo",
                marginTop: "-2px",
              }}
            >
              <div className="label flex justify-center bg-100 py-2 rounded-r">
                <span className="block w-full">Type</span>
                <span className="block w-full">Amount</span>
                <span className="block w-full">Grade</span>
                <span className="block w-full">Date</span>
              </div>
            </Box>
            <ListProduct />
          </Box>
        </div>
        <div className="item4">
          <img alt="teacup" src={teacup} style={styles} />
          <Box
            sx={{
              bgcolor: "#2F2F3D",
              width: "500px",
              height: "750px",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              boxSizing: "border-box",
              borderRadius: "25px",
              marginTop: "-90px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
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
              Available Final Product
            </Typography>
            <GraphFinal />
            <Box sx={{ marginLeft: "100px" }}>
              <LabelsFinal />
            </Box>
          </Box>
        </div>
        <div className="item5"></div>
      </div>
    </div>
  );
};

export default FinalProduct;
