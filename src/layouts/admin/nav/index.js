import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Link, Drawer, Typography, Avatar } from "@mui/material";
// components
import Logo from "../../../components/logo";
import Scrollbar from "../../../components/scrollbar";
import NavSection from "../../../components/nav-section";
import useLogin from "../../../utils/Login/useLogin";
import Iconify from "../../../components/iconify/Iconify";

// ----------------------------------------------------------------------

const NAV_WIDTH = 320;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: "#f9d3bb",
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const { account } = useLogin();

  const icon = (name) => <Iconify icon={name} sx={{ width: 1, height: 1 }} />;

  let navAdminConfig = [];
  if (account.role === "Đào tạo") {
    navAdminConfig.push(
      {
        title: "Thông Kê",
        path: "/admin/dashboard",
        icon: icon("bxs:dashboard"),
      },
      {
        title: "Quản Lý Người Dùng",
        path: "/admin/users",
        icon: icon("bxs:user-rectangle"),
      }
    );
  }
  navAdminConfig = [
    ...navAdminConfig,
    {
      title: "Quản Lý Nhóm học tập",
      path: "/admin/groups",
      icon: icon("bxs:user-rectangle"),
    },
    {
      title: "Quản Lý Bài Viết",
      path: "/admin/posts",
      icon: icon("majesticons:article"),
    },
    // {
    //   title: "Quản Lý Bình Luận",
    //   path: "/admin/comments",
    //   icon: icon("bxs:comment"),
    // },
    // {
    //   title: "Quản Lý Lượt Thích",
    //   path: "/admin/likes",
    //   icon: icon("bxs:like"),
    // },
    // {
    //   title: "Lịch Sử Hoạt Động",
    //   path: "/admin/activities",
    //   icon: icon("fa:history"),
    // },
  ];

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, pb: 2, display: "inline-flex" }}>
        <Logo sx={{ width: 200 }} />
      </Box>

      <Box sx={{ mb: 4, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount sx={{ display: "block", textAlign: "center" }}>
            <Avatar
              src={account.avatar}
              sx={{ width: "130px", height: "130px", margin: "auto" }}
              alt="photoURL"
            />

            <Box sx={{ mt: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "text.primary" }}
                style={{ fontWeight: "bold", fontSize: "15px" }}
              >
                Xin chào, {account.fullName}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                style={{ fontWeight: "bold", fontSize: "15px" }}
              >
                {account.email}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navAdminConfig} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
        boxShadow: "4px 4px 4px #9E9E9E",
      }}
    >
      {
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      }
    </Box>
  );
}
