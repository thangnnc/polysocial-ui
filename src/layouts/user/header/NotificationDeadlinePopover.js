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
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Box } from "@mui/system";
import NotificationDeadlineBox from "./components/NotificationDeadlineBox";

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

export default function NotificationDeadlinePopover({
  notificationsDeadline,
  socket,
}) {
  const [open, setOpen] = useState(false);

  let count = 0;

  try {
    for (let index = 0; index < notificationsDeadline.content.length; index++) {
      const element = notificationsDeadline.content[index];
      if (element.status === false) {
        count = count + 1;
      } else {
        count = count + 0;
      }
    }
  } catch (error) {}

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const updateAllNotification = async () => {
    socket.emit("reset_one_user_getAllNotification");
  };

  return (
    <>
      <Badge
        badgeContent={count}
        color="error"
        overlap="circular"
        onClick={handleOpen}
        sx={{ mr: 2 }}
      >
        <Avatar sx={{ bgcolor: "#ffa36a" }}>
          <MenuBookIcon />
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
            maxHeight: "52vh",
          },
        }}
      >
        <Box
          sx={{
            width: 500,
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
            sx={{
              fontWeight: 700,
              fontSize: 18,
              height: 40,
              lineHeight: "40px",
            }}
          >
            Th??ng b??o b??i t???p
          </ListSubheader>

          <Button
            onClick={updateAllNotification}
            color="warning"
            sx={{ mr: 1 }}
          >
            ????nh d???u ???? ?????c t???t c???
          </Button>
        </Box>
        <List
          disablePadding
          sx={{
            width: 500,
            maxHeight: "calc(52vh - 41px)",
            overflow: "auto",
            ...scrollbar,
          }}
        >
          <Divider />
          {notificationsDeadline?.map((notification, index) => (
            <NotificationDeadlineBox key={index} notification={notification} />
          ))}
        </List>
      </Popover>
    </>
  );
}
