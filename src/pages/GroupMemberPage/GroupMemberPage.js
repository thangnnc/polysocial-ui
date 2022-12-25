import { Box, Card, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Iconify from "../../components/iconify/Iconify";
import AvatarStatus from "../../utils/AvatarStatus/AvatarStatus";
import useLogin from "../../utils/Login/useLogin";
import SearchBar from "../GroupMemberPage/components/SearchBar";
import Axios from "./../../utils/Axios/index";

export default function GroupMemberPage(props) {
  const { groupId } = useParams();

  const [members, setMember] = useState([]);

  const [teacher, setTeacher] = useState({});

  const { account } = useLogin();

  let socket;

  try {
    socket = props.socket.socket;
  } catch (error) {}

  useEffect(() => {
    getAllData(groupId);
  }, [groupId]);

  const getAllData = async (groupId) => {
    const response = await Axios.Groups.getAllStudentGroup(groupId);
    const responseTeacher = await Axios.Groups.getTeacherGroup(groupId);
    setMember(response);
    setTeacher(responseTeacher);
  };

  const deleteMember = async (userId) => {
    const data = {
      userId: userId,
      groupId: groupId,
    };
    await Axios.Groups.deleteStudentGroup(data);
    socket.emit("delete_member_group", userId);
    getAllData(groupId);
  };

  return (
    <Box>
      <Card
        sx={{
          width: "60%",
          height: "76vh",
          marginTop: 20,
        }}
      >
        <Box sx={{ p: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Thành viên nhóm
          </Typography>
          <SearchBar />

          <Box sx={{ my: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Quản trị viên
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
              <AvatarStatus
                alt="Avatar"
                isActive={true}
                src={teacher.avatar}
                sx={{ width: 54, height: 54 }}
              />
              <Box sx={{ ml: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold" }}
                  noWrap
                  fontSize={16}
                >
                  {teacher.fullName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                  noWrap
                >
                  {teacher.email}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ my: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Thành viên
            </Typography>
            <Box sx={{ height: "385px", overflowY: "scroll" }}>
              {members.map((member, index) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    my: 2,
                  }}
                  key={index}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AvatarStatus
                      alt="Avatar"
                      isActive={true}
                      src={member.avatar}
                      sx={{ width: 54, height: 54 }}
                    />
                    <Box sx={{ ml: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                        noWrap
                        fontSize={16}
                      >
                        {member.fullName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                        noWrap
                      >
                        {member.email}
                      </Typography>
                    </Box>
                  </Box>
                  {account.role !== "Sinh viên" && (
                    <IconButton
                      aria-label="Example"
                      sx={{
                        backgroundColor: "#f5f5f5",
                        color: "black",
                        mr: 2,
                      }}
                      onClick={() => deleteMember(member.userId)}
                    >
                      <Iconify icon={"ic:round-delete"} />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
