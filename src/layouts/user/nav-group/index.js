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
import { useParams, Link } from "react-router-dom";
// import { toast } from "react-toastify";
import Iconify from "../../../components/iconify";
import NavGroupSection from "../../../components/nav-group-section/NavGroupSection";
import useLogin from "../../../utils/Login/useLogin";
import Axios from "./../../../utils/Axios/index";

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
  const { groupId } = useParams();
  const { account } = useLogin();
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState();
  // const location = useLocation();
  // const [showRequestMember, setShowRequestMember] = useState([]);
  const [count, setCount] = useState(0);
  const [roomId, setRoomId] = useState();
  let socket;
  let listOnline;
  try {
    listOnline = props.socket.socket.listOnline;
    socket = props.socket.socket.socket;
  } catch (error) {}

  useEffect(() => {
    try {
      socket.on("accept-member", function () {
        getRequestMember(groupId);
      });
    } catch (error) {}
  });

  useEffect(() => {
    getRequestMember(groupId);
  }, [groupId]);

  const getRequestMember = async (groupId) => {
    const response = await Axios.Groups.getMemberJoinGroup(groupId);
    setCount(response.length);
  };

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
      notiCount: count === 0 ? null : count,
    });
  }

  navGroupConfig = [
    ...navGroupConfig,
    {
      title: "Mọi người",
      path: `/groups/detail/members/${groupId}`,
      icon: icon("la:user-friends"),
    },
    {
      title: "Nhắn tin",
      path: `/message/room/${roomId}`,
      icon: icon("jam:messages-alt"),
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
    // {
    //   title: "Rời nhóm",
    //   path: `/groups/detail/leave/${groupId}`,
    //   icon: icon("ic:round-log-out"),
    // },
  ];

  useEffect(() => {
    getAllData(groupId);
  }, [listOnline !== undefined]);

  const getAllData = async (groupId) => {
    const response = await Axios.Groups.getOneGroup(groupId);
    if (response) {
      setGroups(response);
      // console.log("repppp", response)
      const listNameGr = {};
      listNameGr.avatar = response.avatar;
      listNameGr.isActive = true;
      const listContact = [];
      for (let index = 0; index < response.listContact.length; index++) {
        const arr = [];
        const element = response.listContact[index];
        arr.push(element.userId);
        arr.push(element.studentCode);
        arr.push(element.avatar);
        arr.push(element.fullName);
        arr.push(element.email);
        listContact.push(arr);
      }
      listNameGr.listContacts = listContact;
      listNameGr.listOnline = listOnline;
      listNameGr.name = response.name;
      listNameGr.roomId = response.roomId;
      
      setGroup(listNameGr);
      setRoomId(response.roomId);
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
          src={groups.avatar}
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
            Nhóm {groups.name} - {groups.className}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Iconify icon={"uil:padlock"} style={{ width: 20 }} />
            <Typography
              variant="subtitle2"
              sx={{ color: "#9b9b9b", paddingLeft: 1, paddingTop: 0.5 }}
            >
              Nhóm kín - {groups.totalMember} thành viên
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
        <NavGroupSection data={navGroupConfig} state={group}/>
      </Box>
    </BoxNav>
  );
}
