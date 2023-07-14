import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import AddCustomerIcon from "@mui/icons-material/PersonAdd";
import ExportIcon from "@mui/icons-material/FileDownload";

import jsPDF from "jspdf";
import "jspdf-autotable";

import axios from "axios";
import CustomTable from "../components/OrdersTable";
import SearchBar from "../components/SearchBar";
import OrdersFormDialog from "../components/OrdersFormDialog";

import { Theme } from "../utils/Theme";
import { useEffect } from "react";

const statItemsHeight = 15;

const columns = [

  {
    id: "orderID",
    label: "Order id",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "amount",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "requiredDate",
    label: "Required Date",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "type",
    label: "Type",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
];

const Orders = () => {
  const [isRowSelected, setRowIsSelected] = useState(false);
  const [ordersDetails, setOrdersDetails] = useState({});
  const [openAddOrdersDialog, setOpenAddOrdersDialog] =
    useState(false);

  const handleOpenAddOrdersDialog = () => {
    setOpenAddOrdersDialog(true);
  };

  const [orders, setOrders] = useState([]);
  const [orderrCount, setOrderCount] = useState(0);

  const handleRowSelect = (details) => {
    setOrdersDetails(details);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8082/order")
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
        setOrderCount(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const generatePDFReport = () => {
    const doc = new jsPDF();

    const tableData = [];
    orders.forEach((row) => {
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

    doc.save("order_report.pdf");
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
            <Typography
              sx={{ fontSize: "25px" }}
            >{`Orders (${orders.length})`}</Typography>
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
              Get Report
            </Button>
          </Grid>

       
          <Grid item sm={2}>
            <Button
              variant="contained"
              startIcon={<AddCustomerIcon />}
              disableElevation
              onClick={handleOpenAddOrdersDialog}
              sx={{
                height: "85%",
                width: "100%",
                textTransform: "none",
                borderRadius: "15px",
                bgcolor: Theme.palette.background.primary,
              }}
            >
              Add a Order
            </Button>
            <OrdersFormDialog
              varient="add"
              open={openAddOrdersDialog}
              setOpen={setOpenAddOrdersDialog}
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
              rows={orders}
              handleRowSelect={handleRowSelect}
              searchQuery={searchQuery}
              columns={columns}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Orders;
