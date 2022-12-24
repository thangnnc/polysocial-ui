import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AvatarStatus from "../../../utils/AvatarStatus/AvatarStatus";
import Axios from "./../../../utils/Axios/index";

export default function ListFriend(props) {
  const { userId } = props;
  const [listFriends, setListFriend] = useState([]);

  useEffect(() => {
    getAllFriend(userId);
  }, [userId]);

  const getAllFriend = async (userId) => {
    const response = await Axios.Friends.getAllFriend(userId);
    setListFriend(response);
  };
  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", fontSize: "20" }}>
        Bạn bè
      </Typography>
      <Box sx={{ height: "390px", overflowY: "scroll" }}>
        {listFriends.map((friend, index) => (
          <Box
            sx={{ display: "flex", alignItems: "center", my: 2 }}
            key={index}
          >
            <AvatarStatus
              alt="Avatar"
              isActive={false}
              src={friend.friendAvatar}
              sx={{ width: 54, height: 54 }}
            />
            <Box sx={{ ml: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold" }}
                noWrap
                fontSize={16}
              >
                {friend.friendName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                noWrap
              >
                {friend.friendEmail}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
