import React, { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  Table,
  Button,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  TextField,
  Input,
} from "@mui/material";
import { default as api } from "../components/store/apiSlice";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Image from "../assets/img/logo.png";

const tabelSx = {
  width: "100%",
};

const boxSX = {
  bgcolor: "#2F2F3D",

  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
  boxSizing: "border-box",
  borderRadius: "25px",
  textAlign: "center",
  px: "10px",
  padding: "2px 18px",
};

const THead = {
  background: "#105949",
};
const th = {
  color: "#fff",
  fontSize: "24px",
  fontWeight: "bold",
};
const tc = {
  color: "#fff",
  fontSize: "18px",
  fontFamily: "Arvo",
};

function TableHeader() {
  return (
    <TableRow>
      <TableCell sx={th}>Name</TableCell>
      <TableCell sx={th}>Amount</TableCell>
      <TableCell sx={th}>Date</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}

function MachineComponent({ machine, handler, editClick }) {
  return (
    <TableRow>
      <TableCell sx={tc}>{machine.name ?? ""}</TableCell>
      <TableCell sx={tc}>{machine.amount ?? ""}</TableCell>
      <TableCell sx={tc}>{machine.date ?? ""}</TableCell>
      <TableCell>
        <Button
          text="Edit"
          variant="outlined"
          style={{ color: "green" }}
          onClick={editClick}
          startIcon={<BorderColorIcon />}
          sx={{
            mt: 1,
            mb: 1,
            borderColor: "green",
            "&:hover": { borderColor: "green" },
          }}
        />

        <button className="px-3" onClick={handler}>
          <box-icon
            data-id={machine._id ?? ""}
            color="#F90505"
            size="35px"
            name="trash"
          ></box-icon>
        </button>
      </TableCell>
    </TableRow>
  );
}

export default function Machintable({ editClick }) {
  const { data, isFetching, isSuccess, isError } = api.useGetMachinepQuery();
  const [deleteMachine] = api.useDeleteMachinepMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [pdfData, setPdfData] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);

  const handlerClick = (e) => {
    if (!e.target.dataset.id) return 0;
    deleteMachine({ _id: e.target.dataset.id });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isFetching) {
    return <div>Fetching</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  // filter data based on search query
  const filteredData = data.filter((machine) => {
    const searchQueryLowerCase = searchQuery.toLowerCase();
    const nameLowerCase = machine.name.toLowerCase();
    const idLowerCase = machine._id.toLowerCase();

    return (
      nameLowerCase.includes(searchQueryLowerCase) ||
      idLowerCase.includes(searchQueryLowerCase) ||
      machine.amount.toString().includes(searchQuery) ||
      machine.date.includes(searchQuery)
    );
  });

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const tableData = pdfData.length
      ? pdfData
      : filteredData.length
      ? filteredData
      : data;

    const tableColumns = [" ID", "Name", "Amount", "Date"];
    const tableRows = tableData.map((v) => [v._id, v.name, v.amount, v.date]);

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
      startY: 40,
    });

    // Add font family to the heading
    doc.setFontSize(20);
    doc.setFont("Arvo", "bold");
    doc.text("MACHNE DETAIL REPORT", 40, 30);
    doc.save("machine_report.pdf");
  };

  const handleAddToPdfData = (machine) => {
    setPdfData([...pdfData, machine]);
  };

  return (
    <Box>
      <Input
        sx={{
          width: "80%",
          color: "white",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "8px",
          backgroundColor: "transparent",
          outline: "none",
        }}
        type="text"
        placeholder="Search Machine"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <Table sx={tabelSx}>
        <TableHead sx={THead}>
          <TableHeader />
        </TableHead>

        <TableBody>
          {filteredData.map((v, i) => (
            <MachineComponent
              key={i}
              machine={v}
              handler={handlerClick}
              addToPdfData={handleAddToPdfData}
              editClick={() => editClick(v)}
            />
          ))}
        </TableBody>
      </Table>
      <Button
        color="success"
        variant="contained"
        sx={{ mt: 2, mb: 1, bgcolor: "green" }}
        onClick={handleDownloadPdf}
      >
        Generate Report
      </Button>
    </Box>
  );
}
