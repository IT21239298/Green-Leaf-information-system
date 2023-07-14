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
} from "@mui/material";
import { default as api } from "../components/store/apiSlice";
import EditInboundQuantity from "../components/EditInboundQuantity";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const tabelSx = {
  width: "100%",
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
      <TableCell sx={th}> Vehicle ID</TableCell>
      <TableCell sx={th}>Quantity</TableCell>
      <TableCell sx={th}>Moisture</TableCell>
      <TableCell sx={th}>Total Amount</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}

function QuantityComponent({ quantity, handler, editClick }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleEditClick = () => {
    setIsEditOpen(true);
    setOpenDialog(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const totalAmount = quantity.quantity - quantity.moisture;
  return (
    <TableRow>
      <TableCell sx={tc}>{quantity.vehicle ?? ""}</TableCell>
      <TableCell sx={tc}>{quantity.quantity ?? ""}</TableCell>
      <TableCell sx={tc}>{quantity.moisture ?? ""}</TableCell>
      <TableCell sx={tc}>{totalAmount ?? ""}</TableCell>
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
        <EditInboundQuantity
          open={openDialog}
          setOpen={setOpenDialog}
          quantityData={quantity}
        />
        <Button
          data-id={quantity._id ?? ""}
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

export default function InspectQuantityDetails() {
  const { data, isFetching, isSuccess, isError } = api.useGetQuantityQuery();
  const [deleteQuantity] = api.useDeleteQuantityMutation();
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (searchQuery) => {
    const newData = data.filter((item) =>
      item.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(newData);
  };

  const handlerClick = (e) => {
    if (!e.target.dataset.id) return 0;
    deleteQuantity({ _id: e.target.dataset.id });
  };
  if (isFetching) {
    return <div>Fetching</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Box>
      <SearchBar onSearch={handleSearch} />

      <Table sx={tabelSx}>
        <TableHead sx={THead}>
          <TableHeader />
        </TableHead>

        <TableBody>
          {filteredData.length
            ? filteredData.map((v, i) => (
                <QuantityComponent key={i} quantity={v} />
              ))
            : data.map((v, i) => (
                <QuantityComponent
                  key={i}
                  quantity={v}
                  handler={handlerClick}
                />
              ))}
        </TableBody>
      </Table>
    </Box>
  );
}
