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
  // const [listOnline, setListOnline] = useState();
  const [listFriends, setListFriend] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showRequestFriend, setShowRequestFriend] = useState([]);
  const [listSocket, setListSocket] = useState();
  const [listeningConnect, setListeningConnect] = useState(false);
  const [listeningRequestAccept, setListeningRequestAccept] = useState(false);
  const [listeningDisconnect, setListeningDisconnect] = useState(false);
  const [listeningAccept, setListeningAccept] = useState(false);
  const [listeningAllNotification, setListeningAllNotification] =
    useState(false);
  const [listeningOneNotification, setListeningOneNotification] =
    useState(false);
  const [listeningNameMessage, setListeningNameMessage] = useState(false);
  const [listeningCreateMemberGroup, setListeningCreateMemberGroup] =
    useState(false);
  const [listeningCreateGroup, setListeningCreateGroup] = useState(false);

  const listRoomId = [];
  useEffect(() => {
    if (account) {
      getRoomId();
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
  //listeningSocket
  try {
    socket.on("server_send_listSocket", (data) => {
      setListeningConnect(true);
      setListSocket(data);
      // setListOnline(data);
    });
  } catch (error) {}

  useEffect(() => {
    if (listeningConnect) {
      fetchNameGroup(listSocket);
      getRequestFriend();
      // getNameGroupDESC({ userId: 1 }, listSocket);
      getAllFriend(listSocket);
      getAllNotification();
      setListeningConnect(false);
    }
  }, [listeningConnect]);
  //-------------------------------------------------------------------------------------------------------------
  ///listeningCreateGroup
  try {
    socket.on("reset_create_group_successful", (data) => {
      setListeningCreateGroup(true);
      setListSocket(data);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningCreateGroup) {
        fetchNameGroup(listSocket);
        getAllNotification();

        setListeningCreateGroup(false);
      }
    } catch (error) {}
  }, [listeningCreateGroup]);
  //-------------------------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------------------------
  ///listeningCreateMemberGroup
  try {
    socket.on("reset_member_group_successful", (data) => {
      setListeningCreateMemberGroup(true);
      setListSocket(data);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningCreateMemberGroup) {
        // roomDESC(listSocket);
        fetchNameGroup(listSocket);
        getAllNotification();
        setListeningCreateMemberGroup(false);
      }
    } catch (error) {}
  }, [listeningCreateMemberGroup]);
  //-------------------------------------------------------------------------------------------------------------

  ///listeningNameMessage
  try {
    socket.on("recevie_message_name", (data) => {
      setListeningNameMessage(true);
      setListSocket(data);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningNameMessage) {
        // roomDESC(listSocket);
        fetchNameGroup(listSocket);
        getAllNotification();
        setListeningNameMessage(false);
      }
    } catch (error) {}
  }, [listeningNameMessage]);
  //-------------------------------------------------------------------------------------------------------------

  //listeningDisconnect
  try {
    socket.on("server_disconnect_listSocket", (data) => {
      setListeningDisconnect(true);
      setListSocket(data);
      // setListOnline(data);
    });
  } catch (error) {}

  useEffect(() => {
    if (listeningDisconnect) {
      //code==
      setListeningDisconnect(false);
    }
  }, [listeningDisconnect]);
  //-------------------------------------------------------------------------------------------------------------

  ///listeningAccept
  try {
    socket.on("successful_accept", (data) => {
      setListSocket(data);
      setListeningAccept(true);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningAccept) {
        getAllNotification();
        getAllFriend(listSocket);
        getRequestFriend(); //
        // roomDESC(listSocket);
        fetchNameGroup(listSocket);
        setListeningAccept(false);
      }
    } catch (error) {}
  }, [listeningAccept]);

  //-------------------------------------------------------------------------------------------------------------

  ///listeningRequestAccept
  try {
    socket.on("request_accept", (data) => {
      setListeningRequestAccept(true);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningRequestAccept) {
        getAllNotification();
        getRequestFriend(); //
        setListeningRequestAccept(false);
      }
    } catch (error) {}
  }, [listeningRequestAccept]);
  //-------------------------------------------------------------------------------------------------------------
  ///listeningAllNotification
  try {
    socket.on("reset_one_account_getAllNotification", (data) => {
      setListeningAllNotification(true);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningAllNotification) {
        updateAllNotification();
        setListeningAllNotification(false);
      }
    } catch (error) {}
  }, [listeningAllNotification]);
  //-------------------------------------------------------------------------------------------------------------
  ///listeningOneNotification
  try {
    socket.on("reset_one_account_get_One_All_Notification", (data) => {
      setListeningOneNotification(true);
    });
  } catch (error) {}
  useEffect(() => {
    try {
      if (listeningOneNotification) {
        getAllNotification();
        setListeningOneNotification(false);
      }
    } catch (error) {}
  }, [listeningOneNotification]);
  //-------------------------------------------------------------------------------------------------------------

  const getRequestFriend = async () => {
    const response = await Axios.Friends.getAllRequestAddFriend();
    setShowRequestFriend(response);
  };

  const roomDESC = async (onl) => {
    if (account) {
      const responseDESC = await Axios.Messages.getNameGroupDESC({ userId: 1 });
      const arr = [];
      try {
        for (let index = 0; index < responseDESC.data.length; index++) {
          const listNameGr = {};
          const element = responseDESC.data[index];
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
          listNameGr.userId = element.userId;
          listNameGr.contactId = element.contactId;

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
      console.log("listConetnt", listContent);
      setGroupList(listContent);
    }
  };

  const getRoomId = async () => {
    const response = await Axios.Messages.getNameGroupDESC({ userId: 1 });
    for (let index = 0; index < response.data.length; index++) {
      const element = response.data[index];
      listRoomId.push(element.roomId * 192.168199);
    }

    setListResponse(response);
  };

  const getNameGroupDESC = async (data1, onl) => {
    if (account) {
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
          listNameGr.userId = element.userId;
          listNameGr.contactId = element.contactId;

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
        listContentObject.userId = element.userId;
        listContentObject.contactId = element.contactId;
        listContent.push(listContentObject);
        if (element.status === false) {
          counts++;
        }
      }
      setCount(counts);
      console.log("listConetnt 2", listContent);

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
      listNameGr.userId = element.userId;
      listNameGr.contactId = element.contactId;
      listNameGr.userId = element.userId;
      listNameGr.contactId = element.contactId;

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
      listContentObject.userId = element.userId;
      listContentObject.contactId = element.contactId;

      listContent.push(listContentObject);
      if (element.status === false) {
        counts++;
      }
    }
    setCount(counts);
    console.log("listConetnt 3", listContent);

    setGroupList(listContent);
  };

  const getAllFriend = async (onl) => {
    const mySetOnline = new Set();
    for (let i = 0; i < onl.length; i++) {
      const element2 = onl;
      mySetOnline.add(element2[i].email);
    }
    const listFriends = [];
    const response = await Axios.Friends.getAllFriend(account.userId);
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

  const updateAllNotification = async () => {
    const response = await Axios.Notifications.updateAllNotifications();
    if (response.status === 200) {
      getAllNotification();
    } else {
    }
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
          listOnline={listSocket}
          listResponse={listResponse}
          notifications={notifications}
          showRequestFriend={showRequestFriend}
        />
      </ThemeProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
