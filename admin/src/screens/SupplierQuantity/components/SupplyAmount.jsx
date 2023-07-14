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
import AddSupplierQuantity from "../components/AddSupplierQuantity";

const tabelSx = {
  width: "100%",
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
      <TableCell sx={th}> DATE</TableCell>
      <TableCell sx={th}> SUPPLIER ID</TableCell>
      <TableCell sx={th}>QUANTITY</TableCell>
      <TableCell sx={th}>MOISTURE</TableCell>
      <TableCell sx={th}>TOTAL AMOUNT</TableCell>
    </TableRow>
  );
}

function SupplierQuantityComponent({ supplierquantity, handler }) {
  return (
    <TableRow>
      <TableCell sx={tc}>{supplierquantity.Date ?? ""}</TableCell>
      <TableCell sx={tc}>{supplierquantity.supplierID ?? ""}</TableCell>
      <TableCell sx={tc}>{supplierquantity.supQuantity ?? ""}</TableCell>
      <TableCell sx={tc}>{supplierquantity.supMoisture ?? ""}</TableCell>
      <TableCell sx={tc}>{supplierquantity.supTotalQuantity ?? ""}</TableCell>
    </TableRow>
  );
}

export default function SupplyAmount() {
  const { data, isFetching, isError } = api.useGetSupplierQuantityQuery();

  const [filteredData, setFilteredData] = useState([]);

  const handlerClick = (e) => {
    if (!e.target.dataset_id) return 0;
  };

  if (isFetching) {
    return <div>Fetching</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  // calculate the total amount of all the supTotalQuantity values
  const supAmount = data.reduce((total, current) => {
    const stot = total + current.supTotalQuantity;
    localStorage.setItem("supplyAmount", stot);
    return stot;
  }, 0);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {" "}
        <Typography sx={titleSx}>SUPPLIER QUANTITY REPORT </Typography>
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            bgcolor: "#2F2F3D",
            width: "600px",
            height: "1000px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            mt: "5px",
            ml: "100px",
          }}
        >
          <SearchBar />
          <Table sx={tabelSx}>
            <TableHead sx={THead}>
              <TableHeader />
            </TableHead>

            <TableBody>
              {filteredData.length
                ? filteredData.map((v, i) => (
                    <SupplierQuantityComponent key={i} supplierquantity={v} />
                  ))
                : data.map((v, i) => (
                    <SupplierQuantityComponent
                      key={i}
                      supplierquantity={v}
                      handler={handlerClick}
                    />
                  ))}
            </TableBody>
          </Table>{" "}
          <div style={am}>
            Total Amount
            <div
              style={{ color: "#55C595", fontWeight: "bold", fontSize: "30px" }}
            >
              {" "}
              {supAmount} kg
            </div>
          </div>
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box
          sx={{
            bgcolor: "#2F2F3D",
            width: "550px",
            height: "750px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
            borderRadius: "25px",
            textAlign: "center",
            padding: "5px 18px",
          }}
        >
          <AddSupplierQuantity />
        </Box>
      </Grid>
    </Grid>
  );
}
