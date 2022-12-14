import { Box, ListItem, ListItemAvatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AvatarStatus from "../../../../utils/AvatarStatus/AvatarStatus";
import DateTimeOfMessage from "../../../../utils/DateTimeOfMessage/DateTimeOfMessage";
import Axios from "../../../../utils/Axios";

export default function MessageBox({ roomChat, listOnline,socket }) {
  const navigate = useNavigate();

  const {
    roomId,
    avatar,
    name,
    lastMessage,
    lastUpDateDate,
    isActive,
    listContacts,
    status,
    contactId,
  } = roomChat;
  
  const pathMessage = "/message/room/";

  const handleOnClick = async (
    e,
    listContacts,
    avatar,
    name,
    isActive,
    contactId
  ) => {
    let group = {};
    group.listContacts = listContacts;
    group.name = name;
    group.avatar = avatar;
    group.isActive = isActive;
    group.listOnline = listOnline;
    const responseUpdateviewed = await Axios.Messages.updateviewedStatus({
      contactId: contactId,
    });
    if (responseUpdateviewed) {
      await socket.emit("isSeen");
    }
    navigate(pathMessage + roomId, {
      state: {
        group: group,
      },
    });
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
              py: 1.5,
            }
          : { borderBottom: "1px solid #ed6c02", py: 1.5 }
      }
      onClick={(e) => {
        handleOnClick(e, listContacts, avatar, name, !isActive, contactId);
      }}
    >
      <ListItemAvatar sx={{ mt: 0 }}>
        <AvatarStatus alt={name} src={avatar} isActive={!isActive} />
      </ListItemAvatar>
      <Box width={400} display="block">
        <Typography variant="subtitle2" noWrap>
          <b>{name}</b>
          {" - "}
          <DateTimeOfMessage dateTime={lastUpDateDate} />
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          width={320}
          noWrap
          textOverflow="ellipsis"
        >
          {lastMessage}
        </Typography>
      </Box>
    </ListItem>
  );
}
