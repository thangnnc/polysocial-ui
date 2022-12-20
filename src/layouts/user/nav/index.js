import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Iconify from "../../../components/iconify/Iconify";
import NavUserSection from "../../../components/nav-user-section/NavUserSection";
import AvatarStatus from "../../../utils/AvatarStatus/AvatarStatus";
import useLogin from "../../../utils/Login/useLogin";
import Axios from "../../../utils/Axios";
import { useEffect, useState } from "react";


export default function NavUser(props) {
  const { account } = useLogin();
  const [count, setCount] = useState(0);

  let socket;
  try {
    socket = props.socket.socket.socket;
  } catch (error) {
    
  }

  const getRequestFriend = async () => {
    const response = await Axios.Friends.getAllRequestAddFriend();
    setCount(response.length);
  };

  useEffect(() => {
    getRequestFriend();
  }, []);

  
  useEffect(() => {
    try {
      socket.on("request-accept", function () {
        console.log("runnnnnn")
        getRequestFriend();
      });
    } catch (error) {}
  });

  useEffect(() => {
    try {
      socket.on("reset_friend", function () {
        console.log("runnnnnn reset_friend")
        getRequestFriend();
      });
    } catch (error) {}
  });

  const icon = (name) => <Iconify icon={name} sx={{ width: 1, height: 1 }} />;

  const navUserConfig = [
    {
      title: "Trang Chủ",
      path: "/home",
      icon: icon("material-symbols:home"),
    },
    {
      title: "Trang Cá Nhân",
      path: `/my-profile/${account.userId}`,
      icon: icon("healthicons:ui-user-profile"),
    },
    {
      title: "Lời Mời Kết Bạn",
      path: "/friends-requests",
      icon: icon("fluent-mdl2:add-friend"),
      notiCount: count === 0 ? null : count,
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

  return (
    <Box sx={{ width: "18%", position: "fixed" }}>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "left",
          p: 3,
        }}
      >
        <Box sx={{ width: "25%" }}>
          <AvatarStatus
            alt="Avatar"
            isActive={true}
            src={account.avatar}
            sx={{ width: 54, height: 54 }}
          />
        </Box>
        <Box sx={{ width: "75%" }}>
          <Typography variant="subtitle2" noWrap fontSize={16}>
            {account.fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {account.email}
          </Typography>
        </Box>
      </Card>

      <Card
        sx={{
          alignItems: "center",
          textAlign: "left",
          mt: 2,
          p: 0,
        }}
      >
        <NavUserSection data={navUserConfig} />
      </Card>
    </Box>
  );
}
