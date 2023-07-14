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
import DeleteIcon from "@mui/icons-material/Delete";
import { default as api } from "../components/store/apiSlice";
import EditTargetDialog from "../components/EditTargetDialog";
import jsPDF from "jspdf";
import "jspdf-autotable";


const tabelSx = {
  width: "10%",
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
      <TableCell sx={th}>TargetID</TableCell>
      <TableCell sx={th}>TargetName</TableCell>
      <TableCell sx={th}>Description</TableCell>
      <TableCell sx={th}>Time</TableCell>
      <TableCell sx={th}>Date</TableCell>
      <TableCell sx={th}>Quantity</TableCell>
      <TableCell sx={th}>value</TableCell>
      <TableCell sx={th}>target Type</TableCell>
      <TableCell sx={th}>quick Target</TableCell>
      <TableCell sx={th}>order Date</TableCell>
      <TableCell sx={th}>final Date</TableCell>
      <TableCell sx={th}>driver Details</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}
function TargetComponent({ target, handler, onEditClick }) {
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
  //   console.log(target);
  // }, []);

 
  return (
    <TableRow>
        
      <TableCell sx={tc}>{target.targetID ?? ""}</TableCell>
      <TableCell sx={tc}>{target.targetName ?? ""}</TableCell>
      <TableCell sx={tc}>{target.description ?? ""}</TableCell>
      <TableCell sx={tc}>{target.time ?? ""}</TableCell>
      <TableCell sx={tc}>{target.date ?? ""}</TableCell>
      <TableCell sx={tc}>{target.quantity ?? ""}</TableCell>
      <TableCell sx={tc}>{target.value ?? ""}</TableCell>
      <TableCell sx={tc}>{target.targetType ?? ""}</TableCell>
      <TableCell sx={tc}>{target.quickTarget ?? ""}</TableCell>
      <TableCell sx={tc}>{target.orderDate ?? ""}</TableCell>
      <TableCell sx={tc}>{target.finalDate ?? ""}</TableCell>
      <TableCell sx={tc}>{target.driverDetails ?? ""}</TableCell>

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
        <EditTargetDialog
          open={openDialog}
          setOpen={setOpenDialog}
          targetDataData={target}
        />
        <Button
          data-id={target._id ?? ""}
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
export default function Targets() {
  const { data, isFetching, isSuccess, isError } = api.useGetTargetQuery();
  const [deleteTarget] = api.useDeleteTargetMutation();
  const [pdfData, setPdfData] = useState([]);
 //generate report
 const handleDownloadPdf = () => {
  const doc = new jsPDF();
  const tableData = pdfData.length ? pdfData : data;

  doc.autoTable({
    head: [
      [
        "Target ID",
        "Target Name",
        "Description",
        "Time",
        "Date",
        "Quantity",
        "Value",
        "Target Type",
        "Quick Target",
        "Order Date",
        "Final Date",
        "Driver Details",
      ],
    ],
    body: tableData.map((t) => [
      t.targetID,
      t.targetName,
      t.description,
      t.time,
      t.date,
      t.quantity,
      t.value,
      t.targetType,
      t.quickTarget,
      t.orderDate,
      t.finalDate,
      t.driverDetails,
    ]),
  });

  doc.save("time_details_report.pdf");
};

const handleAddToPdfData = (time) => {
  setPdfData([...pdfData, time]);
};

  const handlerClick = (e) => {
    if (!e.target.dataset.id) return 0;
    deleteTarget({ _id: e.target.dataset.id });
  };
  if (isFetching) {
    return <div>Fetching</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  
  //generate report
  
  
  return (
    <Box sx={boxSX}>
      <Table sx={tabelSx}>
        <TableHead sx={THead}>
          <TableHeader />
        </TableHead>

        <TableBody>
          {data.map((v, i) => (
            <TargetComponent key={i} target={v} handler={handlerClick} />
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
