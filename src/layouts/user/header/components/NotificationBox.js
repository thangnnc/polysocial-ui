import { Avatar, Box, ListItem, ListItemAvatar, Typography } from "@mui/material";
import DateTimeOfMessage from "../../../../utils/DateTimeOfMessage/DateTimeOfMessage";

export default function NotificationBox({ notification }) {
  const { avatar, title, content, isSeen, dateTime } = notification;
  return (
    <ListItem
      button
      alignItems="flex-start"
      sx={
        !isSeen
          ? {
              bgcolor: "#ff61003b",
              borderBottom: "1px solid #ed6c02",
            }
          : { borderBottom: "1px solid #ed6c02" }
      }
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
