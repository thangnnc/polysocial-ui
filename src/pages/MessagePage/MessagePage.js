import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AvatarStatus from "../../utils/AvatarStatus/AvatarStatus";
import Iconify from "../../components/iconify";
import MyMessage from "./components/MyMessage";
import OtherMessage from "./components/OtherMessage";
import AlertMessage from "./components/AlertMessage";
import EnteringMessage from "./components/EnteringMessage";
import { Link, useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import Asios from "../../utils/Axios";
import useLogin from "../../utils/Login/useLogin";

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

export default function MessagePage(props) {
  const { roomId } = useParams();
  let location = useLocation();
  const [room, setRoom] = useState([]);
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1);
  // const [prevPage, setPrevPage] = useState(1);
  // const [lastList, setLastList] = useState(false);
  const limit = 20;
  const { account } = useLogin();
  const [messageList, setMessageList] = useState([{}]);
  const [listcontactId, setListcontactId] = useState([]);
  const [contactId, setcontactId] = useState([]);
  const [listContacts, setListContacts] = useState();
  const [message, setMessage] = useState("");
  const [userTyping, setUserTyping] = useState([]);
  const [accountTyping, setAccountTyping] = useState([]);
  const [userIdOther, setUserIdOther] = useState();
  const [isActiveOther, setIsActiveOther] = useState();
  const [emailOther, setEmailOther] = useState();
  const messageRef = useRef(null);
  const ref = useRef(null);
  const socket = props.socket.socket;
  let group;
  let listOnline;
  try {
    group = location.state.group;
    listOnline = props.socket.listOnline;
  } catch (error) {}

  useEffect(() => {}, [location]);

  useEffect(() => {
    setUserTyping("");
    setRoom(roomId);
  }, [roomId]);

  useEffect(() => {
    getMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  useEffect(() => {
    getMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listOnline]);

  useEffect(() => {
    try {
      socket.on("recevie_message", (data) => {
        setMessageList([...messageList, data]);
      });
    } catch (error) {}
  }, [listOnline]);

  // useEffect(() => {
  //   try {
  //     socket.on("reset_room_message", () => {
  //       getMessage();
  //     });
  //   } catch (error) {}
  // },);

  useEffect(() => {
    try {
      socket.on("recevie_message", (data) => {
        setMessageList([...messageList, data]);
      });
    } catch (error) {}
  }, [messageList, socket]);

  const getMessage = async () => {
    try {
      setRoom(roomId);
      socket.emit("join_room", roomId * 192.168199);
      const data = {
        page: currPage,
        limit: limit,
        roomId: roomId,
      };

      const response = await Asios.Messages.getMessage(data);

      setRoom(roomId);
      const arr = [];
      setListContacts(group.listContacts);

      for (let index = 0; index < group.listContacts.length; index++) {
        const element = group.listContacts[index];
        if (element[1] === account.studentCode) {
          const data = {
            contactId: element[0],
          };
          setcontactId(element[0]);
          const responseUpdateviewed = await Asios.Messages.updateviewedStatus(
            data
          );
          if (responseUpdateviewed) {
            await socket.emit("isSeen");
          }
          // break;
        } else {
          arr.push(element[0]);
        }
      }
      setListcontactId(arr);
      let listOnlines = [];
      let listOnls = [];
      try {
        const listContent = [];

        for (let index = 0; index < listOnline.length; index++) {
          const element2 = listOnline[index];
          listOnlines.push(element2.email);
          listOnls.push(element2.email);
        }

        listOnlines.splice(listOnlines.indexOf(account.email), 1);

        for (let index = 0; index < response.data.length; index++) {
          const listContentObject = {};
          const element = response.data[index];
          listContentObject.isAdmin = element.isAdmin;
          listContentObject.avatar = element.avatar;
          listContentObject.createdDate = element.createdDate;
          listContentObject.fullName = element.fullName;
          listContentObject.statusCreated = element.statusCreated;
          listContentObject.studentCode = element.studentCode;
          listContentObject.email = element.email;
          listContentObject.messageRecall = element.messageRecall;
          listContentObject.userId = element.userId;

          if (element.statusCreated === false) {
            if (element.studentCode === account.studentCode) {
              listContentObject.content = "";
            } else {
              listContentObject.content = element.content;
              setUserIdOther(element.userId);

              setEmailOther(element.email);
            }
          } else {
            listContentObject.content = element.content;
          }
          try {
            for (let i = 0; i < 1; i++) {
              var isActive;
              if (listOnlines.includes(element.email) === true) {
                isActive = true;
                for (let index = 0; index < listOnlines.length; index++) {
                  const element1 = listOnlines[index];
                  if (element1 === account.email) {
                    setIsActiveOther(false);
                  } else {
                    setIsActiveOther(true);
                    break;
                  }
                }
              } else {
                isActive = false;
              }
              listContentObject.isActive = isActive;
            }

            listOnlines = [];
            for (let j = 0; j < listOnls.length; j++) {
              const el = listOnls[j];
              listOnlines.push(el);
            }

            listContent.push(listContentObject);
          } catch (error) {}
        }
        setMessageList(listContent.reverse());
      } catch (error) {}
    } catch (error) {
      // toast.error("Failed to fetch message list: ", error);
    }
  };

  useEffect(() => {
    try {
      socket.on(room + "user-typing", (account, data) => {
        setUserTyping(data);
        setAccountTyping(account);
      });
    } catch (error) {}
  });

  useEffect(() => {
    try {
      socket.on(room + "stop-user-typing", (data) => {
        setUserTyping(data);
      });
    } catch (error) {}
  });

  const handleClick = () => {
    ref.current.focus();
    account.isActive = true;
    socket.emit("I'm typing", room, account);
  };
  const handleClickOut = () => {
    socket.emit("I stopped typing", room);
  };

  const sendMessage = async () => {
    try {
      await createMessage();
      let messageContent = {
        room: room * 192.168199,
        content: {
          studentCode: account.studentCode,
          content: message,
          avatar: account.avatar,
          fullName: account.fullName,
          statusCreated: true,
          email: account.email,
          isActive: true,
          userId: account.userId,
        },
      };

      await socket.emit("send_message", messageContent);
      setMessageList([...messageList, messageContent.content]);
      setMessage("");
    } catch (error) {}
  };

  const createMessage = async () => {
    const data = {
      content: message,
      contactId: contactId,
      roomId: room,
      listcontactId: listcontactId,
    };
    const response = await Asios.Messages.createMessage(data);
    if (response) {
      // await getNameGroupDESC();
    }
  };

  // const onScroll = () => {
  //   if (listInnerRef.current) {
  //     const { scrollTop } = listInnerRef.current;
  //     if (scrollTop === 0) {
  //       setCurrPage(currPage + 1);
  //     }
  //   }
  // };

  return (
    <>
      <Helmet>
        <title> Message | Poly Social</title>
      </Helmet>
      <Card sx={{ minHeight: "72vh" }}>
        <Link
          to={`/my-profile/` + userIdOther}
          state={{
            isActive: isActiveOther,
            email: emailOther,
            roomId: roomId,
            listContacts: listContacts,
          }}
          style={{ textDecoration: "none", color: "black" }}
        >
          <CardHeader
            avatar={
              <AvatarStatus
                src={group.avatar}
                isActive={isActiveOther}
                sx={{ width: "46px", height: "46px" }}
              />
            }
            // action={
            //   <IconButton nButton aria-label="settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={<Typography fontWeight={700}>{group.name}</Typography>}
            subheader={isActiveOther ? "Đang hoạt động" : "Không hoạt động"}
          />
        </Link>
        <Divider />
        {/* Nội dung tin nhắn */}
        <CardContent
          sx={{
            height: "56vh",
            display: "block",
            flexWrap: "wrap",
            alignContent: "flex-end",
            overflowY: "auto",
            overflowX: "hidden",
            ...scrollbar,
          }}
          // onScroll={onScroll}
          ref={listInnerRef}
        >
          {messageList.map((value, key) => {
            return (
              <div ref={messageRef}>
                <AlertMessage
                  message={value.statusCreated ? "" : value.content}
                />

                <MyMessage
                  message={
                    value.statusCreated
                      ? value.email === account.email
                        ? value.content
                        : ""
                      : ""
                  }
                  showAvatar={4 - 2 === 2}
                  createdDate={value.createdDate}
                  userId={value.userId}
                  email={value.email}
                  roomId={roomId}
                  listContacts={listContacts}
                />

                <OtherMessage
                  isActive={value.isActive ? false : true}
                  account={value.fullName + " (" + value.email + ")"}
                  avatar={value.avatar}
                  message={
                    value.statusCreated
                      ? value.studentCode !== account.studentCode
                        ? value.content
                        : ""
                      : ""
                  }
                  showAvatar
                  createdDate={value.createdDate}
                  userId={value.userId}
                  email={value.email}
                  roomId={roomId}
                  listContacts={listContacts}
                />
              </div>
            );
          })}
        </CardContent>
        <span>
          {userTyping ? <EnteringMessage account={accountTyping} /> : ""}
        </span>
        {userTyping}
        <Divider />
        {/* Gửi tin nhắn */}
        <CardActions>
          {/* <Button
            size="large"
            color="inherit"
            sx={{ minWidth: 0, ml: "0 !important" }}
          >
            <Iconify
              icon="material-symbols:attach-file-add-rounded"
              width={28}
            />
          </Button>
          <Button
            size="large"
            color="inherit"
            sx={{ minWidth: 0, ml: "0 !important" }}
          >
            <Iconify icon="material-symbols:image" width={28} />
          </Button> */}
          <TextField
            className="rounded"
            size="small"
            InputProps={{
              endAdornment: (
                <Button
                  onClick={sendMessage}
                  className="btn-orange"
                  variant="contained"
                  sx={{ borderRadius: 50 }}
                >
                  <Iconify icon="wpf:sent" />
                </Button>
              ),
            }}
            ref={ref}
            onBlur={handleClickOut}
            onFocus={handleClick}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Nhập tin nhắn ....."
            sx={{
              width: "100%",
              ml: 2,
              borderRadius: 50,
              pr: 1,
            }}
          />
        </CardActions>
      </Card>
    </>
  );
}
