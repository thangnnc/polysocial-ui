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
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [listOnline, setListOnline] = useState();

  useEffect(() => {
    try {
      socket.on("server-send-listSocket", function (data) {
        // console.log("online", data);
        setListOnline(data);
        const mySetOnline = new Set();
        for (let i = 0; i < data.length; i++) {
          const element2 = data;
          mySetOnline.add(element2[i].email);
        }

        const listFriends = [];
        const fetDataDESC = async () => {
          const response = await Axios.Friends.getAllFriend();
          console.log("--nav-friends->", response);

          for (let index = 0; index < response.length; index++) {
            const listFrindObject = {};
            const element = response[index];
            listFrindObject.avatarUserConfirm = element.avatarUserConfirm;
            listFrindObject.avatarUserInvite = element.avatarUserInvite;
            listFrindObject.friendAvatar = element.friendAvatar;
            listFrindObject.friendEmail = element.friendEmail;
            listFrindObject.friendName = element.friendName;
            listFrindObject.fullNameUserConfirm = element.fullNameUserConfirm;
            listFrindObject.fullNameUserInvite = element.fullNameUserInvite;
            listFrindObject.groupId = element.groupId;
            var listContact = [];
            for (let i = 0; i < element.listContact.length; i++) {
              var arr = [];
              const element2 = element.listContact[i];
              arr.push(element2.contactId);
              arr.push(element2.studentCode);
              arr.push(element.friendAvatar);
              arr.push(element.friendName);
              arr.push(element2.email);
              listContact.push(arr);
            }
            listFrindObject.listContact = listContact;

            listFrindObject.roomId = element.roomId;
            listFrindObject.status = element.status;
            listFrindObject.userConfirmId = element.userConfirmId;
            listFrindObject.userInviteId = element.userInviteId;
            if (mySetOnline.has(element.friendEmail)) {
              listFrindObject.isActive = true;
            } else {
              listFrindObject.isActive = false;
            }
            listFriends.push(listFrindObject);
          }
          console.log("list friend- ", listFriends);
          setListFriend(listFriends);
        };
        fetDataDESC();
      });
    } catch (error) {}
  });
  // useEffect(() => {
  //   getAllFriend();
  // }, []);

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
    // console.log("--->", response);
    setListFriend(response);
  };
  const pathMessage = "/message/room/";

  const handleOnClick = async (
    e,
    listContacts,
    avatar,
    name,
    isActive,
    roomId
  ) => {
    let group = {};
    group.listContacts = listContacts;
    group.name = name;
    group.avatar = avatar;
    group.isActive = isActive;
    group.listOnline = listOnline;
    navigate(pathMessage + roomId, {
      state: {
        group: group,
      },
    });
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
            <Button
              onClick={(e) => {
                handleOnClick(
                  e,
                  value.listContact,
                  value.friendAvatar,
                  value.friendName,
                  value.isActive,
                  value.roomId
                );
              }}
              key={index}
              color="warning"
              sx={styleListFriends}
            >
              <ListItem>
                <ListItemAvatar>
                  <AvatarStatus
                    alt={value.friendName}
                    src={value.friendAvatar}
                    isActive={value.isActive}
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
