import React, { useState } from "react";
import SearchBar from "./SearchBar";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { default as api } from "../components/store/apiSlice";
import Image from "../assets/img/logo.png";
import jsPDF from "jspdf";
import "jspdf-autotable";

const tabelSx = {
  marginLeft: "80px",
  width: "80%",
};

const titleSx = {
  fontSize: "25px",
  color: "white",
  fontFamily: "Arvo",
  fontWeight: "bold",
  marginLeft: "100px",
};

const THead = {
  background: "#105949",
};
const th = {
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
};
const tc = {
  color: "#fff",
  fontSize: "12px",
  fontFamily: "Arvo",
};

const am = {
  marginTop: "5px",
  color: "#fff",
  fontSize: "25px",
  fontFamily: "Arvo",
};

function TableHeader() {
  return (
    <TableRow>
      <TableCell sx={th}> Vehicle ID</TableCell>

      <TableCell sx={th}>Quantity</TableCell>
    </TableRow>
  );
}

function QuantityComponent({ quantity, handler, editClick }) {
  const totalAmount = quantity.quantity - quantity.moisture;
  return (
    <TableRow>
      <TableCell sx={tc}>{quantity.vehicle ?? ""}</TableCell>

      <TableCell sx={tc}>{totalAmount ?? ""} kg</TableCell>
    </TableRow>
  );
}

export default function InboundAmount() {
  const { data, isFetching, isSuccess, isError } = api.useGetQuantityQuery();
  const [pdfData, setPdfData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (searchQuery) => {
    const newData = data.filter((item) =>
      item.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(newData);
  };

  if (isFetching) {
    return <div>Fetching</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  // calculate sum of totalAmount
  const sum = data.reduce((acc, curr) => {
    const totalAmount = curr.quantity - curr.moisture;
    const tot = acc + totalAmount;
    localStorage.setItem("totalAmount", tot);
    return tot;
  }, 0);

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const tableData = pdfData.length
      ? pdfData
      : filteredData.length
      ? filteredData
      : data;

    const tableColumns = ["Vehicle ID", "Total Amount"];
    const tableRows = tableData.map((v) => [v.vehicle, v.totalAmount]);

    // Add the logo to the PDF
    const logoData = Image;
    doc.addImage(logoData, "PNG", 25, 10, 150, 10);

    doc.autoTable({
      headStyles: {
        fillColor: [19, 77, 0],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      head: [tableColumns],
      body: tableRows,
      startY: 40, // adjust startY to make space for the logo
    });

    // Add font family to the heading
    doc.setFontSize(20);
    doc.setFont("Arvo", "bold");
    doc.text("INBOUND TOTAL AMOUNT REPORT", 40, 30); // adjust y position to align with logo

    doc.save("Inbound_totalquantity_report.pdf");
  };

  const handleAddToPdfData = (quantity) => {
    setPdfData([...pdfData, quantity]);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {" "}
        <Typography sx={titleSx}>INBOUND LOGISTIC QUANTITY REPORT </Typography>
      </Grid>
      <Grid item xs={8}>
        <Box
          sx={{
            bgcolor: "#2F2F3D",
            width: "720px",
            height: "600px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "100px",
          }}
        >
          <SearchBar onSearch={handleSearch} />

          <Table sx={tabelSx}>
            <TableHead sx={THead}>
              <TableHeader />
            </TableHead>

            <TableBody>
              {filteredData.length
                ? filteredData.map((v, i) => (
                    <QuantityComponent
                      key={i}
                      quantity={v}
                      addToPdfData={handleAddToPdfData}
                    />
                  ))
                : data.map((v, i) => (
                    <QuantityComponent
                      key={i}
                      quantity={v}
                      addToPdfData={handleAddToPdfData}
                    />
                  ))}
            </TableBody>
          </Table>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            bgcolor: "#2F2F3D",
            width: "220px",
            height: "100px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            ml: "100px",
            marginTop: "100px",
          }}
        >
          <Button
            color="success"
            variant="contained"
            sx={{ mt: 4, mb: 1, bgcolor: "green" }}
            onClick={handleDownloadPdf}
          >
            Generate Report
          </Button>
        </Box>
        <Box
          sx={{
            bgcolor: "#2F2F3D",
            width: "220px",
            height: "100px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            marginTop: "50px",
            marginLeft: "100px",
          }}
        >
          {" "}
          <div style={am}>
            Total Amount
            <div
              style={{ color: "#55C595", fontWeight: "bold", fontSize: "30px" }}
            >
              {" "}
              {sum} kg
            </div>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
}
