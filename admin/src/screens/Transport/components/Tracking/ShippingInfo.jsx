import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/EditRounded";
import io from "socket.io-client";
import axios from "axios";

import Map from "./Map";
import TruckCapacity from "./TruckCapacity";
import truck from "../../assets/images/truck.png";

const ShippingInfo = () => {
  const [capacity, setCapacity] = useState();
  const [truckCapacity, setTruckCapacity] = useState(80);
  const [pathCoordinates, setPathCoordinates] = useState([[81.06224, 6.9777]]);

  const handleCapacity = (event) => {
    setCapacity(event.target.value);
    if (
      event.target.value.toString().length === 2 ||
      event.target.value === "100"
    ) {
      setTruckCapacity(event.target.value);
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:8082", { transports: ["websocket"] });

    // Listen for changes
    socket.on("change", (change) => {
      // console.log("Change received:", change);
      setPathCoordinates((prevData) => [...prevData, [change.lng, change.lat]]); // Add the new document to the state
      // console.log(data);
    });

    // Cleanup function
    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []);

  useEffect(() => {
    console.log(pathCoordinates);
  }, [pathCoordinates]);

  return (
    <Grid container direction="column">
      <Grid container item direction="column">
        <Grid item>Current Truck Capacity</Grid>
        <Grid
          container
          item
          direction={"column"}
          rowSpacing={2}
          alignItems={"center"}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TruckCapacity capacity={truckCapacity} />
          <TextField
            sx={{ width: "100px" }}
            value={capacity}
            onChange={handleCapacity}
          />
          <Button
            variant="contained"
            onClick={() => {
              axios
                .post("http://localhost:8082/coord/simulate", {})
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            Simulate Live Tracking
          </Button>
        </Grid>
      </Grid>
      <Grid container item direction="column" rowSpacing={3}>
        <Grid container item>
          <Grid item sm={6}>
            Route
          </Grid>
        </Grid>
        <Grid item>
          <Map height="400px" width="100%" pathCoordinates={pathCoordinates} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ShippingInfo;
