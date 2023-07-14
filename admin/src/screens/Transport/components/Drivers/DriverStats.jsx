import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import DriverIcon from "@mui/icons-material/AccountBox";

import { Theme } from "../../utils/Theme";

const DriverStats = ({ title, value }) => {
  return (
    <Grid container item key={`stat-${title}`} sm={4}>
      <Grid
        container
        sx={{
          bgcolor: Theme.palette.background.primary,
          borderRadius: "20px",
          p: "10px",
          width: "100%",
        }}
      >
        <Grid
          container
          key="stat-left"
          sm={4}
          justifyContent="center"
          alignItems="center"
        >
          <DriverIcon sx={{ fontSize: "100px" }} />
        </Grid>
        <Grid
          container
          item
          key="stat-right"
          sm={8}
          direction="column"
          justifyContent="center"
        >
          <Grid item>
            <Typography sx={{ fontSize: "20px" }}>{title}</Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              {value}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DriverStats;
