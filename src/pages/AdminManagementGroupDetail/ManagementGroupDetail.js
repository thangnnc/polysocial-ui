import { Helmet } from "react-helmet";
import { filter } from "lodash";
// @mui
import {
  Card,
  Checkbox,
  Container,
  IconButton,
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
  Stack,
  Avatar,
} from "@mui/material";
import Title from "../../components/title";
import { useEffect, useState } from "react";
import Iconify from "../../components/iconify";
import {
  GroupListHead,
  GroupListToolbar,
} from "../../sections/@dashboard/group";
import BasicSpeedDial from "./components/BasicSpeedDial";
import { DialogEditGroupDetail } from "./components/DialogEditGroupDetail";
import Axios from "./../../utils/Axios/index";
import { DialogCreateMember } from "./components/DialogCreateMember";
import { useParams } from "react-router-dom";
import { fDateTime } from "../../utils/Format/formatTime";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "fullName", label: "Họ Và Tên", alignRight: false },
  { id: "studentCode", label: "Mã Số Sinh Viên", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "status", label: "Trạng Thái", alignRight: false },
  { id: "createdDate", label: "Ngày Tham Gia", alignRight: false },
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
      (_member) =>
        _member.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ManagementGroupDetail() {
  const { groupId } = useParams();

  const [open, setOpen] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const [isCreate, setIsCreate] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("fullName");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [members, setMembers] = useState([]);

  const [member, setMember] = useState({});

  useEffect(() => {
    getAllData(groupId);
  }, [groupId]);

  const getAllData = async (groupId) => {
    const response = await Axios.Groups.getAllStudentGroup(groupId);
    if (response) {
      setMembers(response);
      // toast.success("Lấy dữ liệu thành công");
    } else {
      // toast.error("Lấy dữ liệu thất bại");
    }
  };

  //Call back data
  const onlDailogChange = () => {
    getAllData(groupId);
  };

  const handleOpenMenu = (event, value) => {
    setOpen(event.currentTarget);
    setMember(value);
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
      const newSelecteds = members?.map((n) => n.fullName);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - members.length) : 0;

  const filteredMember = applySortFilter(
    members,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredMember.length && !!filterName;

  const handleCreateGroup = () => {
    setIsCreate(true);
  };

  const handleExport = () => {
    console.log("Export list member");
  };

  return (
    <>
      <Helmet>
        <title> Quản lý thành viên trong nhóm học tập | Poly Social</title>
      </Helmet>

      <Container maxWidth="xl">
        <Title icon={"bxs:dashboard"}>Quản lý thành viên trong nhóm</Title>

        <Card sx={{ boxShadow: "0px 0px 2px #9e9e9e" }}>
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
                rowCount={members.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredMember
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const selectedMember =
                      selected.indexOf(row?.fullName) !== -1;

                    return (
                      <TableRow
                        hover
                        key={index}
                        tabIndex={-1}
                        role="checkbox"
                        selected={selectedMember}
                      >
                        <TableCell padding="checkbox" sx={{ width: "5%" }}>
                          <Checkbox
                            checked={selectedMember}
                            onChange={(event) =>
                              handleClick(event, row?.fullName)
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
                          >
                            <Avatar alt={row.fullName} src={row.avatar} />
                            <Typography variant="subtitle2" noWrap>
                              {row.fullName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          sx={{ width: "15%" }}
                          style={{ paddingLeft: 20 }}
                        >
                          {row?.studentCode}
                        </TableCell>

                        <TableCell align="left" sx={{ width: "15%" }}>
                          {row?.email}
                        </TableCell>

                        <TableCell align="left" sx={{ width: "15%" }}>
                          {row.active ? "Đang hoạt động" : "Ngừng hoạt động"}
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
            count={members.length}
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
      </Popover>

      <DialogEditGroupDetail
        onChange={onlDailogChange}
        open={isEdit}
        setOpen={setIsEdit}
        member={member}
        groupId={groupId}
      />

      <DialogCreateMember
        onChange={onlDailogChange}
        open={isCreate}
        setOpen={setIsCreate}
        groupId={groupId}
      />

      <BasicSpeedDial
        handleCreateGroup={handleCreateGroup}
        handleExport={handleExport}
      />
    </>
  );
}
