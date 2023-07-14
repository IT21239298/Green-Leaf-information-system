import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Map from "../components/CreateRoute/Map";
import NormalMap from "../components/CreateRoute/NormalMap";

import DriverSelect from "../components/CreateRoute/DriverSelect";
import VehicleSelect from "../components/CreateRoute/VehicleSelect";
import SupplierSelect from "../components/CreateRoute/SupplierSelect";
import axios from "axios";

import { Theme } from "../utils/Theme";
import RouteTable from "../components/CreateRoute/RouteTable";
import { generateRouteId } from "../utils/generateDriverId";

const CreateRoute = () => {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [routes, setRoutes] = useState([]);

  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);

  const [selectedSuppliersCoordinates, setSelectedSuppliersCoordinates] =
    useState([]);

  const [coorinates, setCoorinates] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8082/driver")
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:8082/vehicle")
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:8082/route")
      .then((response) => {
        setRoutes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://6444192390738aa7c07f095c.mockapi.io/api/suppliers")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDriverChange = (event) => {
    setSelectedDriver(event.target.value);
    console.log(event.target.value);
  };

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
    console.log(event.target.value);
  };

  const handleSupplierChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSuppliers(typeof value === "string" ? value.split(",") : value);

    const filteredArray = suppliers.filter((obj) => value.includes(obj.supID));
    setSelectedSuppliersCoordinates(
      // Filter the object array based on the supIDs
      filteredArray.map((obj) => ({
        lat: obj.addressLat,
        lng: obj.addressLng,
      }))
    );
  };

  const generateDate = () => {
    const now = new Date();
    // const currentTime = now.getTime();
    const currentDateTimeString = now.toISOString();

    return currentDateTimeString;
  };

  const handleSubmit = () => {
    const route = {
      routeId: generateRouteId(),
      driverId: selectedDriver,
      vehicleId: selectedVehicle,
      supplierIds: JSON.stringify(selectedSuppliers),
      createdDate: generateDate(),
      status: "Waiting",
      totalWeight: 0,
      coordinates: coorinates,
    };

    console.log(route);

    axios
      .post("http://localhost:8082/route/create", route)
      .then((response) => {
        setRoutes(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(
      selectedSuppliersCoordinates[selectedSuppliersCoordinates.length - 1]
    );
  }, [selectedSuppliersCoordinates]);

  return (
    <div>
      <Grid container>
        <Grid container item xs={4} rowSpacing={3} pl={4} pt={3}>
          <Grid container item xs={12}>
            <Typography color={Theme.palette.text.primary} fontSize="25px">
              Create a Route
            </Typography>
          </Grid>
          <Grid container item xs={6} direction={"column"}>
            <Typography>Select a Driver</Typography>
            <DriverSelect
              label="Driver"
              handleChange={handleDriverChange}
              value={selectedDriver}
              items={drivers}
            />
          </Grid>
          <Grid container item xs={6} direction={"column"}>
            <Typography>Select a Vehicle</Typography>
            <VehicleSelect
              label="Vehicle"
              handleChange={handleVehicleChange}
              value={selectedVehicle}
              items={vehicles}
            />
          </Grid>
          <Grid container item xs={8} direction={"column"}>
            <Typography>Select Suppliers</Typography>
            <SupplierSelect
              label="Suppliers"
              value={selectedSuppliers}
              handleChange={handleSupplierChange}
              items={suppliers}
            />
          </Grid>
          <Grid
            container
            item
            xs={4}
            direction={"column"}
            justifyContent={"end"}
            sx={{ pr: "30px", pb: "7px" }}
          >
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{ height: "57px", bgcolor: Theme.palette.background.primary }}
              disableElevation
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
          <Grid container item xs={8} direction={"column"}>
            <RouteTable routes={routes} />
          </Grid>
          <Grid container item height={"100%"}></Grid>
        </Grid>
        <Grid container item xs={8} sx={{ height: "100vh" }}>
          {/* <Map height="100%" width="100%" /> */}
          <div style={{ height: "100vh", width: "100%" }}>
            <NormalMap
              height="100%"
              width="100%"
              coordinates={selectedSuppliersCoordinates}
              setCoorinates={setCoorinates}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateRoute;
