import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/LocalPhone";
import ChatIcon from "@mui/icons-material/ForumRounded";

import { Theme } from "../../utils/Theme";
import TabSet from "./TabSet";
import PhoneNumberDialog from "./PhoneNumberDialog";
import { useEffect } from "react";

const TrackingRightSide = ({ routeDetails }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    console.log(routeDetails);
  }, [routeDetails]);

  return (
    <Grid container item md={6.5} height={"100vh"} sx={{ p: "20px" }}>
      <Grid container item height={"50px"} pb={0}>
        <Grid container item sm={6} columnSpacing={3}>
          <Grid item>
            <Typography
              sx={{
                fontSize: "20px",
              }}
            >
              Route Details
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              sx={{
                color: "lightgreen",
              }}
            >
              On Route
            </Typography>
          </Grid>
        </Grid>
        <Grid container item sm={6} justifyContent="flex-end" columnSpacing={3}>
          <Grid item>
            <Button
              variant="contained"
              disableElevation={true}
              startIcon={<PhoneIcon />}
              sx={{
                textTransform: "none",
                bgcolor: `${
                  isClicked
                    ? Theme.palette.button.clicked
                    : Theme.palette.button.default
                }`,
                borderRadius: "5px",
                transition: "background-color 0.3s ease-in-out",
                "&:hover": {
                  bgcolor: `${Theme.palette.button.hover}`,
                  cursor: "pointer",
                },
              }}
              onClick={handleDialogOpen}
            >
              Call Driver
            </Button>
            <PhoneNumberDialog open={openDialog} onClose={handleDialogClose} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container item>
        <TabSet />
      </Grid>
    </Grid>
  );
};

export default TrackingRightSide;
