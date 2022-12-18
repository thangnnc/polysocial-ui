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
  const location = useLocation();
  const [room, setRoom] = useState([]);
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const [lastList, setLastList] = useState(false);
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
  const messageRef = useRef();
  const ref = useRef(null);
  const socket = props.socket.socket;
  let group = location.state.group;

  useEffect(() => {
    try {
      socket.on("server-send-listSocket", function (dataOnline) {
        console.log("run server-send-listSocket");
        const fetDataMessage = async () => {
          try {
            setRoom(roomId);
            socket.emit("join_room", roomId);
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
                const responseUpdateviewed =
                  await Asios.Messages.updateviewedStatus(data);
                if (responseUpdateviewed) {
                  await socket.emit("isSeen");
                }
                // break;
              } else {
                arr.push(element[0]);
              }
            }
            setListcontactId(arr);

            try {
              const listContent = [];
              const listOnline = [];
              for (let index = 0; index < dataOnline.length; index++) {
                const element2 = dataOnline;
                listOnline.push(element2[index].email);
              }
              console.log("listOnline", listOnline);
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
                    if (listOnline.includes(element.email) === true) {
                      isActive = true;
                      if (
                        element.email === account.email &&
                        listOnline.length < 2
                      ) {
                        setIsActiveOther(false);
                      } else {
                        setIsActiveOther(true);
                      }
                    } else {
                      isActive = false;
                    }
                    listContentObject.isActive = isActive;
                  }
                  listContent.push(listContentObject);
                } catch (error) {}
                //
              }
              setMessageList(listContent.reverse());
            } catch (error) {}
          } catch (error) {}
        };
        fetDataMessage();
      });
    } catch (error) {}
  });

  useEffect(() => {
    setUserTyping("");
    setRoom(roomId);
  }, [roomId]);

  useEffect(() => {
    getMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        page: currPage,
        limit: limit,
        roomId: roomId,
      };
      const response = await Asios.Messages.getMessage(data);
      if (!response.data.length) {
        setLastList(true);
        return;
      }
      setPrevPage(currPage);
      const listContent = [];
      for (let index = 0; index < response.data.length; index++) {
        const listContentObject = {};
        const element = response.data[index];
        listContentObject.isAdmin = element.isAdmin;
        listContentObject.avatar = element.avatar;
        listContentObject.content = element.content;
        listContentObject.createdDate = element.createdDate;
        listContentObject.fullName = element.fullName;
        listContentObject.statusCreated = element.statusCreated;
        listContentObject.studentCode = element.studentCode;
        listContentObject.email = element.email;
        listContent.push(listContentObject);
      }
      setMessageList([...listContent.reverse(), ...messageList]);
    };
    if (!lastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, lastList, prevPage, messageList, limit, roomId]);
  //
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
      socket.emit("join_room", roomId);
      const data = {
        page: currPage,
        limit: limit,
        roomId: roomId,
      };
      const response = await Asios.Messages.getMessage(data);
      setRoom(roomId);
      const arr = [];
      setListContacts(group.listContacts);
      console.log("run get message", group.listContacts);

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

      try {
        const listContent = [];
        const listOnline = [];
        for (let index = 0; index < group.listOnline.length; index++) {
          const element2 = group.listOnline[index];
          listOnline.push(element2.email);
        }
        listOnline.splice(listOnline.indexOf(account.email), 1);

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
              if (listOnline.includes(element.email) === true) {
                isActive = true;
                if (element.email === account.email && listOnline.length < 2) {
                  setIsActiveOther(false);
                } else {
                  setIsActiveOther(true);
                }
              } else {
                isActive = false;
              }
              listContentObject.isActive = isActive;
            }
            listContent.push(listContentObject);
          } catch (error) {}
          //
        }
        console.log("---", listContent);
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
    socket.emit("I'm typing", room, account);
  };
  const handleClickOut = () => {
    socket.emit("I stopped typing", room);
  };

  const sendMessage = async () => {
    try {
      let messageContent = {
        room: room,
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
      createMessage();
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

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop } = listInnerRef.current;
      if (scrollTop === 0) {
        setCurrPage(currPage + 1);
      }
    }
  };

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
            action={
              <IconButton nButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
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
          onScroll={onScroll}
          ref={listInnerRef}
        >
          {messageList.map((value, key) => {
            return (
              <div ref={messageRef}>
                <AlertMessage
                  message={value.statusCreated ? "" : value.content}
                />
                {/* <AlertMessage
                  message={
                    value.statusCreated
                      ? value.statusCreated+ 0.1 < value.statusCreated 
                        ? "11:00"
                        : ""
                      : ""
                  }
                /> */}

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
                {/* <TimeLineMessage message={"16:00"} /> */}
                {/* <MyMessage message={"Em ăn cơm chưa?"} showAvatar /> */}
                {/* <OtherMessage account={friend} message={"Chưa"} /> */}
                {/* <OtherMessage
                    account={friend}
                    message={"Anh chở e đi ăn đi <3"}
                    showAvatar
                  /> */}
                {/* <MyMessage message={"Méo :V"} showAvatar /> */}
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
          <Button
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
          </Button>
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
