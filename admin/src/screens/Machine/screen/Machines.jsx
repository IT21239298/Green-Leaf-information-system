import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import AddDriverIcon from "@mui/icons-material/PersonAdd";
import ExportIcon from "@mui/icons-material/FileDownload";

import axios from "axios";

import CustomTable from "../components/MachineTable";
import MachineProfile from "../components/MachineProfile";
import SearchBar from "../components/SearchBar";
import MachineFormDialog from "../components/MachineFormDialog";

import { Theme } from "../utils/Theme";
import { useEffect } from "react";

const statItemsHeight = 15;

const columns = [
  {
    id: "machineName",
    label: "Machine Name",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "machineID",
    label: "Machine id",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "serialNumber",
    label: "Serial Number",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "lastMaintenanceDate",
    label: "Last Maintenance Date",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "value",
    label: "Value",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  // {
  //   id: "mac",
  //   label: "Mac",
  //   minWidth: 170,
  //   align: "left",
  //   format: (value) => value.toFixed(2),
  // },
  {
    id: "buttons",
    label: "",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

const Machines = () => {
  const [isRowSelected, setRowIsSelected] = useState(false);
  const [machineDetails, setMachineDetails] = useState({});
  const [openAddMachineDialog, setOpenAddMachineDialog] = useState(false);

  const handleOpenAddMachineDialog = () => {
    setOpenAddMachineDialog(true);
  };

  const [machines, setMachines] = useState([]);

  const handleRowSelect = (details) => {
    // setRowIsSelected(!isRowSelected);
    setMachineDetails(details);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8082/machine")
      .then((response) => {
        console.log(response.data);
        setMachines(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Grid
      container
      key="full-screen"
      sx={{
        bgcolor: Theme.palette.background.secondary,
        height: "100%",
        color: "white",
      }}
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
        {/* <Grid
          container
          item
          key="top-stats-items"
          sx={{ height: `${statItemsHeight}%` }}
        >
          <Grid container item direction="row" columnSpacing={2}>
            <MachineStats title="No. of Machines" value={39} />
            <MachineStats title="Active Machines" value={20} />
            <MachineStats title="Inactive Machines" value={19} />
          </Grid>
        </Grid> */}
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
            >{`Machines (${machines.length})`}</Typography>
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
              onClick={handleOpenAddMachineDialog}
              sx={{
                height: "85%",
                width: "100%",
                textTransform: "none",
                borderRadius: "15px",
                bgcolor: Theme.palette.background.primary,
              }}
            >
              Add a Machine
            </Button>
            <MachineFormDialog
              varient="add"
              open={openAddMachineDialog}
              setOpen={setOpenAddMachineDialog}
            />
          </Grid>
          <Grid item sm={1.2}>
            {/* <Button
              variant="contained"
              startIcon={<ExportIcon />}
              disableElevation
              sx={{
                height: "85%",
                width: "100%",
                textTransform: "none",
                borderRadius: "15px",
                bgcolor: Theme.palette.background.primary,
              }}
            >
              Export
            </Button> */}
          </Grid>
        </Grid>
        <Grid
          container
          item
          sx={{ height: `${100 - statItemsHeight - 5.5 - 1.9}%` }}
        >
          <Grid container item>
            <CustomTable
              rows={machines}
              handleRowSelect={handleRowSelect}
              searchQuery={searchQuery}
              columns={columns}
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
            <MachineProfile details={machineDetails} />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default Machines;
