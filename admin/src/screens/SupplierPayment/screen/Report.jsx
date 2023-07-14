import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { default as api } from "../components/store/apiSlice";
import EditPaymentDialog from "../components/EditPaymentDialog";
import jsPDF from "jspdf";
import "jspdf-autotable";
import SearchBar from "../components/SearchBar";

const tabelSx = {
  width: "100%",
};

const boxSX = {
  bgcolor: "#2F2F3D",
  width: "1350px",
  height: "800px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
  boxSizing: "border-box",
  borderRadius: "25px",
  textAlign: "center",
  px: "10px",
  padding: "2px 18px",
  mt: "-2px",
  ml: "10px"
};

const THead = {
  background: "#105949",
  
  borderRadius: "25px",
  backgroundColor: "#ffffff", 
  padding: "16px",
  borderRadius: "8px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
  
};

const th = {
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  width: "150px",
  
};

const tc = {
  color: "#fff",
  fontSize: "12px",
  fontFamily: "Arvo",
};

function TableHeader() {
  return (
    <TableRow>
      <TableCell>Supplier ID</TableCell>
      <TableCell>Tea Leaves Quantity</TableCell>
      <TableCell>Tea Leaves Price(Monthly)</TableCell>
      <TableCell>fertilizer Cost</TableCell>
      <TableCell>Transport Cost</TableCell>
      <TableCell>Tea Packet COst</TableCell>
      <TableCell>Monthly Payment</TableCell>
    </TableRow>
  );
}

function PaymentComponent({ payment, handler, onEditClick }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleEditClick = () => {
    setIsEditOpen(true);
    setOpenDialog(true);
    console.log(openDialog);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  //useEffect(() => {
    // console.log(payment);
  //}, []);

  return (
    <TableRow>
      <TableCell sx={tc}>{payment.supID}</TableCell>
      <TableCell sx={tc}>{payment.quantity}</TableCell>
      <TableCell sx={tc}>{payment.mquantity}</TableCell>
      <TableCell sx={tc}>{payment.cost}</TableCell>
      <TableCell sx={tc}>{payment.transecost}</TableCell>
      <TableCell sx={tc}>{payment.packetcost}</TableCell>
      <TableCell sx={tc}>{payment.mPay}</TableCell>
      <TableCell>
        <Button
          text="Edit"
          variant="outlined"
          style={{ color: "green" }}
          onClick={handleEditClick}
          startIcon={<EditIcon />}
          sx={{
            mt: 2,
            mb: 1,
            borderColor: "green",
            "&:hover": { borderColor: "green" },
          }}
        />
        
          <button className="px-3" onClick={handler}>
          <box-icon
            data-id={payment._id}
            color="red"
            size="35px"
            name="trash"
          ></box-icon>
        </button>
        <EditPaymentDialog
          open={openDialog}
          setOpen={setOpenDialog}
          paymentData={payment}
        />
      </TableCell>
    </TableRow>
  );
}

export default function Report() {
  const { data, isFetching, isSuccess, isError } = api.useGetpaymentQuery();
  const [deletePayment] = api.useDeletepaymentMutation();
  const [pdfData, setPdfData] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  //search

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    const newData = data.filter((item) =>
      item.supID.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(newData);
  };

  const handlerClick = (e) => {
    if (!e.target.dataset.id) return 0;
    deletePayment({ _id: e.target.dataset.id });
  };

  if (isFetching) {
    return <div>Fetching</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  // Generate report
  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const tableData = pdfData.length ? pdfData : data;

    doc.autoTable({
      head: [
        [
          "Supplier ID",
          "Tea Leaves Quantity",
          "Tea Leaves Price(Monthly)",
          "Fertilizer Cost",
          "Transport Cost",
          "Tea Packet Cost",
          "Monthly Payment",
        ],
      ],
      body: tableData.map((p) => [
        p.supID,
        p.quantity,
        p.mquantity,
        p.cost,
        p.transecost,
        p.packetcost,
        p.mPay,
      ]),
    });

    doc.save("payment_details_report.pdf");
  };

  const handleAddToPdfData = (quantity) => {
    setPdfData([...pdfData, quantity]);
  };

  return (
    <Box sx={boxSX}>
      <SearchBar onSearch={handleSearch} />

      <Table sx={tabelSx}>
        <TableHead sx={THead}>
          <TableHeader />
        </TableHead>

        <TableBody>
          {(query !== "" ? filteredData : data).map((v, i) => (
            <PaymentComponent key={i} payment={v} handler={handlerClick} />
          ))}
        </TableBody>
      </Table>

      <Button
        color="success"
        variant="contained"
        sx={{ mt: 2, mb: 1, bgcolor: "green", mt: "200px" }}
        onClick={handleDownloadPdf}
      >
        Generate Report
      </Button>
    </Box>
  );
}
