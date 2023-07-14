import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Lottie from "lottie-react";

import { Theme } from "../../utils/Theme";

import GreenStatus from "../../assets/lotties/green-status.json";
import RedStatus from "../../assets/lotties/red-status.json";
export default function VehicleTable({
  handleRowSelect,
  rows,
  columns,
  searchQuery,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        bgcolor: Theme.palette.background.primary,
        borderRadius: "20px",
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 680,
          overflowY: "scroll",
          "&::-webkit-scrollbar": { width: 0, height: 0 },
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ backgroundColor: Theme.palette.background.primary }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .filter((row) =>
                Object.values(row).some(
                  (value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchQuery.toLowerCase())
                )
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                // const rowData = [];
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    onClick={() => handleRowSelect(row)}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      // rowData.push(value);

                      let component = <></>;

                      if (column.id === "vehicleId") {
                        component = (
                          <TableCell key={column.id} align={column.align}>
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              columnSpacing={2}
                            >
                              <Grid item>
                                <img
                                  alt={row.vehicleId}
                                  src={require(`../../assets/profiles/vehicles/${row.vehicleId}.png`)}
                                  style={{
                                    width: "80px",
                                  }}
                                />
                              </Grid>
                              <Grid item>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </Grid>
                            </Grid>
                          </TableCell>
                        );
                      } else if (column.id === "status") {
                        component = (
                          <TableCell key={column.id} align={column.align}>
                            <Chip
                              avatar={
                                value.toLowerCase() === "working" ? (
                                  <Lottie
                                    animationData={GreenStatus}
                                    loop={true}
                                    style={{ width: "20px" }}
                                  />
                                ) : (
                                  <Lottie
                                    animationData={RedStatus}
                                    loop={true}
                                    style={{ width: "20px" }}
                                  />
                                )
                              }
                              label={value}
                            />
                          </TableCell>
                        );
                      } else {
                        component = (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      }

                      return component;
                    })}
                  </TableRow>
                );
                // tableData.push(rowData);
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
