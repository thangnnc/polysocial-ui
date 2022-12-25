import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import DateTimeOfMessage from "../../../../utils/DateTimeOfMessage/DateTimeOfMessage";
import Axios from "../../../../utils/Axios";
import { useEffect, useState } from "react";

export default function NotificationDeadlineBox({ notification }) {
  const { content, deadline, userId } = notification;
  const [user, setUser] = useState({});

  useEffect(() => {
    getOneUser(userId);
  }, [userId]);

  const getOneUser = async (userId) => {
    if (userId !== undefined) {
      const response = await Axios.Accounts.getOneUser(userId);
      setUser(response);
    } else {
      setUser(null);
    }
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt="Profile Picture" src={user.avatar} />
      </ListItemAvatar>
      <Box>
        <Typography fontWeight={700} fontSize={15}>
          {"  "}
          <DateTimeOfMessage dateTime={deadline} />
        </Typography>
        <Typography fontWeight={400} fontSize={14}>
          {content}
        </Typography>
      </Box>
    </ListItem>
  );
}
