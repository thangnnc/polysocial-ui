import { Box, ListItem, ListItemAvatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AvatarStatus from "../../../../utils/AvatarStatus/AvatarStatus";
import DateTimeOfMessage from "../../../../utils/DateTimeOfMessage/DateTimeOfMessage";

export default function MessageBox({ roomChat }) {
  const navigate = useNavigate();
  const { roomId, avatar, fullName, content, lastTimeMessage, isActive, isSeen } =
    roomChat;
  const pathMessage = "/message/room/";

  const handleOnClick = () => {
    navigate(pathMessage + roomId);
  };
  return (
    <ListItem 
      button
      alignItems="flex-start" sx=
      {!isSeen
        ? {
            bgcolor: "#ff61003b",
            borderBottom: "1px solid #ed6c02",
            py: 1.5,
          }
        : { borderBottom: "1px solid #ed6c02", py: 1.5 }}
        onClick={handleOnClick}
      >
      <ListItemAvatar sx={{ mt: 0 }}>
        <AvatarStatus alt={fullName} src={avatar} isActive={isActive} />
      </ListItemAvatar>
      <Box width={400} display="block">
        <Typography variant="subtitle2" noWrap>
          <b>{fullName}</b>
          {" - "}
          <DateTimeOfMessage dateTime={lastTimeMessage} />
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          width={320}
          noWrap
          textOverflow="ellipsis"
        >
          {content}
        </Typography>
        
      </Box>
    </ListItem>
  );
}
