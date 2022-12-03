import { Helmet } from "react-helmet";
import { filter, sample } from "lodash";
import { sentenceCase } from "change-case";
// @mui
import {
  Avatar,
  Card,
  Checkbox,
  Container,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TablePagination,
  Paper,
  Popover,
  MenuItem,
} from "@mui/material";
import Title from "../../components/title";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import { Label } from "@mui/icons-material";
import Iconify from "../../components/iconify";
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
import { fDateTime } from "../../utils/Format/formatTime";
import BasicSpeedDial from "./components/BasicSpeedDial";
import { DialogEditUser } from "./components/DialogEditUser";

// ----------------------------------------------------------------------
// Fake data user
const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/logo.png`,
  fullName: faker.name.fullName(),
  email: faker.internet.email(),
  createdDate: faker.date.past(),
  status: sample(["active", "banned"]),
  role: sample([
    "Leader",
    "Hr Manager",
    "UI Designer",
    "UX Designer",
    "UI/UX Designer",
    "Project Manager",
    "Backend Developer",
    "Full Stack Designer",
    "Front End Developer",
    "Full Stack Developer",
  ]),
}));

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "fullName", label: "Họ Và Tên", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "role", label: "Chức Vụ", alignRight: false },
  { id: "status", label: "Trạng Thái", alignRight: false },
  { id: "createdDate", label: "Ngày Tạo", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ManagementUser() {
  const [open, setOpen] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const [user, setUser] = useState({});

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("fullName");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event, value) => {
    setOpen(event.currentTarget);
    setUser(value);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.fullName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, fullName) => {
    const selectedIndex = selected.indexOf(fullName);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, fullName);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(
    users,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  const handleCreateUser = () => {
    setIsEdit(true);
    setUser({});
    console.log("Create user");
  };

  const handleExport = () => {
    console.log("Export list user");
  };

  return (
    <>
      <Helmet>
        <title> Quản lý người dùng | Poly Social</title>
      </Helmet>

      <Container maxWidth="xl">
        <Title icon={"bxs:dashboard"}>Quản lý người dùng</Title>

        <Card sx={{ boxShadow: "0px 0px 2px #9e9e9e" }}>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      id,
                      fullName,
                      role,
                      status,
                      email,
                      avatarUrl,
                      createdDate,
                    } = row;
                    const selectedUser = selected.indexOf(fullName) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={selectedUser}
                      >
                        <TableCell padding="checkbox" sx={{ width: "5%" }}>
                          <Checkbox
                            checked={selectedUser}
                            onChange={(event) => handleClick(event, fullName)}
                          />
                        </TableCell>

                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          sx={{ width: "25%" }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar alt={fullName} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {fullName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left" sx={{ width: "20%" }}>
                          {email}
                        </TableCell>

                        <TableCell align="left" sx={{ width: "15%" }}>
                          {role}
                        </TableCell>

                        <TableCell align="left" sx={{ width: "15%" }}>
                          <Label
                            color={
                              (status === "banned" && "error") || "success"
                            }
                          >
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>

                        <TableCell align="left" sx={{ width: "15%" }}>
                          {fDateTime(createdDate)}
                        </TableCell>

                        <TableCell align="right" sx={{ width: "5%" }}>
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={(e) => handleOpenMenu(e, row)}
                          >
                            <Iconify icon={"eva:more-vertical-fill"} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => setIsEdit(true)}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Chỉnh sửa
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>

      <DialogEditUser open={isEdit} setOpen={setIsEdit} user={user} />

      <BasicSpeedDial
        handleCreateUser={handleCreateUser}
        handleExport={handleExport}
      />
    </>
  );
}
