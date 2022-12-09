import styled from "@emotion/styled";
import { Box, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../layouts/user/header";
import NavGroup from "../../layouts/user/nav-group";
import AvatarStatus from "../../utils/AvatarStatus/AvatarStatus";
import SearchBar from "../GroupMemberPage/components/SearchBar";
import Axios from "./../../utils/Axios/index";

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
  backgroundColor: "#f5f5f5",
  position: "relative",
});

export default function GroupMemberPage() {
  const { groupId } = useParams();
  const [members, setMember] = useState([]);
  const [teacher, setTeacher] = useState({});

  useEffect(() => {
    getAllData(groupId);
  }, [groupId]);

  const getAllData = async (groupId) => {
    const response = await Axios.Groups.getAllStudentGroup(groupId);
    const responseTeacher = await Axios.Groups.getTeacherGroup(groupId);
    setMember(response);
    setTeacher(responseTeacher);
  };

  return (
    <StyledRoot>
      <Header />
      <Box sx={{ display: "flex", width: "100%" }}>
        <NavGroup />
        <Box
          sx={{
            width: "75%",
            marginLeft: "38%",
          }}
        >
          <Card
            sx={{
              width: "80%",
              height: "85vh",
              marginTop: 14,
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
                <Box sx={{ height: "447px", overflowY: "scroll" }}>
                  {members.map((member, index) => (
                    <Box
                      sx={{ display: "flex", alignItems: "center", my: 2 }}
                      key={index}
                    >
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
                  ))}
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </StyledRoot>
  );
}
