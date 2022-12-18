import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import DateTimeOfMessage from "../../../../utils/DateTimeOfMessage/DateTimeOfMessage";
import Asios from "../../../../utils/Axios";

export default function NotificationBox({ notification, onchange }) {
  const { avatar, title, content, status, dateTime, notificationId } =
    notification;

  const updateNotification = async (notificationId) => {
    const response = await Asios.Notifications.updateNotifications(
      notificationId
    );
    console.log("repsss", response);
    onchange(); 
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
          {title}
          {" - "}
          <DateTimeOfMessage dateTime={dateTime} />
        </Typography>
        <Typography fontWeight={400} fontSize={14}>
          {content}
        </Typography>
      </Box>
    </ListItem>
  );
}
