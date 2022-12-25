import { Box, IconButton, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Iconify from "../../components/iconify";
import Header from "../../layouts/user/header";
import SearchBar from "./components/SearchBar";
import ListGroupJoin from "./components/ListGroupJoin";
import ListGroupTeacherJoin from "./components/ListGroupTeacherJoin";
import Axios from "./../../utils/Axios/index";
import useLogin from "../../utils/Login/useLogin";
import Post from "../../components/post/Post";

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

export default function GroupPage(props) {
  let socket;

  const { account } = useLogin();

  const [groups, setGroups] = useState([]);

  const [groupsTeacher, setGroupsTeacher] = useState([]);

  const [listeningCreateGroup, setListeningCreateGroup] = useState(false);

  const [listPostDTO, setListPost] = useState([]);

  const [listeningPost, setListeningPost] = useState(false);

  const [listeningCreateMemberGroup, setListeningCreateMemberGroup] =
    useState(false);

  const [listeningDeleteMemberAll, setListeningDeleteMemberAll] =
    useState(false);

  try {
    socket = props.socket.socket;
  } catch (error) {}
  useEffect(() => {
    getAllData();
  }, []);

  ///listeningCreateGroup
  try {
    socket.on("reset_create_group_successful", (data) => {
      setListeningCreateGroup(true);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningCreateGroup) {
        getAllData();
        setListeningCreateGroup(false);
      }
    } catch (error) {}
  }, [listeningCreateGroup]);

  ///listeningDeleteMemberAll
  try {
    socket.on("reset_delete_member", () => {
      setListeningDeleteMemberAll(true);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningDeleteMemberAll) {
        getAllData();
        setListeningDeleteMemberAll(false);
      }
    } catch (error) {}
  }, [listeningDeleteMemberAll]);

  ///listeningCreateMemberGroup
  try {
    socket.on("reset_member_group_successful", (data) => {
      setListeningCreateMemberGroup(true);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningCreateMemberGroup) {
        getAllData();
        setListeningCreateMemberGroup(false);
      }
    } catch (error) {}
  }, [listeningCreateMemberGroup]);

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

  ///listeningPost
  try {
    socket.on("Server_response_like_comment", () => {
      setListeningPost(true);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningPost) {
        fetchData();
        setListeningPost(false);
      }
    } catch (error) {}
  }, [listeningPost]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await Axios.Posts.getAllByAllPost(0, 100);
    if (response) {
      setListPost(response.listPostDTO);
    }
  };

  const handleChange = () => {
    fetchData();
  };

  return (
    <StyledRoot>
      <Header socket={props} />
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

          <SearchBar socket={props} />

          {account.role === "Sinh viên" ? (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Nhóm bạn đã tham gia
              </Typography>
              <Box sx={{ height: "570px", overflowY: "scroll" }}>
                {groups.map((group) => (
                  <ListGroupJoin
                    key={group.groupId}
                    group={group}
                    socket={props}
                  />
                ))}
              </Box>
            </Box>
          ) : (
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
        </BoxNav>
        <Box
          sx={{
            width: "78%",
            mt: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "60%" }}>
            <Post posts={listPostDTO} onChange={handleChange} socket={socket} />
          </Box>
        </Box>
      </Box>
    </StyledRoot>
  );
}
