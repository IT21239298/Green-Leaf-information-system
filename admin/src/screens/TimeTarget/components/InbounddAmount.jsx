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

function TimeComponent({ time, handler, editClick }) {
  const totalAmount = time.time - time.timePeriod;
  return (
    <TableRow>
      <TableCell sx={tc}>{time.targetName ?? ""}</TableCell>

      <TableCell sx={tc}>{totalAmount ?? ""} kg</TableCell>
    </TableRow>
  );
}

export default function InboundAmount() {
  const { data, isFetching, isSuccess, isError } = api.useGetTimeQuery();
  const [pdfData, setPdfData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (searchQuery) => {
    const newData = data.filter((item) =>
      item.targetName.toLowerCase().includes(searchQuery.toLowerCase())
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
    const totalAmount = curr.timeAvailable - curr.timePeriod;
    return acc + totalAmount;
  }, 0);

  // generate pdf
  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const tableData = pdfData.length
      ? pdfData
      : filteredData.length
      ? filteredData
      : data;

    doc.autoTable({
      head: [["Target Name", "Total Amount"]],
      body: tableData.map((v) => [v.targetName, v.totalAmount]),
    });

    doc.save(" Inbound_totaltime_report.pdf");
  };

  const handleAddToPdfData = (time) => {
    setPdfData([...pdfData, time]);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {" "}
        <Typography sx={titleSx}>TIME AND TARGET REPORT </Typography>
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
                    <TimeComponent
                      key={i}
                      time={v}
                      addToPdfData={handleAddToPdfData}
                    />
                  ))
                : data.map((v, i) => (
                    <TimeComponent
                      key={i}
                      time={v}
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
