import React, { useEffect, useState } from "react";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Button,
  TextField,
  Input,
  Grid,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { default as api } from "../components/store/apiSlice";
import EditSupplierDialog from "../components/EditSupplierDialog";
import jsPDF from "jspdf";
import "jspdf-autotable";

const tabelSx = {
  width: "100%",
};

const boxSX = {
  bgcolor: "#2F2F3D",
  width: "1500px",
  height: "1000px",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
  boxSizing: "border-box",
  borderRadius: "25px",
  textAlign: "center",
  px: "10px",
  padding: "2px 18px",
};

const THead = {
  background: "#105949",
  mt: "50px",
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

function TableHeader() {
  return (
    <TableRow>
      <TableCell sx={th}> Supplier ID</TableCell>
      <TableCell sx={th}>First name</TableCell>
      <TableCell sx={th}>Last name</TableCell>
      <TableCell sx={th}>NIC</TableCell>
      <TableCell sx={th}>Address</TableCell>
      <TableCell sx={th}>Contact Number</TableCell>
      <TableCell sx={th}>Age</TableCell>
      <TableCell sx={th}>Gender</TableCell>
      <TableCell sx={th}>Bank</TableCell>
      <TableCell sx={th}>Branch</TableCell>
      <TableCell sx={th}>Account number</TableCell>
      <TableCell sx={th}>Account Holder name</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}
function SupplierComponent({ supplier, handler, onEditClick }) {
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

  // useEffect(() => {
  //   console.log(supplier);
  // }, []);

  return (
    <TableRow>
      <TableCell sx={tc}>{supplier.supID ?? ""}</TableCell>
      <TableCell sx={tc}>{supplier.fname ?? ""}</TableCell>
      <TableCell sx={tc}>{supplier.lname ?? ""}</TableCell>
      <TableCell sx={tc}>{supplier.nic ?? ""}</TableCell>
      <TableCell sx={tc}>{supplier.address ?? ""}</TableCell>
      <TableCell sx={tc}>{supplier.contactNo ?? ""}</TableCell>
      <TableCell sx={tc}>{supplier.age ?? ""}</TableCell>
      <TableCell sx={tc}>{supplier.gender ?? ""}</TableCell>
      <TableCell sx={tc}>{supplier.bank ?? ""}</TableCell>
      <TableCell sx={tc}>{supplier.branch ?? ""}</TableCell>
      <TableCell sx={tc}>{supplier.accNo ?? ""}</TableCell>
      <TableCell sx={tc}>{supplier.accName ?? ""}</TableCell>

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
        <EditSupplierDialog
          open={openDialog}
          setOpen={setOpenDialog}
          supplierData={supplier}
        />
        <Button
          data-id={supplier._id ?? ""}
          text="delete"
          variant="outlined"
          onClick={handler}
          startIcon={<DeleteIcon />}
          sx={{
            borderColor: "red",
            color: "red",
            "&:hover": { borderColor: "red" },
          }}
        />
      </TableCell>
    </TableRow>
  );
}
export default function InspectSupplierDetails() {
  const { data, isFetching, isSuccess, isError } = api.useGetSupplierQuery();
  const [deleteSupplier] = api.useDeleteSupplierMutation();
  const [pdfData, setPdfData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  //search details
  const handleSearch = (query) => {
    const filteredData = data.filter(
      (supplier) =>
        supplier.supID.toLowerCase().includes(query.toLowerCase()) ||
        `${supplier.fname}${supplier.nic}`
          .toLowerCase()
          .includes(query.toLowerCase())
    );
    setSearchResults(filteredData);
  };

  const handlerClick = (e) => {
    if (!e.target.dataset.id) return 0;
    const supplierId = e.target.dataset.id;
    const filteredData = data.filter(
      (supplier) => supplier.supID !== supplierId && supplier.nic !== supplierId
    );

    deleteSupplier({ _id: e.target.dataset.id });
  };

  if (isFetching) {
    return <div>Fetching</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  //generate report
  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const tableData = pdfData.length ? pdfData : data;

    doc.autoTable({
      head: [
        [
          "Supplier ID",
          "First name",

          "NIC",
          "Address",
          "Contact Number",

          "Bank",
          "Branch",
          "Account Number",
          "Account Holder Name",
        ],
      ],
      body: tableData.map((s) => [
        s.supID,
        s.fname,

        s.address,
        s.nic,
        s.contactNo,

        s.bank,
        s.branch,
        s.accNo,
        s.accName,
      ]),
      margin: { top: 30 },
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: "linebreak",
        halign: "left",
      },
      headStyles: {
        fillColor: "#1a9c9c",
        textColor: "#ffffff",
        halign: "left",
        fontSize: 8,
        cellPadding: 2,
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 20 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 30 },
        5: { cellWidth: 25 },
        6: { cellWidth: 10 },
        7: { cellWidth: 10 },
        8: { cellWidth: 20 },
        9: { cellWidth: 20 },
        10: { cellWidth: 20 },
        11: { cellWidth: 25 },
      },
    });

    doc.save("supplier_details_report.pdf");
  };

  const handleAddToPdfData = (quantity) => {
    setPdfData([...pdfData, quantity]);
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={9}>
        <Box
          sx={{
            bgcolor: "#2F2F3D",
            width: "1000px",
            height: "60px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            mb: "40px",
          }}
        >
          <TextField
            sx={{ width: "70%", color: "white", mt: "5px" }}
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            color="success"
            variant="outlined"
            mt="5px"
            size="small"
            onClick={() => handleSearch(searchQuery)}
            sx={{ ml: 1 }}
          >
            Search
          </Button>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Button
          color="success"
          variant="contained"
          sx={{ mt: 2, mb: 1, bgcolor: "green" }}
          onClick={handleDownloadPdf}
        >
          Generate Report
        </Button>
      </Grid>
      <Box sx={boxSX}>
        <Table sx={tabelSx}>
          <TableHead sx={THead}>
            <TableHeader />
          </TableHead>

          <TableBody>
            {searchResults.length > 0
              ? searchResults.map((v, i) => (
                  <SupplierComponent
                    key={i}
                    supplier={v}
                    handler={handlerClick}
                  />
                ))
              : data.map((v, i) => (
                  <SupplierComponent
                    key={i}
                    supplier={v}
                    handler={handlerClick}
                  />
                ))}
          </TableBody>
        </Table>
      </Box>
    </Grid>
  );
}
