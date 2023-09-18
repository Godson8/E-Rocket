"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Link from "next/link";
import axios from "axios";
import { useAuthProtection } from "../../../hooks/useAuthProtection";
import { useRouter } from "next/navigation";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

interface Data {
  id: number;
  name: string;
  username: string;
  address: string;
  emissions_target: number;
  total_commitments: number;
  total_ghg_savings: number;
  total_progress: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number }, b: { [key in Key]: number }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Company Name",
  },
  {
    id: "username",
    numeric: false,
    disablePadding: false,
    label: "User Name",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "emissions_target",
    numeric: true,
    disablePadding: false,
    label: "Emissions Target",
  },
  {
    id: "total_commitments",
    numeric: true,
    disablePadding: false,
    label: "Total Commitmments (Gallons)",
  },
  {
    id: "total_ghg_savings",
    numeric: true,
    disablePadding: false,
    label: "Total GHG Savings (g CO2e/MJ)",
  },
  {
    id: "total_progress",
    numeric: true,
    disablePadding: false,
    label: "Total Progress",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Clientelle
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

const Clients = () => {
  // useAuthProtection();
  const router = useRouter();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("id");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //axios request start

  useEffect(() => {
    axios
      .get("https://e-rocket-backend.onrender.com/dashboard")
      .then((res) => {
        if (res.data.valid) {
          // User is authenticated, continue rendering the dashboard
        } else {
          router.push("/login"); // Redirect to the login page if not authenticated
        }
        console.log(res);
      })
      .catch((error) => {
        // router.push("/login"); // Handle network errors by redirecting to login
        console.error(error);
      });
  }, []);
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    axios
      .get("https://e-rocket-backend.onrender.com/allclients")
      .then((res) => {
        if (res.data.status === "Success") {
          setData(res.data.Result);
          console.log(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (confirmDelete) {
      axios
        .delete(`https://e-rocket-backend.onrender.com/delete/${id}`)
        .then((res) => {
          if (res.data.status === "Success") {
            window.location.reload();
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  console.log(data);
  //axios request end
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <div className="container">
      <Link
        href="/dashboard/addclient"
        className="bg-[#FFD55A] text-primary px-[28px] py-2 font-primary font-semibold text-[17px] w-fit rounded-md hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer"
      >
        Add new client
      </Link>
      {/* <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>User Name</th>
            <th>Address</th>
            <th>Emissions target</th>
            <th>Total commitments</th>
            <th>Total GHG Savings</th>
            <th>Total Progress</th>
            <th>Act</th>
          </tr>
        </thead>
        <tbody>
          {data.map((clientelle: any, index: any) => (
            <tr key={index}>
              <td>{clientelle.name}</td>
              <td>{clientelle.username}</td>
              <td>{clientelle.address}</td>
              <td>{clientelle.emissions_target}</td>
              <td>{clientelle.total_commitments}</td>
              <td>{clientelle.total_ghg_savings}</td>
              <td>{clientelle.total_progress}</td>
              <td>
                <Link href={`/dashboard/clientEdit/${clientelle.id}`}>
                  edit
                </Link>
                <button onClick={() => handleDelete(clientelle.id)}>
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  console.log(typeof row.id);
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      {/* <TableCell align="right">{row.company_name}</TableCell> */}
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.username}</TableCell>
                      <TableCell align="right">{row.address}</TableCell>
                      <TableCell align="right">
                        {row.emissions_target}
                      </TableCell>
                      <TableCell align="right">
                        {row.total_commitments}
                      </TableCell>
                      <TableCell align="right">
                        {row.total_ghg_savings}
                      </TableCell>
                      <TableCell align="right">{row.total_progress}</TableCell>
                      <button onClick={() => handleDelete(row.id)}>
                        delete
                      </button>
                      <Link href={`/dashboard/clientEdit/${row.id}`}>edit</Link>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
      </Box>
    </div>
  );
};

export default Clients;
