import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
import useLogin from "../../../utils/Login/useLogin";
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Trang chủ",
    path: "/home",
    icon: "ci:home-fill",
  },
  {
    label: "Trang quản lý",
    path: "/admin",
    icon: "material-symbols:admin-panel-settings-rounded",
  },
  {
    label: "Thông tin tài khoản",
    path: "/profile",
    icon: "eva:person-fill",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const { account, logout } = useLogin();
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar
          src={account.avatar}
          sx={{ width: "48px", height: "48px", border: "2px solid #fff" }}
          alt="photoURL"
        />
      </IconButton>

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
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 0.5 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleRedirect(option.path)}
            >
              <Iconify icon={option.icon} sx={{ marginRight: 1 }} />
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={logout} sx={{ m: 0.5 }}>
          <Iconify icon={"bx:log-out"} sx={{ marginRight: 1 }} />
          Đăng xuất
        </MenuItem>
      </Popover>
    </>
  );
}
