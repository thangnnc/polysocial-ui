import { Helmet } from "react-helmet";
import { filter } from "lodash";
// @mui
import {
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
  Box,
  Tab,
} from "@mui/material";
import Title from "../../components/title";
import { useEffect, useState } from "react";
import Iconify from "../../components/iconify";
import {
  GroupListHead,
  GroupListToolbar,
} from "../../sections/@dashboard/group";
import { fDateTime } from "../../utils/Format/formatTime";
import BasicSpeedDial from "./components/BasicSpeedDial";
import { DialogEditGroup } from "./components/DialogEditGroup";
import Axios from "./../../utils/Axios/index";
import { DialogCreateGroup } from "./components/DialogCreateGroup";
import { DialogCreateGroupExcel } from "./components/DialogCreateGroupExcel";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Tên Nhóm Học Tập", alignRight: false },
  { id: "description", label: "Mô Tả", alignRight: false },
  { id: "totalMember", label: "Tổng TV", alignRight: false },
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
      (_group) => _group.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ManagementGroup() {
  const [open, setOpen] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const [isCreate, setIsCreate] = useState(false);

  const [isCreateGroupExcel, setIsCreateGroupExcel] = useState(false);

  const [group, setGroup] = useState({});

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("fullName");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [groups, setGroups] = useState([]);

  const [groupsDelete, setGroupsDelete] = useState([]);

  const [value, setValue] = useState("1");

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    const response = await Axios.Groups.getAllGroups();
    const responseDelete = await Axios.Groups.getAllGroupsFalse();
    if (response.content) {
      setGroups(response.content);
      setGroupsDelete(responseDelete.content);
      toast.success("Lấy dữ liệu thành công");
    } else {
      toast.error("Lấy dữ liệu thất bại");
    }
  };

  //Call back data
  const onlDailogChange = () => {
    getAllData();
  };

  const handleOpenMenu = (event, value) => {
    setOpen(event.currentTarget);
    setGroup(value);
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
      const newSelecteds = groups.map((n) => n.fullName);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - groups.length) : 0;

  const filteredGroup = applySortFilter(
    groups,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredGroup.length && !!filterName;

  const filteredGroupDelete = applySortFilter(
    groupsDelete,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFoundDelete = !filteredGroupDelete.length && !!filterName;

  const handleCreateGroup = () => {
    setIsCreate(true);
  };

  const handleCreateGroupExcel = () => {
    setIsCreateGroupExcel(true);
  };

  const handleExport = () => {
    console.log("Export list group");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title> Quản lý nhóm học tập | Poly Social</title>
      </Helmet>

      <Container maxWidth="xl">
        <Title icon={"bxs:dashboard"}>Quản lý nhóm học tập</Title>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <Card sx={{ boxShadow: "0px 0px 2px #9e9e9e" }}>
            <TabContext value={value}>
              <TabList sx={{pt: 1, borderColor: "#252525"}}
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="Danh sách nhóm hoạt động"
                  value="1"
                  style={{
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                />
                <Tab
                  label="Danh sách nhóm đã xoá"
                  value="2"
                  style={{
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                />
              </TabList>
              <TabPanel value="1" sx={{pt: 0}}>
                <GroupListToolbar
                  numSelected={selected.length}
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <GroupListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={groups.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredGroup
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          const selectedGroup =
                            selected.indexOf(row.groupId) !== -1;

                          return (
                            <TableRow
                              hover
                              key={row.groupId}
                              tabIndex={-1}
                              role="checkbox"
                              selected={selectedGroup}
                            >
                              <TableCell
                                padding="checkbox"
                                sx={{ width: "5%" }}
                              >
                                <Checkbox
                                  checked={selectedGroup}
                                  onChange={(event) =>
                                    handleClick(event, row.name)
                                  }
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
                                  style={{ paddingLeft: 20 }}
                                >
                                  <Typography variant="subtitle2" noWrap>
                                    {row.name}
                                  </Typography>
                                </Stack>
                              </TableCell>

                              <TableCell align="left" sx={{ width: "25%" }}>
                                {row.description}
                              </TableCell>

                              <TableCell
                                align="left"
                                sx={{ width: "10%" }}
                                style={{ paddingLeft: 35 }}
                              >
                                {row.totalMember}
                              </TableCell>

                              <TableCell align="left" sx={{ width: "15%" }}>
                                {row.status
                                  ? "Đang hoạt động"
                                  : "Ngừng hoạt động"}
                              </TableCell>

                              <TableCell align="left" sx={{ width: "15%" }}>
                                {fDateTime(row.createdDate)}
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
                                <br /> Try checking for typos or using complete
                                words.
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
                  count={groups.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TabPanel>
              <TabPanel value="2" sx={{pt: 0}}>
                <GroupListToolbar
                  numSelected={selected.length}
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <GroupListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={groupsDelete.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredGroupDelete
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          const selectedGroup =
                            selected.indexOf(row.name) !== -1;

                          return (
                            <TableRow
                              hover
                              key={row.groupId}
                              tabIndex={-1}
                              role="checkbox"
                              selected={selectedGroup}
                            >
                              <TableCell
                                padding="checkbox"
                                sx={{ width: "5%" }}
                              >
                                <Checkbox
                                  checked={selectedGroup}
                                  onChange={(event) =>
                                    handleClick(event, row.name)
                                  }
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
                                  style={{ paddingLeft: 20 }}
                                >
                                  <Typography variant="subtitle2" noWrap>
                                    {row.name}
                                  </Typography>
                                </Stack>
                              </TableCell>

                              <TableCell align="left" sx={{ width: "25%" }}>
                                {row.description}
                              </TableCell>

                              <TableCell
                                align="left"
                                sx={{ width: "10%" }}
                                style={{ paddingLeft: 35 }}
                              >
                                {row.totalMember}
                              </TableCell>

                              <TableCell align="left" sx={{ width: "15%" }}>
                                {row.status
                                  ? "Đang hoạt động"
                                  : "Ngừng hoạt động"}
                              </TableCell>

                              <TableCell align="left" sx={{ width: "15%" }}>
                                {fDateTime(row.createdDate)}
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

                    {isNotFoundDelete && (
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
                                <br /> Try checking for typos or using complete
                                words.
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
                  count={groupsDelete.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TabPanel>
            </TabContext>
          </Card>
        </Box>
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

        <MenuItem>
          <Iconify icon={"mdi:people"} sx={{ mr: 2 }} />
          <Link
            to={`detail/${group.groupId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            Thành viên
          </Link>
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>

      <DialogEditGroup
        onChange={onlDailogChange} // truyền props từ cha xuống con
        open={isEdit}
        setOpen={setIsEdit}
        group={group}
      />

      <DialogCreateGroup
        onChange={onlDailogChange}
        open={isCreate}
        setOpen={setIsCreate}
      />

      <DialogCreateGroupExcel
        onChange={onlDailogChange}
        open={isCreateGroupExcel}
        setOpen={setIsCreateGroupExcel}
        group={filteredGroup}
      />

      <BasicSpeedDial
        handleCreateGroup={handleCreateGroup}
        handleCreateGroupExcel={handleCreateGroupExcel}
        handleExport={handleExport}
      />
    </>
  );
}
