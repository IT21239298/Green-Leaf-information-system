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

import DriverStats from "../components/Drivers/DriverStats";
import CustomTable from "../components//Drivers/DriverTable";
import DriverProfile from "../components/Drivers/DriverProfile";
import SearchBar from "../components/SearchBar";

import { Theme } from "../utils/Theme";
import { useEffect } from "react";
import DriverAddDialog from "../components/Drivers/DriverAddDialog";
import { toast } from "react-hot-toast";
import { Toast } from "../utils/toast";

const statItemsHeight = 15;

const Drivers = () => {
  const [isRowSelected, setRowIsSelected] = useState(false);
  const [driverDetails, setDriverDetails] = useState({});
  const [openAddDriverDialog, setOpenAddDriverDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenAddDriverDialog = () => {
    setOpenAddDriverDialog(true);
  };

  const [drivers, setDrivers] = useState([]);
  const [driverCount, setDriverCount] = useState(0);
  const [driverWorkCount, setDriverWorkCount] = useState(0);
  const [driverOutWorkCount, setDriverOutWorkCount] = useState(0);

  const handleRowSelect = (details) => {
    setRowIsSelected(!isRowSelected);
    setDriverDetails(details);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8082/driver")
      .then((response) => {
        setDrivers(response.data);
        console.log(response.data);
        setDriverCount(response.data.length);
        setDriverWorkCount(
          response.data.filter(
            (driver) => driver.status.toLowerCase() === "working"
          ).length
        );
        setDriverOutWorkCount(
          response.data.filter(
            (driver) => driver.status.toLowerCase() === "out of work"
          ).length
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tableColumns = [
    {
      id: "fullName",
      label: "Full Name",
      minWidth: 170,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "driverId",
      label: "Driver id",
      minWidth: 170,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "licenseNumber",
      label: "License Number",
      minWidth: 170,
      align: "left",
      format: (value) => value.toFixed(2),
    },
    {
      id: "phoneNumber",
      label: "Phone Number",
      minWidth: 170,
      align: "left",
      format: (value) => value.toFixed(2),
    },
    {
      id: "age",
      label: "Age",
      minWidth: 170,
      align: "left",
      format: (value) => value.toFixed(2),
    },
    {
      id: "employmentDate",
      label: "Employment Date",
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
    drivers.forEach((row) => {
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

    doc.save("driver_report.pdf");
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
            <DriverStats title="No. of Drivers" value={driverCount} />
            <DriverStats title="Working Drivers" value={driverWorkCount} />
            <DriverStats
              title="Out of working Drivers"
              value={driverOutWorkCount}
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
            >{`Drivers (${drivers.length})`}</Typography>
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
              Add a driver
            </Button>
            <DriverAddDialog
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
            <CustomTable
              rows={drivers}
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
            <DriverProfile details={driverDetails} />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default Drivers;
