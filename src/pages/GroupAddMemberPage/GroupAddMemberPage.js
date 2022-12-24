import { Box, Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AvatarStatus from "../../utils/AvatarStatus/AvatarStatus";
import Axios from "./../../utils/Axios/index";

export default function GroupAddMemberPage(props) {
  let socket;
  // let location = useLocation();
  let roomId
  try {
    // roomId = location.state.group.roomId*192.168199;
    // console.log("gro-----",roomId)
    socket = props.socket.socket
  } catch (error) {
    
  }
  const { groupId } = useParams();
  const [showRequestMember, setShowRequestMember] = useState([]);

  useEffect(() => {
    getRequestMember(groupId);
  }, [groupId]);

  const getRequestMember = async (groupId) => {
    const response = await Axios.Groups.getMemberJoinGroup(groupId);
    console.log("r4epsssss",response)
    // console.log("r4epsssss",response.length)
    setShowRequestMember(response);
  };
  
  useEffect(() => {
    try {
      socket.on("accept-member", function () {
        console.log("runnnnnn")
        getRequestMember(groupId);
      });
    } catch (error) {}
  });
  

  const addFriendHandle = async (userId) => {
    const response = await Axios.Groups.addMemberJoinGroup(groupId, userId);
    if (response.status === 200) {
      socket.emit("add-member");
      // socket.emit("add-member",roomId);
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
