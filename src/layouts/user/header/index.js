import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  TextField,
  Badge,
  Avatar,
} from "@mui/material";
// utils
import { bgBlur } from "../../../utils/CssStyle/cssStyles";
//
import AccountPopover from "./AccountPopover";
import NotificationPopover from "./NotificationPopover";
import Logo from "../../../components/logo";
import MailIcon from "@mui/icons-material/Mail";
import MenuBookIcon from "@mui/icons-material/MenuBook";

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
    },
    {
      title: "Birthday Gift",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: false,
    },
    {
      title: "Demo",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: true,
    },
    {
      title: "Birthday Gift",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: false,
    },
    {
      title: "Demo",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: true,
    },
    {
      title: "Birthday Gift",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: false,
    },
    {
      title: "Demo",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: true,
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

          <TextField placeholder="Tìm kiếm ...." />

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

              <Badge
                badgeContent={4}
                color="error"
                overlap="circular"
                sx={{ mr: 2 }}
              >
                <Avatar sx={{ bgcolor: "#ffa36a" }}>
                  <MailIcon />
                </Avatar>
              </Badge>

              <NotificationPopover notifications={notifications} />
            </Box>

            <AccountPopover />
          </Stack>
        </Box>
      </StyledToolbar>
    </StyledRoot>
  );
}
