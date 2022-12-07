import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  Badge,
  Avatar,
} from "@mui/material";
// utils
import { bgBlur } from "../../../utils/CssStyle/cssStyles";
//
import AccountPopover from "./AccountPopover";
import NotificationPopover from "./NotificationPopover";
import Logo from "../../../components/logo";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MessagesPopover from "./MesagePopover";
import SearchPopover from "./SearchPopover";

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

export default function Header({ onOpenNav }) {
  const notifications = [
    {
      title: "Brunch this week?",
      content:
        "I'll be in the neighbourhood this week. Let's grab a bite to eat",
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: false,
      dateTime: "12/05/2022, 4:04:33 AM",
    },
    {
      title: "Birthday Gift",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: false,
      dateTime: "12/04/2022, 4:04:33 AM",
    },
    {
      title: "Demo",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: true,
      dateTime: "12/03/2022, 4:04:33 AM",
    },
    {
      title: "Birthday Gift",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: false,
      dateTime: "12/02/2022, 4:04:33 AM",
    },
    {
      title: "Demo",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: true,
      dateTime: "12/01/2022, 4:04:33 AM",
    },
    {
      title: "Birthday Gift",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: false,
      dateTime: "11/05/2022, 4:04:33 AM",
    },
    {
      title: "Demo",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: true,
      dateTime: "11/05/2022, 4:04:33 AM",
    },
  ];

  const messages = [
    {
      roomId: 12,
      fullName: "Brunch this week?",
      content:
        "I'll be in the neighbourhood this week. Let's grab a bite to eat",
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: false,
      isActive: true,
      lastTimeMessage: "12/06/2022, 11:57:33 PM",
    },
    {
      roomId: 134,
      fullName: "Birthday Gift",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: false,
      isActive: false,
      lastTimeMessage: "12/05/2022, 2:04:33 AM",
    },
    {
      roomId: 12341,
      fullName: "Demo",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: true,
      isActive: true,
      lastTimeMessage: "12/03/2022, 2:04:33 AM",
    },
    {
      roomId: 144,
      fullName: "Birthday Gift",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: false,
      isActive: false,
      lastTimeMessage: "12/03/2022, 1:04:33 AM",
    },
    {
      roomId: 1123,
      fullName: "Demo",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: true,
      isActive: true,
      lastTimeMessage: "11/03/2022, 2:04:33 AM",
    },
    {
      roomId: 13333,
      fullName: "Birthday Gift",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: false,
      isActive: false,
      lastTimeMessage: "10/02/2022, 2:04:33 AM",
    },
    {
      roomId: 1111,
      fullName: "Demo",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: true,
      isActive: false,
      lastTimeMessage: "12/02/2021, 2:04:33 AM",
    },
  ];

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

          <SearchPopover />

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

              <MessagesPopover messages={messages} />

              <NotificationPopover notifications={notifications} />
            </Box>

            <AccountPopover />
          </Stack>
        </Box>
      </StyledToolbar>
    </StyledRoot>
  );
}
