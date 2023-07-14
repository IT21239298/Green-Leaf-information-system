import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";

import AddCustomerIcon from "@mui/icons-material/PersonAdd";
import ExportIcon from "@mui/icons-material/FileDownload";

import CustomTable from "../components/CustomerTable";
import CustomerProfile from "../components/CustomerProfile";
import SearchBar from "../components/SearchBar";
import CustomerFormDialog from "../components/CustomerFormDialog";

import { Theme } from "../utils/Theme";
import { useEffect } from "react";

const statItemsHeight = 15;

const columns = [
  {
    id: "customerName",
    label: "Customer Name",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "customerID",
    label: "Customer id",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "contactNumber",
    label: "Contact Number",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "requestedDate",
    label: "Requested Date",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "orderID",
    label: "Order ID",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "buttons",
    label: "",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

const Customers = () => {
  const [isRowSelected, setRowIsSelected] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});
  const [openAddCustomerDialog, setOpenAddCustomerDialog] = useState(false);

  const handleOpenAddCustomerDialog = () => {
    setOpenAddCustomerDialog(true);
  };

  const [customers, setCustomers] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);

  const handleRowSelect = (details) => {
    setCustomerDetails(details);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8082/customer")
      .then((response) => {
        console.log(response.data);
        setCustomers(response.data);
        setCustomerCount(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const [searchQuery, setSearchQuery] = useState("");

  const generatePDFReport = () => {
    const doc = new jsPDF();

    const tableData = [];
    customers.forEach((row) => {
      const rowData = [];
      columns.forEach((column) => {
        const value = row[column.id];
        rowData.push(value);
      });
      tableData.push(rowData);
    });

    const tableHeaders = columns.map((column) => column.label);
    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("customer_report.pdf");
  };

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
        <Grid
          container
          item
          direction="row"
          columnSpacing={2}
          sx={{ height: `${100 - statItemsHeight - 79.5}%` }}
        >
 <Grid container item sm={4} direction="row" alignItems="center">
        <Typography sx={{ fontSize: "25px" }}>{`Customers (${customerCount})`}</Typography>
      </Grid>


{/* export button */}

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
              Get Report
            </Button>
          </Grid>

         
          <Grid item sm={2}>
            <Button
              variant="contained"
              startIcon={<AddCustomerIcon />}
              disableElevation
              onClick={handleOpenAddCustomerDialog}
              sx={{
                height: "85%",
                width: "100%",
                textTransform: "none",
                borderRadius: "15px",
                bgcolor: Theme.palette.background.primary,
              }}
            >
              Add a Customer
            </Button>
            <CustomerFormDialog
              varient="add"
              open={openAddCustomerDialog}
              setOpen={setOpenAddCustomerDialog}
            />
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
          

        
        </Grid>
        <Grid
          container
          item
          sx={{ height: `${100 - statItemsHeight - 5.5 - 1.9}%` }}
        >
          <Grid container item>
            <CustomTable
              rows={customers}
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
            <CustomerProfile details={customerDetails} />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default Customers;
