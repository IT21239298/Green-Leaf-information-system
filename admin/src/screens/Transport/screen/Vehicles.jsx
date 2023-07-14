import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import AddDriverIcon from "@mui/icons-material/PersonAdd";
import ExportIcon from "@mui/icons-material/FileDownload";

import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

import VehicleStats from "../components/Vehicles/VehicleStats";
import VehicleTable from "../components/Vehicles/VehicleTable";
import VehicleProfile from "../components/Vehicles/VehicleProfile";
import SearchBar from "../components/SearchBar";
import VehicleFormDialog from "../components/Vehicles/VehicleFormDialog";

import { Theme } from "../utils/Theme";
import { useEffect } from "react";

const statItemsHeight = 15;

const Vehicles = () => {
  const [isRowSelected, setRowIsSelected] = useState(false);
  const [driverDetails, setDriverDetails] = useState({});
  const [openAddDriverDialog, setOpenAddDriverDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenAddDriverDialog = () => {
    setOpenAddDriverDialog(true);
  };

  const [vehicles, setVehicles] = useState([]);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [vehicleWorkCount, setVehicleWorkCount] = useState(0);
  const [vehicleOutWorkCount, setVehicleOutWorkCount] = useState(0);

  const handleRowSelect = (details) => {
    setRowIsSelected(!isRowSelected);
    setDriverDetails(details);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8082/vehicle")
      .then((response) => {
        setVehicles(response.data);
        setVehicleCount(response.data.length);
        setVehicleWorkCount(
          response.data.filter(
            (vehicle) => vehicle.status.toLowerCase() === "working"
          ).length
        );
        setVehicleOutWorkCount(
          response.data.filter(
            (vehicle) => vehicle.status.toLowerCase() === "out of work"
          ).length
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tableColumns = [
    {
      id: "vehicleId",
      label: "Vehicle ID",
      minWidth: 170,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "makeModel",
      label: "Make Model",
      minWidth: 170,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "registrationNumber",
      label: "Registration Number",
      minWidth: 170,
      align: "left",
      format: (value) => value.toFixed(2),
    },
    {
      id: "manufacturerYear",
      label: "Manufacturer Year",
      minWidth: 170,
      align: "left",
      format: (value) => value.toFixed(2),
    },
    {
      id: "color",
      label: "Color",
      minWidth: 170,
      align: "left",
      format: (value) => value.toFixed(2),
    },
    {
      id: "ownerName",
      label: "Owner Name",
      minWidth: 170,
      align: "left",
      format: (value) => value.toFixed(2),
    },
    {
      id: "maxCapacity",
      label: "Max Capacity",
      minWidth: 170,
      align: "left",
      format: (value) => value.toFixed(2),
    },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
      align: "left",
      format: (value) => value.toFixed(2),
    },
  ];

  const generatePDFReport = () => {
    const doc = new jsPDF();

    const tableData = [];
    vehicles.forEach((row) => {
      const rowData = [];
      tableColumns.forEach((column) => {
        const value = row[column.id];
        rowData.push(value);
      });
      tableData.push(rowData);
    });

    const tableHeaders = tableColumns.map((column) => column.label);
    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("vehicle_report.pdf");
  };

  return (
    <Grid
      container
      key="full-screen"
      sx={{ bgcolor: Theme.palette.background.secondary, height: "100%" }}
      p={3}
      direction="row"
      columnSpacing={2}
    >
      <Grid
        container
        item
        key="left-side"
        md={isRowSelected ? 9 : 12}
        rowGap={2}
      >
        <Grid
          container
          item
          key="top-stats-items"
          sx={{ height: `${statItemsHeight}%` }}
        >
          <Grid container item direction="row" columnSpacing={2}>
            <VehicleStats title="No. of Vehicles" value={vehicleCount} />
            <VehicleStats title="Working Vehicles" value={vehicleWorkCount} />
            <VehicleStats
              title="Out of working Vehicles"
              value={vehicleOutWorkCount}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          direction="row"
          columnSpacing={2}
          sx={{ height: `${100 - statItemsHeight - 79.5}%` }}
        >
          <Grid container item sm={4} direction="row" alignItems="center">
            <Typography
              sx={{ fontSize: "25px" }}
            >{`Vehicles (${vehicles.length})`}</Typography>
          </Grid>
          <Grid
            container
            item
            sm={4.8}
            direction="column"
            alignItems="flex-end"
          >
            <SearchBar setSearchQuery={setSearchQuery} />
          </Grid>
          <Grid item sm={2}>
            <Button
              variant="contained"
              startIcon={<AddDriverIcon />}
              disableElevation
              onClick={handleOpenAddDriverDialog}
              sx={{
                height: "85%",
                width: "100%",
                textTransform: "none",
                borderRadius: "15px",
                bgcolor: Theme.palette.background.primary,
              }}
            >
              Add a vehicle
            </Button>
            <VehicleFormDialog
              varient="add"
              open={openAddDriverDialog}
              setOpen={setOpenAddDriverDialog}
            />
          </Grid>
          <Grid item sm={1.2}>
            <Button
              variant="contained"
              startIcon={<ExportIcon />}
              disableElevation
              onClick={generatePDFReport}
              sx={{
                height: "85%",
                width: "100%",
                textTransform: "none",
                borderRadius: "15px",
                bgcolor: Theme.palette.background.primary,
              }}
            >
              Export
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          item
          sx={{ height: `${100 - statItemsHeight - 5.5 - 1.9}%` }}
        >
          <Grid container item>
            <VehicleTable
              rows={vehicles}
              columns={tableColumns}
              searchQuery={searchQuery}
              handleRowSelect={handleRowSelect}
            />
          </Grid>
        </Grid>
      </Grid>
      {isRowSelected && (
        <Grid container item key="right-side" md={3}>
          <Box
            sx={{
              bgcolor: Theme.palette.background.primary,
              width: "100%",
              borderRadius: "20px",
            }}
          >
            <VehicleProfile details={driverDetails} />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default Vehicles;
