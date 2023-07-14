import React from "react";
import { Box, Typography } from "@mui/material";
import FormPacking from "../components/FormPacking";
import ListPacking from "../components/ListPacking";
import LabelsPacking from "../components/LabelsPacking";
import GraphPacking from "../components/GraphPacking";
import bags from "../assets/img/bags.png";

const styles = {
  position: "relative",
  marginLeft: "50px",
  marginTop: "-100px",
};
const PackingMaterial = () => {
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
          Packing Material Details
        </Typography>
      </Box>
      <div className="grid-container">
        <div className="item3">
          <Box
            sx={{
              bgcolor: "#2F2F3D",
              width: "850px",
              height: "400px",

              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              boxSizing: "border-box",
              borderRadius: "25px",
            }}
          >
            <FormPacking />
          </Box>
          <Box
            sx={{
              overflowY: "scroll",
              height: "100%",
              maxHeight: "100vh",
              "&::-webkit-scrollbar": { width: 0, height: 0 },
              bgcolor: "#2F2F3D",
              width: "850px",
              height: "400px",

              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              boxSizing: "border-box",
              borderRadius: "25px",
              textAlign: "center",
              marginTop: "30px",
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
              Stored Packing Material
            </Typography>
            <Box
              sx={{
                bgcolor: "#105949",
                width: "700px",
                height: "50px",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)",
                boxSizing: "border-box",
                borderRadius: "25px",
                textAlign: "center",
                marginLeft: "100px",

                fontSize: "25px",
                color: "white",
                fontFamily: "Arvo",
              }}
            >
              <div className="label flex justify-center bg-100 py-2 rounded-r">
                <span className="block w-full">Date</span>
                <span className="block w-full">Type</span>
                <span className="block w-full">Amount</span>
              </div>
            </Box>
            <ListPacking />
          </Box>
        </div>
        <div className="item4">
          <img alt="bags" src={bags} style={styles} />
          <Box
            sx={{
              bgcolor: "#2F2F3D",
              width: "500px",
              height: "600px",
              marginTop: "120px",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              boxSizing: "border-box",
              borderRadius: "25px",
              marginTop: "40px",
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
              Available Packing Materials
            </Typography>
            <GraphPacking />
            <Box sx={{ marginLeft: "80px" }}>
              <LabelsPacking />
            </Box>
          </Box>
        </div>
        <div className="item5"></div>
      </div>
    </div>
  );
};

export default PackingMaterial;
