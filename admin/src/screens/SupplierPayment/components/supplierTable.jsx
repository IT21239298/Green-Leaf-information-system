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
import EditPayment from "../components/EditPayment";

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
  mt: "90px"
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
      <TableCell>Supplier ID</TableCell>
      <TableCell>Account Holder Name</TableCell>
      <TableCell>Bank Name</TableCell>
      <TableCell>Account Number</TableCell>
      <TableCell>Brunch</TableCell>
      <TableCell>Fertilizer</TableCell>
      <TableCell>Teapackets</TableCell>
      <TableCell>Transport</TableCell>
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

  // useEffect(() => {
  //   console.log(supplier);
  // }, []);

  return (
    <TableRow>
     <TableCell sx={tc}>{payment._id}</TableCell>
     <TableCell sx={tc}>{payment.supID}</TableCell>

                <TableCell sx={tc}>{payment.SupplierID}</TableCell>
                <TableCell sx={tc}>{payment.AccountHolderName}</TableCell>
                <TableCell sx={tc}>{payment.BankName}</TableCell>
                <TableCell sx={tc}>{payment.AccountNumber}</TableCell>
                <TableCell sx={tc}>{payment.Brunch}</TableCell>
                <TableCell sx={tc}>{payment.Fertilizer}</TableCell>
                <TableCell sx={tc}>{payment.Teapackets}</TableCell>
                <TableCell sx={tc}>{payment.Transport}</TableCell>
                
              
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
         <EditPayment
          open={openDialog}
          setOpen={setOpenDialog}
          paymentData = {payment}
      
        />
        <button className="px-3" onClick={handler }>
                    <box-icon
                    data-id={payment._id}
                      color="#28B463"
                      size="35px"
                      name="trash"
                    ></box-icon>
                  </button>
      </TableCell>
    </TableRow>
  );
}
export default function supplierTable() {
//const { data, isFetching, isSuccess, isError } = api.useGetpaymentQuery();
//const [deletePayment]  = api.useDeletepaymentMutation();
//const [pdfData, setPdfData] = useState([]);
//const [query, setQuery] = useState("");
//const [filteredData, setFilteredData] = useState([]);
//
//const handleSearch = (searchQuery) => {
//  const newData = data.filter((item) =>
//    item.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
//  );
//  setFilteredData(newData);
//};
//const handlerClick = (e) => {
//  if (!e.target.dataset.id) return 0;
//  deletePayment({ _id: e.target.dataset.id });
//};
//if (isFetching) {
//  return <div>Fetching</div>;
//}
//
//if (isError) {
//  return <div>Error</div>;
//}
  
  return (
    <Box sx={boxSX}>
     
      <Table sx={tabelSx}>
        <TableHead sx={THead}>
          <TableHeader />
        </TableHead>

        <TableBody>
      {/* {  {data.map((v, i) => (
         <PaymentComponent key={i} payment={v} handler={handlerClick} />
      ))} } */}
        </TableBody>
      </Table>
    </Box>
  );
}