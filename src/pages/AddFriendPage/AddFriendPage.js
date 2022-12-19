import { Box, Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AvatarStatus from "../../utils/AvatarStatus/AvatarStatus";
import Axios from "./../../utils/Axios/index";

export default function AddFriendPage(props) {
  const socket = props.socket.socket;
  const [showRequestFriend, setShowRequestFriend] = useState([]);

  useEffect(() => {
    getRequestFriend();
  }, []);

  useEffect(()=>{
   try {
    socket.on("request-accept", function () {
      console.log("request-accept")
      getRequestFriend();
    })
   } catch (error) {
    
   }
  })

  const getRequestFriend = async () => {
    const response = await Axios.Friends.getAllRequestAddFriend();
    setShowRequestFriend(response);
  };

  const addFriendHandle = async (e, data) => {
    const response = await Axios.Friends.acceptFriend(data);
    if (response.status === 200) {
      await getRequestFriend();
      await socket.emit("accept-friend-request");
      toast.success("Đã thêm bạn thành công");
    } else {
      toast.error("Đã thêm bạn thất bại");
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Lời mời kết bạn
      </Typography>
      {showRequestFriend.map((request, index) => (
        <Card
          sx={{
            my: 2,
            width: "60%",
            display: "flex",
            justifyContent: "space-between",
            px: 2,
          }}
          key={index}
        >
          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            <AvatarStatus
              alt="Avatar"
              isActive={true}
              src={request.avatarUserInvite}
              sx={{ width: 54, height: 54 }}
            />
            <Box sx={{ ml: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold" }}
                noWrap
                fontSize={16}
              >
                {request.fullNameUserInvite}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                noWrap
              >
                {request.emailInvite}
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
            onClick={(e) => addFriendHandle(e, request)}
          >
            Chấp nhận
          </Button>
        </Card>
      ))}
    </Box>
  );
}
