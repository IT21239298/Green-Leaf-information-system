import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

import { Theme } from "../../utils/Theme";
import axios from "axios";
import VehicleFormDialog from "./VehicleFormDialog";
import { useEffect } from "react";

const VehicleProfile = ({ details }) => {
  const [openAddVehicleDialog, setOpenAddVehicleDialog] = useState(false);

  const handleOpenAddVehicleDialog = () => {
    setOpenAddVehicleDialog(true);
  };

  // useEffect(() => {
  //   console.log(details);
  // }, []);

  const handleDelete = () => {
    const vehicle = { id: details._id, vehicleId: details.vehicleId };

    axios
      .delete("http://localhost:8082/vehicle/delete", {
        data: vehicle,
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
            alt={details.vehicleId}
            sx={{
              width: "130px",
              height: "130px",
              border: `5px solid ${
                details.status === "Working" ? "#7ED321" : "#D0021B"
              }`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              bgcolor: "transparent",
            }}
          >
            <img
              src={require(`../../assets/profiles/vehicles/${details.vehicleId}.png`)}
              alt={details.vehicleId}
              style={{ objectFit: "cover", width: "100px" }}
            />
          </Avatar>
        </Grid>
        <Grid item mt={2}>
          <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>
            {details.vehicleId}
          </Typography>
        </Grid>
        {/* <Grid item>
          <Typography>Driver ID: {details.driverId}</Typography>
        </Grid> */}
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
            <Typography>Make Model</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.makeModel}</Typography>
          </Grid>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>Manufacture Year</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.manufacturerYear}</Typography>
          </Grid>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>Registration Number</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">
              {details.registrationNumber}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>Color</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.color}</Typography>
          </Grid>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>Owner Name</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.ownerName}</Typography>
          </Grid>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>Max Capacity</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.maxCapacity}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item columnSpacing={2}>
        <Grid container item sm={6} justifyContent={"flex-end"}>
          <Button
            variant="contained"
            disableElevation
            sx={{ bgcolor: Theme.palette.background.secondary }}
            onClick={handleOpenAddVehicleDialog}
          >
            Edit
          </Button>
          <VehicleFormDialog
            varient="update"
            open={openAddVehicleDialog}
            setOpen={setOpenAddVehicleDialog}
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

export default VehicleProfile;
