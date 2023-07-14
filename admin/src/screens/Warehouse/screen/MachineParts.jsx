import React, { useState } from "react";

import { Box, Typography } from "@mui/material";
import Machintable from "../components/Machintable";
import AddMachine from "../components/AddMachine";

const MachineParts = () => {
  const [selectedData, setSelectedData] = useState();

  const editClick = (details) => {
    setSelectedData(details);
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
            fontSize: "25px",
            color: "white",
            fontFamily: "Arvo",
            textAlign: "center",
            fontWeight: "bold",
            marginTop: "-10px",
          }}
        >
          Machine Parts Details
        </Typography>
      </Box>
      <div className="grid-container">
        <div className="item3">
          <Box
            sx={{
              bgcolor: "#2F2F3D",
              width: "100%",
              height: "100%",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
              boxSizing: "border-box",
              borderRadius: "25px",
              textAlign: "center",
              marginTop: "50px",
            }}
          >
            {" "}
            <Typography
              sx={{
                fontSize: "25px",
                color: "white",
                fontFamily: "Arvo",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "-10px",
              }}
            >
              Machine Parts Details
            </Typography>
            <Machintable editClick={editClick} />
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
              marginTop: "50px",
            }}
          >
            <div>
              <div className="Chart1">
                <AddMachine machineData={selectedData} />
              </div>
            </div>
          </Box>
        </div>
        <div className="item5"></div>
      </div>
    </div>
  );
};

export default MachineParts;
