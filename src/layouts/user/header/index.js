import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, Badge, Avatar } from "@mui/material";
// utils
import { bgBlur } from "../../../utils/CssStyle/cssStyles";
//
import AccountPopover from "./AccountPopover";
import NotificationPopover from "./NotificationPopover";
import Logo from "../../../components/logo";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MessagesPopover from "./MesagePopover";
import SearchPopover from "./SearchPopover";
import React, { useEffect, useState } from "react";
import useLogin from "../../../utils/Login/useLogin";
import Asios from "../../../utils/Axios";

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 72;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  backgroundColor: "#fff",
  boxShadow: "4px 4px 4px #9E9E9E",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));
// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header(props) {
  // console.log("groupList",props.socket.socket.groupList)
  const { account } = useLogin();

  let groupList;
  let count;
  let listOnline;
  let socket;
  if (account) {
    try {
      count = props.socket.socket.count;
      groupList = props.socket.socket.groupList;
      listOnline = props.socket.socket.listOnline;
      socket = props.socket.socket.socket;
    } catch (error) {}
  }

  // const [groupList, setGroupList] = useState([]);
  // const [count, setCount] = useState(0);
  // const [online, setOnline] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getAllNotification();
  }, []);

  const getAllNotification = async () => {
    const response = await Asios.Notifications.getAllNotifications();
    setNotifications(response);
  };

  useEffect(() => {
    try {
      socket.on("reset_getAllNotification", function () {
        console.log("reset-getAllNotification");
        getAllNotification();
      });
    } catch (error) {}
  });

  const handleChange = () => {
    getAllNotification();
  };

  return (
    <StyledRoot>
      <StyledToolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box sx={{ display: "inline-flex" }}>
            <Logo sx={{ width: 180 }} />
          </Box>

          <SearchPopover sockets={socket} />

          <Stack
            direction="row"
            alignItems="center"
            spacing={{
              xs: 0.5,
              sm: 1,
            }}
          >
            <Box sx={{ mr: 2 }}>
              <Badge
                badgeContent={4}
                color="error"
                overlap="circular"
                sx={{ mr: 2 }}
              >
                <Avatar sx={{ bgcolor: "#ffa36a" }}>
                  <MenuBookIcon />
                </Avatar>
              </Badge>

              <MessagesPopover
                groupList={groupList}
                count={count}
                listOnline={listOnline}
                socket={socket}
              />

              <NotificationPopover
                notifications={notifications}
                onchange={handleChange}
              />
            </Box>

            <AccountPopover />
          </Stack>
        </Box>
      </StyledToolbar>
    </StyledRoot>
  );
}
