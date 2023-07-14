import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Theme } from "../../utils/Theme";

function createData(
  routeId,
  driverId,
  vehicleId,
  supplierIds,
  createdDate,
  status
) {
  return {
    routeId,
    driverId,
    vehicleId,
    supplierIds,
    createdDate,
    status,
  };
}

export default function RouteTable({ routes }) {
  const rows = [];

  routes.map((route) => {
    rows.push(
      createData(
        route.routeId,
        route.driverId,
        route.vehicleId,
        route.supplierIds,
        route.createdDate,
        route.status
      )
    );
  });
  return (
    <TableContainer
      component={Paper}
      sx={{
        bgcolor: Theme.palette.background.primary,
        width: "500px",
        overflowY: "scroll",
        "&::-webkit-scrollbar": { width: 0, height: 0 },
      }}
    >
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Route ID</TableCell>
            <TableCell align="right">Driver</TableCell>
            <TableCell align="right">Vehicle</TableCell>
            <TableCell align="right">Suppliers</TableCell>
            <TableCell align="right">Created Date</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.routeId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.routeId}
              </TableCell>
              <TableCell align="right">{row.driverId}</TableCell>
              <TableCell align="right">{row.vehicleId}</TableCell>
              <TableCell align="right">{row.supplierIds}</TableCell>
              <TableCell align="right">{row.createdDate}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
