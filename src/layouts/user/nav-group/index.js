import {
  Button,
  IconButton,
  ImageListItem,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Iconify from "../../../components/iconify";
import NavGroupSection from "../../../components/nav-group-section/NavGroupSection";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 72;

const BoxNav = styled("div")(({ theme }) => ({
  width: "25%",
  minHeight: "100%",
  height: "100vh",
  paddingTop: APP_BAR_MOBILE + 9,
  backgroundColor: "#fff",
  position: "fixed",
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 9,
    // paddingLeft: theme.spacing(3),
    // paddingRight: theme.spacing(2),
  },
}));

export default function NavGroup(props) {
  console.log(props);
  const icon = (name) => <Iconify icon={name} sx={{ width: 1, height: 1 }} />;

  const navGroupConfig = [
    {
      title: "Trang Chủ",
      path: `/groups/detail/${props.groupId}`,
      icon: icon("material-symbols:home-outline-rounded"),
    },
    {
      title: "Xét duyệt thành viên",
      path: `/groups/detail/add-member/${props.groupId}`,
      icon: icon("material-symbols:home-outline-rounded"),
    },
    {
      title: "Thành viên",
      path: `/groups/detail/members/${props.groupId}`,
      icon: icon("la:user-friends"),
    },
    {
      title: "Phản hồi",
      path: "/groups/detail/feedback",
      icon: icon("mdi:feedback-outline"),
      notiCount: 4,
    },
    {
      title: "Bài tập (Quiz)",
      path: `/groups/detail/exercise/${props.groupId}`,
      icon: icon("material-symbols:nest-clock-farsight-analog-outline"),
      notiCount: 2,
    },
    {
      title: "Rời nhóm",
      path: "/groups/detail/leave",
      icon: icon("ic:round-log-out"),
    },
  ];

  return (
    <BoxNav>
      <ImageListItem>
        <img
          style={{
            width: "100%",
            height: 300,
            objectFit: "cover",
          }}
          src={
            "https://res.cloudinary.com/dwc7dkxy7/image/upload/v1670588428/groups-default-cover-photo-2x_ysxgpp.png"
          }
          alt="avatar group"
        />
      </ImageListItem>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 65,
          paddingTop: 2,
          paddingLeft: 3,
          paddingRight: 2,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Nhóm Lập Trình WEB - IT6307_3
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Iconify icon={"material-symbols:public"} style={{ width: 20 }} />
            <Typography
              variant="subtitle2"
              sx={{ color: "#9b9b9b", paddingLeft: 1, paddingTop: 0.5 }}
            >
              Nhóm công khai - 31 thành viên
            </Typography>
          </Box>
        </Box>
        <IconButton
          aria-label="Example"
          sx={{ backgroundColor: "#f5f5f5", color: "black" }}
        >
          <Iconify icon={"bi:gear-fill"} />
        </IconButton>
      </Box>
      <Stack
        spacing={5}
        direction="row"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 2,
          paddingLeft: 3,
          paddingRight: 3,
        }}
      >
        <Button
          sx={{
            backgroundColor: "#f5f5f5",
            color: "black",
            padding: 2,
            fontWeight: "bold",
            fontSize: 16,
            borderRadius: 5,
            width: "180px",
          }}
        >
          <Iconify icon={"mdi:people-group"} />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 17,
              paddingLeft: 1,
              paddingTop: 0.5,
            }}
          >
            Đã tham gia
          </Typography>
        </Button>
        <Button
          sx={{
            backgroundColor: "#f5f5f5",
            color: "black",
            padding: 2,
            fontWeight: "bold",
            fontSize: 16,
            borderRadius: 5,
            width: "180px",
          }}
        >
          <Iconify icon={"material-symbols:add"} />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 17,
              paddingLeft: 1,
              paddingTop: 0.5,
            }}
          >
            Mời
          </Typography>
        </Button>
      </Stack>
      <Box sx={{ paddingTop: 4 }}>
        <NavGroupSection data={navGroupConfig} />
      </Box>
    </BoxNav>
  );
}
