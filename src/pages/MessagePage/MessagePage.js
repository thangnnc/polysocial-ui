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
// import { useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AvatarStatus from "../../utils/AvatarStatus/AvatarStatus";
import Iconify from "../../components/iconify";
import MyMessage from "./components/MyMessage";
import OtherMessage from "./components/OtherMessage";
import AlertMessage from "./components/AlertMessage";
import TimeLineMessage from "./components/TimeLineMessage";
import EnteringMessage from "./components/EnteringMessage";
import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import Asios from "../../utils/Axios";
import useLogin from "../../utils/Login/useLogin";

// import { io } from "socket.io-client";

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

const friend = {
  avatar:
    "https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-gai-xinh-de-thuong-nhat-1-600x600.jpg",
  fullName: "♥ Gấu Chó ♥",
  email: "gaucho@gmail.com",
  isActive: true,
};


export default function MessagePage() {
  const { roomId } = useParams();
  const location = useLocation();
  const [room, setRoom] = useState([]);

  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const [lastList, setLastList] = useState(false);
  const [limit, setLimit] = useState(15);
  // const [totalMembers, setotalMembers] = useState([]);
  // const [listContact, setListContact] = useState([]);
  const { account,socket } = useLogin();
  const [messageList, setMessageList] = useState([{}]);
  const [listcontactId, setListcontactId] = useState([]);
  const [contactId, setcontactId] = useState([]);
  const [listContacts, setListContacts] = useState([]);
  const [message, setMessage] = useState("");
  const [userTyping, setUserTyping] = useState([]);
  const [accountTyping, setAccountTyping] = useState([]);
  const messageRef = useRef();
  const ref = useRef(null);

  let group = location.state.group;

  useEffect(() => {
    setUserTyping("");
    // socket = io(CONNECTTION_PORT);
    setRoom(roomId);

    try {
      for (let index = 0; index < group.listContacts.length; index++) {
        const element = group.listContacts[index];
        if (element[1] === account.studentCode) {
          setcontactId(element[0]);
          break;
        } else {
        }
      }
      var listStudentCode = [];
      var objectStudentCode = {};
      for (let index = 0; index < group.listContacts.length; index++) {
        const element = group.listContacts[index];
        var objectStudentCode = element;
        listStudentCode.push(objectStudentCode);
      }

      setListContacts(listStudentCode);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getMessage();
    // if (messageRef.current) {
    //   messageRef.current.scrollIntoView(
    //     {
    //       behavior: 'smooth',
    //       block: 'end',
    //       inline: 'nearest'
    //     })
    // }
  }, [roomId]);

  
  
  // useEffect(()=>{
  //   if (messageRef.current) {
  //     messageRef.current.scrollIntoView(
  //       {
  //         behavior: 'smooth',
  //         block: 'end',
  //         inline: 'nearest'
  //       })
  //   }
  // },[])

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
        // console.log("el---",element)
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
      setMessageList([...listContent.reverse(),...messageList]);

    };
    if (!lastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, lastList, prevPage, messageList]);



  useEffect(() => {
    socket.on("recevie_message", (data) => {
      setMessageList([...messageList, data]);
    });

  }, [messageList]);

  const getMessage = async () => {
    try {
      console.log("roomId,,,,", roomId);
      setRoom(roomId);
      socket.emit("join_room", roomId);
      const data = {
        page: currPage,
        limit: limit,
        roomId: roomId,
      };
      const response = await Asios.Messages.getMessage(data);
      setRoom(roomId);
      console.log("reponse messs",response.data)
      const arr = [];
      for (let index = 0; index < group.listContacts.length; index++) {
        const element = group.listContacts[index];
        if (element[1] === account.studentCode) {
          const data = {
            contactId: element[0],
          };
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
      // console.log("listtttt", arr);

      try {
        const listContent = [];
        for (let index = 0; index < response.data.length; index++) {
          const listContentObject = {};
          const element = response.data[index];
          // console.log("el---",element)
          listContentObject.isAdmin = element.isAdmin;
          listContentObject.avatar = element.avatar;
          listContentObject.createdDate = element.createdDate;
          listContentObject.fullName = element.fullName;
          listContentObject.statusCreated = element.statusCreated;
          listContentObject.studentCode = element.studentCode;
          listContentObject.email = element.email;
          listContentObject.messageRecall = element.messageRecall
          if(element.statusCreated===false){
            if(element.studentCode===account.studentCode){
              listContentObject.content ="";
            }else{
            listContentObject.content = element.content;
            }
            // console.log('runnn')
          }else{
            listContentObject.content = element.content;

          }
          listContent.push(listContentObject);
        }
      console.log("listContent",listContent)

        setMessageList(listContent.reverse());
      } catch (error) {}
      // console.log("resp", response);
    } catch (error) {
      console.log("Failed to fetch post list: ", error);
    }
  };

  useEffect(() => {
    socket.on(room + "user-typing", (account, data) => {
      // setStuCode(stuCode);
      setUserTyping(data);
      setAccountTyping(account);
    });
  });

  useEffect(() => {
    socket.on(room + "stop-user-typing", (data) => {
      setUserTyping(data);
    });
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
          statusCreated:true,
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

    // setStatus(true);
  };


  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop===0) {
        setCurrPage(currPage + 1);
      }
    }
  };


  // const { roomId } = useParams();
  return (
    <>
      <Helmet>
        <title> Message | Poly Social</title>
      </Helmet>
      <Card sx={{ minHeight: "72vh" }}>
        <CardHeader
          avatar={
            <AvatarStatus
              src={group.avatar}
              isActive={friend.isActive}
              sx={{ width: "46px", height: "46px" }}
            />
          }
          action={
            <IconButton nButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={<Typography fontWeight={700}>{group.name}</Typography>}
          subheader={friend.isActive ? "Đang hoạt động" : "Không hoạt động"}
        />
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
                    message={value.statusCreated?'':value.content}
                  />
                    {/* <TimeLineMessage message={"11:00"} />
                  <MyMessage message={"Hi! Em ngon vậy"} /> */}
                    <MyMessage
                      message={
                        value.statusCreated?(value.studentCode === account.studentCode
                          ? value.content
                          : ""):''
                        
                      }
                      showAvatar
                      createdDate={value.createdDate}
                    />
                    <OtherMessage
                      account={value.fullName + " (" + value.email + ")"}
                      avatar={value.avatar}
                      message={
                        value.statusCreated?(value.studentCode !== account.studentCode
                          ? value.content
                          : ""):''
                       
                      }
                      showAvatar
                      createdDate={value.createdDate}
                    />
                    {/* <TimeLineMessage message={"16:00"} /> */}
                    {/* <MyMessage message={"Em ăn cơm chưa?"} /> */}
                    {/* <MyMessage message={"Em ăn cơm chưa?"} showAvatar /> */}
                    {/* <OtherMessage account={friend} message={"Chưa"} /> */}
                    {/* <OtherMessage
                    account={friend}
                    message={"Anh chở e đi ăn đi <3"}
                    showAvatar
                  /> */}
                    {/* <MyMessage message={"Méo :V"} showAvatar /> */}
                    {/* <AlertMessage message={"♥ Gấu Chó ♥ đã chặn bạn."} /> */}
                  </div>
                );
              })}
        </CardContent>
        {/* <EnteringMessage account={friend} /> */}
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
