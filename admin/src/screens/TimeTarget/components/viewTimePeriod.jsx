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
import { default as api } from "./store/apiSlice";

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
      <TableCell sx={th}> Target Id</TableCell>
      <TableCell sx={th}>Time Available</TableCell>
      <TableCell sx={th}>Time Period</TableCell>
    </TableRow>
  );
}

function TimeComponent({ time, handler, editClick }) {
  const totalAmount = time.time - time.timePeriod;
  return (
    <TableRow>
      <TableCell sx={tc}>{time.targetName ?? ""}</TableCell>
      <TableCell sx={tc}>{time.timeAvailable ?? ""}</TableCell>
      <TableCell sx={tc}>{time.timePeriod ?? ""}</TableCell>
    </TableRow>
  );
}

export default function InspectTimePeriodDetails() {
  const { data, isFetching, isSuccess, isError } = api.useGetTimeQuery();

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

  return (
    <Box>
      <SearchBar onSearch={handleSearch} />

      <Table sx={tabelSx}>
        <TableHead sx={THead}>
          <TableHeader />
        </TableHead>

        <TableBody>
          {filteredData.length
            ? filteredData.map((v, i) => <TimeComponent key={i} time={v} />)
            : data.map((v, i) => <TimeComponent key={i} time={v} />)}
        </TableBody>
      </Table>
    </Box>
  );
}
