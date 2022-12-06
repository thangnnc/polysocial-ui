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
// ----------------------------------------------------------------------

export default function MessagesPopover({ messages }) {
  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Badge
        badgeContent={4}
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
            maxHeight: "80vh",
          },
        }}
      >
        <Box
          sx={{
            width: 400,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#ffffff",
            position: "fixed",
            zIndex: 9999,
            borderBottom: "1px solid #ed6c02",
          }}
        >
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ fontWeight: 700, fontSize: 18 }}
          >
            Tin nhắn
          </ListSubheader>

          <Button color="warning" sx={{ mr: 1 }}>
            Đánh dấu đã đọc tất cả
          </Button>
        </Box>
        <List sx={{ maxWidth: 400, py: 0, top: 48 }}>
          <Divider />
          {messages.map((roomChat, index) => (
            <MessageBox key={index} roomChat={roomChat} />
          ))}
        </List>
      </Popover>
    </>
  );
}
