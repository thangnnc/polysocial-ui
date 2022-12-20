import {
  Button,
  IconButton,
  ImageListItem,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
import Iconify from "../../../components/iconify";
import NavGroupSection from "../../../components/nav-group-section/NavGroupSection";
import useLogin from "../../../utils/Login/useLogin";
import Axios from "./../../../utils/Axios/index";
import { useLocation } from 'react-router-dom'

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

export default function NavGroup() {
  const { groupId } = useParams();
  const { account } = useLogin();
  const [group, setGroup] = useState([]);
  const location = useLocation()
  const { roomId } = location.state
  try {
  console.log("group----------",roomId)
    
  } catch (error) {
    
  }
  const icon = (name) => <Iconify icon={name} sx={{ width: 1, height: 1 }} />;

  let navGroupConfig = [
    {
      title: "Trang Chủ",
      path: `/groups/detail/${groupId}`,
      icon: icon("material-symbols:home-outline-rounded"),
    },
  ];
  if (account.role !== "Sinh viên") {
    navGroupConfig.push({
      title: "Xét duyệt thành viên",
      path: `/groups/detail/add-members/${groupId}`,
      icon: icon("fluent-mdl2:add-friend"),
      notiCount:3
    });
  }

  navGroupConfig = [
    ...navGroupConfig,
    {
      title: "Mọi người",
      path: `/groups/detail/members/${groupId}`,
      icon: icon("la:user-friends"),
    },    {
      title: "Nhắn tin",
      path: `/message/room/${roomId}`,
      icon: icon("la:user-friends"),
    },
    {
      title: "Phản hồi",
      path: `/groups/detail/feedback/${groupId}`,
      icon: icon("mdi:feedback-outline"),
    },
    {
      title: "Bài tập (Quiz)",
      path: `/groups/detail/exercise/${groupId}`,
      icon: icon("material-symbols:nest-clock-farsight-analog-outline"),
    },
    {
      title: "Rời nhóm",
      path: `/groups/detail/leave/${groupId}`,
      icon: icon("ic:round-log-out"),
    },
  ];

  useEffect(() => {
    getAllData(groupId);
  }, [groupId]);

  const getAllData = async (groupId) => {
    const response = await Axios.Groups.getOneGroup(groupId);
    if (response) {
      setGroup(response);
      // toast.success("Lấy dữ liệu thành công");
    } else {
      // toast.error("Lấy dữ liệu thất bại");
    }
  };

  return (
    <BoxNav>
      <ImageListItem>
        <img
          style={{
            width: "100%",
            height: "20vh",
            objectFit: "cover",
          }}
          src={
            "https://res.cloudinary.com/dwc7dkxy7/image/upload/v1670978828/groups-default-cover-photo-2x_igy9tq.png"
          }
          alt="avatar group"
        />
      </ImageListItem>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "5vh",
          paddingTop: 2,
          paddingLeft: 3,
          paddingRight: 2,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Nhóm {group.name} - {group.description}
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
              Nhóm công khai - {group.totalMember} thành viên
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
      <Box sx={{ paddingTop: 3 }}>
        <NavGroupSection data={navGroupConfig} />
      </Box>
    </BoxNav>
  );
}
