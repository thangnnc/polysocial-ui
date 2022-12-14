// component
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

const icon = (name) => <Iconify icon={name} sx={{ width: 1, height: 1 }} />;

export const navUserConfig = [
  {
    title: "Trang Chủ",
    path: "/home",
    icon: icon("material-symbols:home"),
  },
  {
    title: "Trang Cá Nhân",
    path: "/my-profile",
    icon: icon("healthicons:ui-user-profile"),
  },
  {
    title: "Lời Mời Kết Bạn",
    path: "/friends-requests",
    icon: icon("fluent-mdl2:add-friend"),
  },
  {
    title: "Nhóm Của Tôi",
    path: "/groups",
    icon: icon("ri:team-fill"),
  },
  {
    title: "Bài Tập",
    path: "/exercise",
    icon: icon("ph:exam-fill"),
    notiCount: 2,
  },
];

export default navUserConfig;
