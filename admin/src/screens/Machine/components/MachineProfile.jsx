import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

import { Theme } from "../utils/Theme";
import axios from "axios";
import MachineFormDialog from "./MachineFormDialog";

const MachineProfile = ({ details }) => {
  const [openAddDriverDialog, setOpenAddMachineDialog] = useState(false);

  const handleOpenAddMachineDialog = () => {
    setOpenAddMachineDialog(true);
  };

  const handleDelete = () => {
    const machine = { id: details._id, machineID: details.machineID };

    axios
      .delete("http://localhost:8082/machine/delete", {
        data: machine,
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
            alt={details.machineID}
            src={require(`../assets/profiles/machines/${details.machineID}.jpg`)}
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
            {details.machineName}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>Machine ID: {details.machineID}</Typography>
        </Grid>
      </Grid>
      {/* bottom part */}
      <Grid container item height="40%" direction="row" p={3}>
        <Grid item sm={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Machine details
          </Typography>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>Serial Number</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.serialNumber}</Typography>
          </Grid>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>Last Maintenance Date</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">
              {details.lastMaintenanceDate}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>Value</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.value}</Typography>
          </Grid>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>MAC</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.mac}</Typography>
          </Grid>
        </Grid>
        {/* <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>DOB</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.dob}</Typography>
          </Grid>
        </Grid> */}
        {/* <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>Home Town</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.homeTown}</Typography>
          </Grid>
        </Grid> */}
      </Grid>
      <Grid container item columnSpacing={2}>
        <Grid container item sm={6} justifyContent={"flex-end"}>
          <Button
            variant="contained"
            disableElevation
            sx={{ bgcolor: Theme.palette.background.secondary }}
            onClick={handleOpenAddMachineDialog}
          >
            Edit
          </Button>
          <MachineFormDialog
            varient="update"
            open={openAddDriverDialog}
            setOpen={setOpenAddMachineDialog}
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

export default MachineProfile;
