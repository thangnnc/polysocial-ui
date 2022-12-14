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
  },
}));

export default function NavGroup(props) {
  const { groupId } = useParams();
  const { account } = useLogin();
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState();
  const [count, setCount] = useState(0);
  const [roomId, setRoomId] = useState();
  const [listeningResquestMember, setListeningRequestMember] = useState(false);
  const [listeningResquestMemberOne, setListeningRequestMemberOne] = useState(false);

  let socket;
  let listOnline;
  try {
    listOnline = props.socket.socket.listOnline;
    socket = props.socket.socket.socket;
  } catch (error) {}

  // useEffect(() => {
  //   try {
  //     socket.on("accept-member", function () {
  //       getRequestMember(groupId);
  //     });
  //   } catch (error) {}
  // });
  try {
    socket.on("reset_request_group_one", () => {
      setListeningRequestMemberOne(true);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningResquestMemberOne) {
        getRequestMember(groupId);
        setListeningRequestMemberOne(false);
      }
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningResquestMemberOne]);
  
  ///listeningResquestMember
  try {
    socket.on("reset_request_group", () => {
      setListeningRequestMember(true);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningResquestMember) {
        getRequestMember(groupId);
        setListeningRequestMember(false);
      }
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningResquestMember]);

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
      title: "Trang Ch???",
      path: `/groups/detail/${groupId}`,
      icon: icon("material-symbols:home-outline-rounded"),
    },
  ];
  if (account.role !== "Sinh vi??n") {
    navGroupConfig.push({
      title: "X??t duy???t th??nh vi??n",
      path: `/groups/detail/add-members/${groupId}`,
      icon: icon("fluent-mdl2:add-friend"),
      notiCount: count === 0 ? null : count,
    });
  }

  navGroupConfig = [
    ...navGroupConfig,
    {
      title: "M???i ng?????i",
      path: `/groups/detail/members/${groupId}`,
      icon: icon("la:user-friends"),
    },
    {
      title: "Nh???n tin",
      path: `/message/room/${roomId}`,
      icon: icon("jam:messages-alt"),
    },
    {
      title: "Ph???n h???i",
      path: `/groups/detail/feedback/${groupId}`,
      icon: icon("mdi:feedback-outline"),
    },
    {
      title: "B??i t???p (Quiz)",
      path: `/groups/detail/exercise/${groupId}`,
      icon: icon("material-symbols:nest-clock-farsight-analog-outline"),
    },
  ];

  useEffect(() => {
    getAllData(groupId);
  }, [listOnline !== undefined]);

  const getAllData = async (groupId) => {
    const response = await Axios.Groups.getOneGroup(groupId);
    if (response) {
      setGroups(response);
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
      // toast.success("L???y d??? li???u th??nh c??ng");
    } else {
      // toast.error("L???y d??? li???u th???t b???i");
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
            Nh??m {groups.name} - {groups.className}
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
              Nh??m k??n - {groups.totalMember} th??nh vi??n
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
            ???? tham gia
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
            M???i
          </Typography>
        </Button>
      </Stack>
      <Box sx={{ paddingTop: 3 }}>
        <NavGroupSection data={navGroupConfig} state={group} />
      </Box>
    </BoxNav>
  );
}
