import {
  Button,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Iconify from "../../../components/iconify";
import AvatarStatus from "../../../utils/AvatarStatus/AvatarStatus";
import Axios from "./../../../utils/Axios/index";

const styleListFriends = {
  padding: "8px 12px",
  width: "100%",
  color: "#515151",
};

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 72;

const BoxFriend = styled("div")(({ theme }) => ({
  width: "20%",
  maxHeight: "100vh",
  position: "fixed",
  right: 0,
  borderRadius: 0,
  boxShadow: "0px 0px 4px #d2d2d2",
  paddingTop: APP_BAR_MOBILE + 10,
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 10,
  },
}));

const scrollbar = {
  "::-webkit-scrollbar": {
    width: "8px",
  },
  ":hover::-webkit-scrollbar-thumb": {
    " -webkit-border-radius": "5px",
    borderRadius: "5px",
    background: "#ffa36a",
  },
  "::-webkit-scrollbar-thumb:window-inactive": {
    background: "#ffa36a",
  },
};
export default function NavFriend(props) {
  let socket = props.socket.socket.socket;
  const [listFriends, setListFriend] = useState([]);

  useEffect(() => {
    getAllFriend();
  }, []);

  useEffect(() => {
    try {
      socket.on("accept", function () {
        // for (let index = 0; index < 4; index++) {
          getAllFriend();
        // }
      });
    } catch (error) {}
  });

  const getAllFriend = async () => {
    const response = await Axios.Friends.getAllFriend();
    setListFriend(response);
  };

  return (
    <BoxFriend>
      <Card
        sx={{
          width: "100%",
          height: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#ffffff",
          zIndex: 9999,
          borderBottom: "1px solid #ed6c02",
          borderRadius: 0,
        }}
      >
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ fontWeight: 700, fontSize: 18 }}
        >
          Bạn bè
        </ListSubheader>

        <Button sx={{ mr: 1, color: "#515151" }}>
          <Iconify
            icon={"ic:round-person-search"}
            sx={{ width: 32, height: 32 }}
          />
        </Button>
      </Card>
      <List
        dense
        sx={{
          width: "100%",
          maxHeight: "calc(100vh - 136px)",
          overflow: "auto",
          p: 0,
          bgcolor: "background.paper",
          ...scrollbar,
        }}
      >
        {listFriends.map((value, index) => {
          return (
            <Button key={index} color="warning" sx={styleListFriends}>
              <ListItem>
                <ListItemAvatar>
                  <AvatarStatus
                    alt={value.friendName}
                    src={value.friendAvatar}
                    isActive={value.status}
                    sx={{ width: 48, height: 48 }}
                  />
                </ListItemAvatar>
                <Typography sx={{ fontWeight: "700", ml: 1.5 }}>
                  {value.friendName}
                </Typography>
              </ListItem>
            </Button>
          );
        })}
      </List>
    </BoxFriend>
  );
}
