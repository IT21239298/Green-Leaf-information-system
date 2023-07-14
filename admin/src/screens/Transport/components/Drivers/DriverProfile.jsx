import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

import { Theme } from "../../utils/Theme";
import axios from "axios";
import DriverFormDialog from "./DriverFormDialog";

const DriverProfile = ({ details }) => {
  const [openAddDriverDialog, setOpenAddDriverDialog] = useState(false);

  const handleOpenAddDriverDialog = () => {
    setOpenAddDriverDialog(true);
  };

  const handleDelete = () => {
    const driver = { id: details._id, driverId: details.driverId };

    axios
      .delete("http://localhost:8082/driver/delete", {
        data: driver,
        headers: { Authorization: "***" },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container height="100%">
      {/* top part */}
      <Grid
        container
        item
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="30%"
      >
        <Grid item>
          <Avatar
            alt={details.driverId}
            src={`http://localhost:8082/driver/${details.driverId}.jpg`}
            sx={{
              width: "130px",
              height: "130px",
              border: `5px solid ${
                details.status === "Working" ? "#7ED321" : "#D0021B"
              }`,
            }}
          />
        </Grid>
        <Grid item mt={2}>
          <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>
            {details.fullName}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>Driver ID: {details.driverId}</Typography>
        </Grid>
      </Grid>
      {/* bottom part */}
      <Grid container item height="40%" direction="row" p={3}>
        <Grid item sm={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Demographics
          </Typography>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>License Number</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.licenseNumber}</Typography>
          </Grid>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>Phone Number</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.phoneNumber}</Typography>
          </Grid>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>Age</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.age}</Typography>
          </Grid>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>Employment Date</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.employmentDate}</Typography>
          </Grid>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>DOB</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.dob}</Typography>
          </Grid>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>Home Town</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.homeTown}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item columnSpacing={2}>
        <Grid container item sm={6} justifyContent={"flex-end"}>
          <Button
            variant="contained"
            disableElevation
            sx={{ bgcolor: Theme.palette.background.secondary }}
            onClick={handleOpenAddDriverDialog}
          >
            Edit
          </Button>
          <DriverFormDialog
            varient="update"
            open={openAddDriverDialog}
            setOpen={setOpenAddDriverDialog}
            details={details}
          />
        </Grid>
        <Grid container item sm={6}>
          <Button
            variant="contained"
            disableElevation
            sx={{ bgcolor: "#D91F33" }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
      <Grid item height="30%" width="100%"></Grid>
    </Grid>
  );
};

export default DriverProfile;
