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
import React, { useEffect, useState, useRef } from "react";
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

export default function Header({ onOpenNav }) {
  const { account, socket } = useLogin();

  const [groupList, setGroupList] = useState([]);
  const [count, setCount] = useState(0);
  const [online, setOnline] = useState([]);

  useEffect(() => {
    socket.emit("client-user-connect", account);
  }, []);

  useEffect(() => {
    socket.on("get_one_message", function () {
      for (let index = 0; index < 4; index++) {
        getNameGroupDESC();
      }
    });
  });

  useEffect(() => {
    socket.on("server-send-danhsach-users", function (data) {
      setOnline(data);
      const data1 = {
        userId: 1,
      };
      const fetDataDESC = async () => {
        const response = await Asios.Messages.getNameGroupDESC(data1);
        const arr = [];
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
        setCount(0);
        const listContent = [];
        for (let index = 0; index < arr.length; index++) {
          const listContentObject = {};
          const element = arr[index];
          listContentObject.avatar = element.avatar;
          listContentObject.lastMessage = fromBinary(element.lastMessage);
          listContentObject.lastUpDateDate = element.lastUpDateDate;
          listContentObject.listContacts = element.listContacts;

          const mySetOnline = new Set();
          for (let index = 0; index < element.listContacts.length; index++) {
            const element2 = element.listContacts[index];
            mySetOnline.add(element2.at(1));
          }

          for (let index = 0; index < data.length; index++) {
            mySetOnline.delete(account.studentCode);
            if (mySetOnline.has(data[index])) {
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
            setCount(count + 1);
          }
        }
        setGroupList(listContent);
      };
      fetDataDESC();
    });
  });

  useEffect(() => {
    socket.on("seen", function () {
      // for (let index = 0; index < 4; index++) {
      getNameGroupDESC();
      // }
    });
  }, []);

  const getNameGroupDESC = async () => {
    const data = {
      userId: 1,
    };
    const response = await Asios.Messages.getNameGroupDESC(data);
    const arr = [];
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
    setCount(0);
    const listContent = [];
    for (let index = 0; index < arr.length; index++) {
      const listContentObject = {};
      const element = arr[index];
      listContentObject.avatar = element.avatar;
      listContentObject.lastMessage = fromBinary(element.lastMessage);
      listContentObject.lastUpDateDate = element.lastUpDateDate;
      listContentObject.listContacts = element.listContacts;

      const mySetOnline = new Set();
      for (let index = 0; index < element.listContacts.length; index++) {
        const element2 = element.listContacts[index];
        mySetOnline.add(element2.at(1));
      }

      for (let index = 0; index < online.length; index++) {
        mySetOnline.delete(account.studentCode);
        if (mySetOnline.has(online[index])) {
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
        setCount(count + 1);
      }
    }
    setGroupList(listContent);
  };

  function fromBinary(encoded) {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint16Array(bytes.buffer));
  }

  const notifications = [
    {
      title: "Brunch this week?",
      content:
        "I'll be in the neighbourhood this week. Let's grab a bite to eat",
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: false,
      dateTime: "12/05/2022, 4:04:33 AM",
    },
    {
      title: "Birthday Gift",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: false,
      dateTime: "12/04/2022, 4:04:33 AM",
    },
    {
      title: "Demo",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: true,
      dateTime: "12/03/2022, 4:04:33 AM",
    },
    {
      title: "Birthday Gift",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: false,
      dateTime: "12/02/2022, 4:04:33 AM",
    },
    {
      title: "Demo",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: true,
      dateTime: "12/01/2022, 4:04:33 AM",
    },
    {
      title: "Birthday Gift",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: false,
      dateTime: "11/05/2022, 4:04:33 AM",
    },
    {
      title: "Demo",
      content: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      avatar:
        "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
      isSeen: true,
      dateTime: "11/05/2022, 4:04:33 AM",
    },
  ];

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

          <SearchPopover />

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

              <MessagesPopover groupList={groupList} count={count} />

              <NotificationPopover notifications={notifications} />
            </Box>

            <AccountPopover />
          </Stack>
        </Box>
      </StyledToolbar>
    </StyledRoot>
  );
}
