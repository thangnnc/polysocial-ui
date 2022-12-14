import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import DateTimeOfMessage from "../../../../utils/DateTimeOfMessage/DateTimeOfMessage";
import Asios from "../../../../utils/Axios";

export default function NotificationBox({ notification, socket }) {
  const { content, status, createdDate, notificationId, avatar } = notification;

  const updateNotification = async (notificationId) => {
    const response = await Asios.Notifications.updateNotifications(
      notificationId
    );
    if (response.status === 200) {
      socket.emit("reset_one_user_get_One_Notification");
    }
  };

  return (
    <ListItem
      button
      alignItems="flex-start"
      sx={
        !status
          ? {
              bgcolor: "#ff61003b",
              borderBottom: "1px solid #ed6c02",
            }
          : { borderBottom: "1px solid #ed6c02" }
      }
      onClick={() => updateNotification(notificationId)}
    >
      <ListItemAvatar>
        <Avatar alt="Profile Picture" src={avatar} />
      </ListItemAvatar>
      <Box>
        <Typography fontWeight={700} fontSize={15}>
          {/* {title} */}
          {"  "}
          <DateTimeOfMessage dateTime={createdDate} />
        </Typography>
        <Typography fontWeight={400} fontSize={14}>
          {content}
        </Typography>
      </Box>
    </ListItem>
  );
}
