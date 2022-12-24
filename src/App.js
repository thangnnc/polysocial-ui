// routes
import Router from "./routes";
// components
import ScrollToTop from "./components/scroll-to-top";
import { ThemeProvider } from "@mui/material/";
import theme from "./utils/Theme/theme";
import { BrowserRouter } from "react-router-dom/dist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLogin from "./utils/Login/useLogin";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Axios from "./utils/Axios";

function App() {
  const { account } = useLogin();
  const [socket, setsocket] = useState();
  // const data1 = ;
  const [listResponse, setListResponse] = useState();
  const [count, setCount] = useState(0);
  const [groupList, setGroupList] = useState([]);
  const [listOnline, setListOnline] = useState();
  const [listFriends, setListFriend] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [listening, setListening] = useState(false);
  const [listSocket, setListSocket] = useState();


  // const [status, setStatus] = useState(false);
  //messgage
  const listRoomId = [];
  useEffect(() => {
    const getRoomId = async () => {
      const response = await Axios.Messages.getNameGroupDESC({ userId: 1 });
      for (let index = 0; index < response.data.length; index++) {
        const element = response.data[index];
        listRoomId.push(element.roomId * 192.168199);
      }
      setListResponse(response);
    };
    if (account) {
      getRoomId();
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      if (account) {
        const CONNECTTION_PORT = "localhost:3002";
        setsocket(
          io(CONNECTTION_PORT).emit("connectUser", account, listRoomId)
        );
      } else {
      }
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  try {
    socket.on('server-send-listSocket-room', (data) => {
      setListening(true);
      setListSocket(data);
    });
  } catch (error) {
    
  }

  useEffect(() => {
    if (listening) {
      // socket.on("server-send-listSocket-room", function (data) {
        console.log("server-send-listSocket-room",listSocket)
        setListOnline(listSocket);
        // fetchNameGroup(data);
        // getNameGroupDESC({ userId: 1 }, data);
        // getAllFriend(data);
        // getAllNotification();
      // });
    }
  }, [listening]);

  // useEffect(() => {
  //   if (account) {
  //     try {
  //       socket.on("server-send-listSocket-room", function (data) {
  //         console.log("server-send-listSocket-room",data)
  //         setListOnline(data);
  //         // fetchNameGroup(data);
  //         // getNameGroupDESC({ userId: 1 }, data);
  //         // getAllFriend(data);
  //         // getAllNotification();
  //       });
  //     } catch (error) {}
  //   } else {
  //   }
  // });

  useEffect(() => {
    if (account) {
      try {
       
        socket.on("server_send_disconnect_listSocket", function (data) {
          console.log("server_send_disconnect_listSocket",data)
          // setListOnline(data);
          // fetchNameGroup(data);
          // getNameGroupDESC({ userId: 1 }, data);
          // getAllFriend(data);
          // getAllNotification();
        });
      } catch (error) {}
    } else {
    }
  });

  

  useEffect(() => {
    try {
      socket.on("reset_nameGroup", function (listSocket) {});
    } catch (error) {}
  });

  useEffect(() => {
    try {
      socket.on("reset_ProfilePage_delete", function (listSocket) {
        getAllFriend(listSocket);

        fetchNameGroup(listSocket);
      });
    } catch (error) {}
  });

  const getNameGroupDESC = async (data1, onl) => {
    if (account) {
      // console.log("run getNameGroupDESC APP");
      const arr = [];
      try {
        for (let index = 0; index < listResponse.data.length; index++) {
          const listNameGr = {};
          const element = listResponse.data[index];
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
        for (let index = 0; index < onl.length; index++) {
          const element2 = onl[index];
          listOnline.push(element2.email);
        }
        // }

        for (let index = 0; index < listOnline.length; index++) {
          mySetOnline.delete(account.email);
          if (mySetOnline.has(listOnline[index])) {
            listContentObject.isActive = false;
            break;
          } else {
            listContentObject.isActive = true;
          }
        }
        if (listOnline.length === 0) {
          listContentObject.isActive = true;
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
    }
  };

  const fetchNameGroup = async (listSocket) => {
    const arr = [];
    const response = await Axios.Messages.getNameGroupDESC({ userId: 1 });
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
      const listSockets = [];

      for (let index = 0; index < listSocket.length; index++) {
        const element2 = listSocket[index];
        listSockets.push(element2.email);
      }

      for (let index = 0; index < listSockets.length; index++) {
        mySetOnline.delete(account.email);
        if (mySetOnline.has(listSockets[index])) {
          listContentObject.isActive = false;
          break;
        } else {
          listContentObject.isActive = true;
        }
      }
      if (listSockets.length === 0) {
        listContentObject.isActive = true;
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

  const getAllFriend = async (onl) => {
    const mySetOnline = new Set();
    for (let i = 0; i < onl.length; i++) {
      const element2 = onl;
      mySetOnline.add(element2[i].email);
    }
    const listFriends = [];
    const response = await Axios.Friends.getAllFriend();

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
    setListFriend(listFriends);
  };

  const getAllNotification = async () => {
    const response = await Axios.Notifications.getAllNotifications();
    setNotifications(response);
  };

  //
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ScrollToTop />
        <Router
          socket={socket}
          groupList={groupList}
          count={count}
          listFriends={listFriends}
          listOnline={listOnline}
          listResponse={listResponse}
        />
      </ThemeProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
