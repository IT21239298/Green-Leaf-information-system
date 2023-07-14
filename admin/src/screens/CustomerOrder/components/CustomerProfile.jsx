import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

import { Theme } from "../utils/Theme";
import axios from "axios";
import CustomerFormDialog from "./CustomerFormDialog";

const CustomerProfile = ({ details }) => {
  const [openAddCustomerDialog, setOpenAddCustomerDialog] = useState(false);

  const handleOpenAddCustomerDialog = () => {
    setOpenAddCustomerDialog(true);
  };

  const handleDelete = () => {
    const customer = { id: details._id, customerID: details.customerID };

    axios
      .delete(`http://localhost:8082/customer/delete/${details._id}`, {
        data: CustomerProfile,
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
            alt={details.customerID}
            src={require(`../assets/svgs/profiles/customers/MCH13453.jpg`)}
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
            {details.customerName}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>Customer ID: {details.customerID}</Typography>
        </Grid>
      </Grid>
      {/* bottom part */}
      <Grid container item height="40%" direction="row" p={3}>
        <Grid item sm={12}>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Customer details
          </Typography>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>Contact Number</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.contactNumber}</Typography>
          </Grid>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>Requested Date</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">
              {details.requestedDate}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>OrderID</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.orderID}</Typography>
          </Grid>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={5}>
            <Typography>CUS</Typography>
          </Grid>
          <Grid item sm={7}>
            <Typography textAlign="end">{details.cus}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item columnSpacing={2}>
        <Grid container item sm={6} justifyContent={"flex-end"}>
          <Button
            variant="contained"
            disableElevation
            sx={{ bgcolor: Theme.palette.background.secondary }}
            onClick={handleOpenAddCustomerDialog}
          >
            Edit
          </Button>
          <CustomerFormDialog
            varient="update"
            open={openAddCustomerDialog}
            setOpen={setOpenAddCustomerDialog}
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

export default CustomerProfile;
