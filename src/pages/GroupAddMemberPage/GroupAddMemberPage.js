import { Box, Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AvatarStatus from "../../utils/AvatarStatus/AvatarStatus";
import Axios from "./../../utils/Axios/index";

export default function GroupAddMemberPage(props) {
  let socket;
  const [listeningResquestMember, setListeningRequestMember] = useState(false);

  try {
    socket = props.socket.socket;
  } catch (error) {}

  const { groupId } = useParams();

  const [showRequestMember, setShowRequestMember] = useState([]);

  useEffect(() => {
    getRequestMember(groupId);
  }, [groupId]);

  const getRequestMember = async (groupId) => {
    const response = await Axios.Groups.getMemberJoinGroup(groupId);
    setShowRequestMember(response);
  };

  ///listeningResquestMember
  try {
    socket.on("reset_request_group", () => {
      setListeningRequestMember(true);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningResquestMember) {
        getRequestMember(groupId);
        setListeningRequestMember(false);
      }
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningResquestMember]);

  const addFriendHandle = async (userId) => {
    const response = await Axios.Groups.addMemberJoinGroup(groupId, userId);
    if (response.status === 200) {
      await socket.emit("add_member_group_one");
      toast.success("Đã thêm thành viên thành công");
      getRequestMember(groupId);
    } else {
      toast.error("Đã thêm thành viên thất bại");
    }
  };

  return (
    <Box sx={{ mt: 15 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Lời mời vào nhóm học tập
      </Typography>
      {showRequestMember?.map((item, index) => (
        <Card
          sx={{
            my: 2,
            width: "55%",
            display: "flex",
            justifyContent: "space-between",
            px: 2,
          }}
          key={index}
        >
          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            <AvatarStatus
              alt="Avatar"
              isActive={false}
              sx={{ width: 54, height: 54 }}
              src={item.avatar}
            />
            <Box sx={{ ml: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold" }}
                noWrap
                fontSize={16}
              >
                {item.fullName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                noWrap
              >
                {item.email}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{
              background: "#ff7b29",
              borderRadius: 2,
              my: 3,
            }}
            onClick={() => addFriendHandle(item.userId)}
          >
            Xác nhận
          </Button>
        </Card>
      ))}
    </Box>
  );
}
