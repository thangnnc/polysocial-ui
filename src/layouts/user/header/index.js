import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, Badge, Avatar } from "@mui/material";
// utils
import { bgBlur } from "../../../utils/CssStyle/cssStyles";
//
import AccountPopover from "./AccountPopover";
import NotificationPopover from "./NotificationPopover";
import Logo from "../../../components/logo";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MessagesPopover from "./MesagePopover";
import SearchPopover from "./SearchPopover";
import React, { useEffect, useState } from "react";
import useLogin from "../../../utils/Login/useLogin";
import Asios from "../../../utils/Axios";

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 72;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  backgroundColor: "#fff",
  boxShadow: "4px 4px 4px #9E9E9E",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));
// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header(props, { onOpenNav }) {
  let socket;
  try {
    socket = props.socket.socket.socket;
  } catch (error) {}
  const { account } = useLogin();

  const [groupList, setGroupList] = useState([]);
  const [count, setCount] = useState(0);
  const [online, setOnline] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // setCount(0);
    getNameGroupDESC();
  }, []);

  useEffect(() => {
    try {
      socket.on("get_one_message", function () {
        // for (let index = 0; index < 4; index++) {
        getNameGroupDESC();
        // }
      });
    } catch (error) {}
  });
  useEffect(() => {
    try {
      socket.on("accept", function () {
        // for (let index = 0; index < 4; index++) {
        getNameGroupDESC();
        // }
      });
    } catch (error) {}
  });

  useEffect(() => {
    try {
      socket.on("server-send-listSocket", function (data) {
        // console.log("on-->", data);
        setOnline(data);
        const data1 = {
          userId: 1,
        };
        const fetDataDESC = async () => {
          const arr = [];
          try {
            const response = await Asios.Messages.getNameGroupDESC(data1);
            for (let index = 0; index < response.data.length; index++) {
              const listNameGr = {};
              const element = response.data[index];
              const names = element.name.split(",");
              const n = account.fullName;
              const getName = names.filter((name) => name !== n);

              try {
                const Avatar = element.avatar.split(",");
                const ns = account.avatar;
                const getAvatar = Avatar.filter((name) => name !== ns);

                if (getAvatar[0] === account.avatar) {
                  listNameGr.avatar = element.avatar;
                } else {
                  listNameGr.avatar = getAvatar[0];
                }
              } catch (error) {}

              listNameGr.roomId = element.roomId;
              listNameGr.lastMessage = element.lastMessage;

              listNameGr.totalMember = element.totalMember;
              listNameGr.status = element.status;
              if (getName[0] === account.fullName) {
                listNameGr.name = element.name;
              } else {
                listNameGr.name = getName[0];
              }
              listNameGr.listContacts = element.listContacts;
              listNameGr.lastUpDateDate = element.lastUpDateDate;
              arr.push(listNameGr);
            }
          } catch (error) {}

          const listContent = [];
          var counts = 0;
          for (let index = 0; index < arr.length; index++) {
            const listContentObject = {};
            const element = arr[index];

            listContentObject.avatar = element.avatar;
            listContentObject.lastMessage = element.lastMessage;
            listContentObject.lastUpDateDate = element.lastUpDateDate;
            listContentObject.listContacts = element.listContacts;

            const mySetOnline = new Set();
            for (let index = 0; index < element.listContacts.length; index++) {
              const element2 = element.listContacts[index];
              mySetOnline.add(element2.at(4));
            }

            const listOnline = [];
            for (let index = 0; index < data.length; index++) {
              const element2 = data[index];
              listOnline.push(element2.email);
            }

            for (let index = 0; index < listOnline.length; index++) {
              mySetOnline.delete(account.email);
              if (mySetOnline.has(listOnline[index])) {
                listContentObject.isActive = false;
                break;
              } else {
                listContentObject.isActive = true;
              }
            }

            listContentObject.name = element.name;
            listContentObject.roomId = element.roomId;
            listContentObject.status = element.status;
            listContentObject.totalMember = element.totalMember;
            listContent.push(listContentObject);
            if (element.status === false) {
              counts++;
            }
          }

          setCount(counts);

          setGroupList(listContent);
        };
        fetDataDESC();
      });
    } catch (error) {}
  });

  // useEffect(() => {
  //   try {
  //     socket.on("seen", function () {
  //       // for (let index = 0; index < 4; index++) {
  //         getNameGroupDESC();
  //       // }
  //     });
  //   } catch (error) {}
  // });

  const getNameGroupDESC = async () => {
    console.log("run getNameGroupDESC");
    const data = {
      userId: 1,
    };
    const arr = [];
    try {
      const response = await Asios.Messages.getNameGroupDESC(data);
      // console.log("run response",response);

      for (let index = 0; index < response.data.length; index++) {
        const listNameGr = {};
        const element = response.data[index];
        const names = element.name.split(",");
        const n = account.fullName;
        const getName = names.filter((name) => name !== n);

        try {
          const Avatar = element.avatar.split(",");
          const ns = account.avatar;
          const getAvatar = Avatar.filter((name) => name !== ns);

          if (getAvatar[0] === account.avatar) {
            listNameGr.avatar = element.avatar;
          } else {
            listNameGr.avatar = getAvatar[0];
          }
        } catch (error) {}

        listNameGr.roomId = element.roomId;
        listNameGr.lastMessage = element.lastMessage;

        listNameGr.totalMember = element.totalMember;
        listNameGr.status = element.status;
        if (getName[0] === account.fullName) {
          listNameGr.name = element.name;
        } else {
          listNameGr.name = getName[0];
        }
        listNameGr.listContacts = element.listContacts;
        listNameGr.lastUpDateDate = element.lastUpDateDate;
        listNameGr.messageRecall = element.messageRecall;
        arr.push(listNameGr);
      }
    } catch (error) {}
    var counts = 0;

    const listContent = [];
    for (let index = 0; index < arr.length; index++) {
      const listContentObject = {};
      const element = arr[index];
      listContentObject.avatar = element.avatar;
      listContentObject.lastMessage = element.lastMessage;
      listContentObject.lastUpDateDate = element.lastUpDateDate;
      listContentObject.listContacts = element.listContacts;

      const mySetOnline = new Set();
      for (let index = 0; index < element.listContacts.length; index++) {
        const element2 = element.listContacts[index];
        mySetOnline.add(element2.at(4));
      }

      const listOnline = [];
      for (let index = 0; index < online.length; index++) {
        const element2 = online[index];
        listOnline.push(element2.email);
      }

      for (let index = 0; index < listOnline.length; index++) {
        mySetOnline.delete(account.email);
        if (mySetOnline.has(listOnline[index])) {
          listContentObject.isActive = false;

          break;
        } else {
          listContentObject.isActive = true;
        }
      }

      listContentObject.name = element.name;
      listContentObject.roomId = element.roomId;
      listContentObject.status = element.status;
      listContentObject.totalMember = element.totalMember;
      listContent.push(listContentObject);
      if (element.status === false) {
        counts++;
      }
    }
    setCount(counts);
    setGroupList(listContent);
  };

  useEffect(() => {
    getAllNotification();
  }, []);

  const getAllNotification = async () => {
    const response = await Asios.Notifications.getAllNotifications();
    setNotifications(response);
  };

  return (
    <StyledRoot>
      <StyledToolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box sx={{ display: "inline-flex" }}>
            <Logo sx={{ width: 180 }} />
          </Box>

          <SearchPopover sockets={socket} />

          <Stack
            direction="row"
            alignItems="center"
            spacing={{
              xs: 0.5,
              sm: 1,
            }}
          >
            <Box sx={{ mr: 2 }}>
              <Badge
                badgeContent={4}
                color="error"
                overlap="circular"
                sx={{ mr: 2 }}
              >
                <Avatar sx={{ bgcolor: "#ffa36a" }}>
                  <MenuBookIcon />
                </Avatar>
              </Badge>

              <MessagesPopover
                groupList={groupList}
                count={count}
                listOnline={online}
              />

              <NotificationPopover notifications={notifications} />
            </Box>

            <AccountPopover />
          </Stack>
        </Box>
      </StyledToolbar>
    </StyledRoot>
  );
}
