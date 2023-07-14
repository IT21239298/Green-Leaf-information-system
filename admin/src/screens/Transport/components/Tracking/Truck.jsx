import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Theme } from "../../utils/Theme";

import Step from "./Step";
import truck from "../../assets/images/truck.png";

const Truck = ({ details, index, handleClick, clickedIndex }) => {
  const isClicked = index === clickedIndex;

  return (
    <Grid
      key={index}
      container
      item
      md={5.69}
      padding={2}
      sx={{
        bgcolor: `${
          isClicked
            ? Theme.palette.truckButton.clicked
            : Theme.palette.truckButton.default
        }`,
        border: `2px solid ${
          isClicked ? Theme.palette.truckButton.clickedBorder : "transparent"
        }`,
        borderRadius: "5px",
        transition:
          "background-color 0.3s ease-in-out, border-color 0.3s ease-in-out",
        "&:hover": {
          bgcolor: `${Theme.palette.truckButton.hover}`,
          cursor: "pointer",
        },
      }}
      onClick={() => {
        handleClick(index);
      }}
    >
      <Grid container item>
        <Grid item md={8}>
          <Typography
            sx={{
              ml: "10px",
              color: `${Theme.palette.text.primary}`,
              fontSize: "20px",
            }}
          >
            {details.vehicleId}
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Typography
            sx={{
              color: details.status === "Waiting" ? "orange" : "lightgreen",
            }}
          >
            {details.status}
          </Typography>
        </Grid>
      </Grid>
      {/* <Grid
        container
        item
        sx={{
          my: "20px",
          p: "20px",
          border: 1,
          borderColor: "white",
          borderRadius: "5px",
          overflow: "hidden",
          height: "130px",
        }}
      >
        <Grid
          container
          item
          xs={6}
          direction="column"
          justifyContent="space-between"
          height="90px"
        >
          <Typography sx={{ color: `${Theme.palette.text.primary}` }}>
            03:52:13
          </Typography>
          <Typography sx={{ color: `${Theme.palette.text.secondary}` }}>
            {details.remainingDistance} mi. left
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <div
            style={{
              position: "relative",
              bottom: "115px",
            }}
          >
            <Step items={details.pathPoints} />
          </div>
        </Grid>
      </Grid> */}
      <img src={truck} style={{ width: "100%" }} alt="truck-iamge" />
    </Grid>
  );
};

export default Truck;
