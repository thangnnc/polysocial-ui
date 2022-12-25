import { Box, Button, Card, Typography, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useLogin from "../../utils/Login/useLogin";
import Axios from "./../../utils/Axios/index";
import { Link } from "react-router-dom";

export default function AddFriendPage(props) {
  const socket = props.socket.socket;
// 
  let showRequestFriend = props.socket.showRequestFriend;
  // console.log("showRequestFriend", props.socket.showRequestFriend);
  // useEffect(()=>{
  //  try {
  //   socket.on("request-accept", function () {
  //     getRequestFriend();
  //   })
  //  } catch (error) {

  //  }
  // })

  // useEffect(() => {
  //   try {
  //     socket.on("successful_accept", function () {

  //       getRequestFriend();
  //     });
  //   } catch (error) {}
  // });

  // const getRequestFriend = async () => {
  //   const response = await Axios.Friends.getAllRequestAddFriend();
  //   console.log("showRequestFriend", response);
  //   setShowRequestFriend(response);
  // };

  const addFriendHandle = async (e, data, id) => {
    const response = await Axios.Friends.acceptFriend(data);
    if (response.status === 200) {
      // await getRequestFriend();
      await socket.emit("accept_friend", id);
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
      {showRequestFriend?.map((request, index) => (
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
          <Link
            to={`/my-profile/` + request.userInviteId}
            state={{
              isActive: false,
              email: request.emailInvite,
              roomId: null,
              listContacts: null,
            }}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
              <Avatar
                alt="Avatar"
                isActive={false}
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
          </Link>
          <Button
            variant="contained"
            sx={{
              background: "#ff7b29",
              borderRadius: 2,
              my: 3,
            }}
            onClick={(e) => addFriendHandle(e, request, request.userInviteId)}
          >
            Chấp nhận
          </Button>
        </Card>
      ))}
    </Box>
  );
}
