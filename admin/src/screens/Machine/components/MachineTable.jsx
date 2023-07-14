import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { Theme } from "../utils/Theme";

import axios from "axios";
import MachineFormDialog from "./MachineFormDialog";

export default function CustomTable({
  rows,
  handleRowSelect,
  searchQuery,
  columns,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openAddDriverDialog, setOpenAddMachineDialog] = React.useState(false);

  React.useEffect(() => {
    console.log(rows);
  }, [rows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const generateReport = () => {
    const doc = new jsPDF();
    const tableRows = [];

    rows.forEach((row) => {
      const dataRow = [];
      columns.forEach((column) => {
        const value = row[column.id];
        dataRow.push(value);
      });
      tableRows.push(dataRow);
    });

    doc.autoTable({
      head: [columns.map((column) => column.label)],
      body: tableRows,
      theme: "striped",
      styles: {
        cellPadding: 0.5,
        fontSize: 8,
        overflow: "linebreak",
        halign: "left",
      },
      margin: { top: 20 },
    });

    doc.save("report.pdf");
  };

  const handleDelete = (details) => {
    const machine = { id: details._id, machineID: details.machineID };

    axios
      .delete("http://localhost:8082/machine/delete", {
        data: machine,
        headers: { Authorization: "***" },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpenAddMachineDialog = () => {
    setOpenAddMachineDialog(true);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        bgcolor: Theme.palette.background.primary,
        borderRadius: "20px",
        color: "white",
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
                  style={{
                    backgroundColor: Theme.palette.background.primary,
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .filter(
                (row) =>
                  typeof row.machineName === "string" &&
                  row.machineName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hovers
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    onClick={() => handleRowSelect(row)}
                    style={{ color: "white" }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      let component = <></>;

                      if (column.id === "machineName") {
                        component = (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ color: "white" }}
                          >
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              columnSpacing={2}
                            >
                              {/* <Grid item>
                                <Avatar
                                  alt={row.machineName}
                                  src={require(`../assets/profiles/machines/${row.machineID}.jpg`)}
                                />
                              </Grid> */}
                              <Grid item>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </Grid>
                            </Grid>
                          </TableCell>
                        );
                      } else if (column.id === "buttons") {
                        component = (
                          <TableCell key={column.id} align={column.align}>
                            <Button
                              variant="contained"
                              disableElevation
                              sx={{
                                bgcolor: Theme.palette.background.secondary,
                                mr: "20px",
                              }}
                              onClick={handleOpenAddMachineDialog}
                            >
                              Edit
                            </Button>
                            <MachineFormDialog
                              varient="update"
                              open={openAddDriverDialog}
                              setOpen={setOpenAddMachineDialog}
                              details={row}
                            />
                            <Button
                              variant="contained"
                              disableElevation
                              sx={{
                                bgcolor: "#D91F33",
                                ml: "20px",
                              }}
                              onClick={() => handleDelete(row)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        );
                      } else {
                        component = (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ color: "white" }}
                          >
                            {value}
                          </TableCell>
                        );
                      }

                      return component;
                    })}
                  </TableRow>
                );
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
      <button onClick={generateReport}>Generate Report</button>
    </Paper>
  );
}
