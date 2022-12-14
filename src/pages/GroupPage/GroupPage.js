import { Box, IconButton, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Iconify from "../../components/iconify";
import Header from "../../layouts/user/header";
import SearchBar from "./components/SearchBar";
import ListGroupJoin from "./components/ListGroupJoin";
import ListGroupTeacherJoin from "./components/ListGroupTeacherJoin";
import Axios from "./../../utils/Axios/index";
import useLogin from "../../utils/Login/useLogin";
// import { toast } from "react-toastify";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 72;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
  backgroundColor: "#f5f5f5",
  position: "relative",
});

const BoxNav = styled("div")(({ theme }) => ({
  width: "22%",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 10,
  backgroundColor: "#fff",
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 10,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(2),
  },
}));

export default function GroupPage() {
  const { account } = useLogin();
  const [groups, setGroups] = useState([]);
  const [groupsTeacher, setGroupsTeacher] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    const response = await Axios.Groups.getAllGroupStudent();
    const responseTeacher = await Axios.Groups.getAllGroupTeacher();
    if (response) {
      setGroups(response);
      setGroupsTeacher(responseTeacher);
      // toast.success("Lấy dữ liệu thành công");
    } else {
      // toast.error("Lấy dữ liệu thất bại");
    }
  };

  return (
    <StyledRoot>
      <Header />
      <Box sx={{ display: "flex", width: "100%" }}>
        <BoxNav>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: 65,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Nhóm
            </Typography>
            <IconButton
              aria-label="Example"
              sx={{ backgroundColor: "#f5f5f5", color: "black" }}
            >
              <Iconify icon={"bi:gear-fill"} />
            </IconButton>
          </Box>

          <SearchBar />

          {account.role === "Giảng viên" && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Nhóm do bạn quản lý
              </Typography>
              <Box sx={{ height: "570px", overflowY: "scroll" }}>
                {groupsTeacher.map((groupTeacher) => (
                  <ListGroupTeacherJoin
                    key={groupTeacher.groupId}
                    group={groupTeacher}
                  />
                ))}
              </Box>
            </Box>
          )}

          {account.role === "Sinh viên" && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Nhóm do bạn đã tham gia
              </Typography>
              <Box sx={{ height: "570px", overflowY: "scroll" }}>
                {groups.map((group) => (
                  <ListGroupJoin key={group.groupId} group={group} />
                ))}
              </Box>
            </Box>
          )}
        </BoxNav>
        <Box sx={{ width: "78%", mt: 10 }}>
          <h1 style={{ padding: 20 }}>Group Page</h1>
        </Box>
      </Box>
    </StyledRoot>
  );
}
