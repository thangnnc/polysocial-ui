import { useState } from "react";
// @mui
import {
  Avatar,
  Popover,
  Badge,
  List,
  Divider,
  ListSubheader,
  Button,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Box } from "@mui/system";
import MessageBox from "./components/MessageBox";
import Axios from "../../../utils/Axios";
import useLogin from "../../../utils/Login/useLogin";

// ----------------------------------------------------------------------

const scrollbar = {
  "::-webkit-scrollbar": {
    width: "8px",
  },
  ":hover::-webkit-scrollbar-thumb": {
    " -webkit-border-radius": "5px",
    borderRadius: "5px",
    background: "#ffa36a",
  },
  "::-webkit-scrollbar-thumb:window-inactive": {
    background: "#ffa36a",
  },
};

export default function MessagesPopover({groupList,count,listOnline,socket }) {
  const { account } = useLogin();
  const [open, setOpen] = useState(false);
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const updateAllViewStatus = async () => {
    const response = await Axios.Messages.updateAllViewedStatus({userId:account.userId});
    if(response.status===200){
      await socket.emit("isSeen");
    }
  };

  return (
    <>
      <Badge
        badgeContent={count}
        color="error"
        sx={{ mr: 2 }}
        overlap="circular"
        onClick={handleOpen}
      >
        <Avatar sx={{ bgcolor: "#ffa36a" }}>
          <MailIcon />
        </Avatar>
      </Badge>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
            maxHeight: "48vh",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#ffffff",
            borderBottom: "1px solid #ed6c02",
            height: 40,
          }}
        >
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ fontWeight: 700, fontSize: 18, height: 40, lineHeight: "40px" }}
          >
            Tin nhắn
          </ListSubheader>

          <Button
          onClick={updateAllViewStatus}
           color="warning" sx={{ mr: 1 }}>
            Đánh dấu đã đọc tất cả
          </Button>
        </Box>
        <List
          disablePadding
          sx={{
            maxWidth: 400,
            maxHeight: "calc(48vh - 41px)",
            overflow: "auto",
            ...scrollbar,
          }}
        >
          <Divider />
          {groupList?.map((roomChat, index) => (
            <MessageBox key={index} roomChat={roomChat} listOnline={listOnline} socket={socket}/>
          ))}
        </List>
      </Popover>
    </>
  );
}
