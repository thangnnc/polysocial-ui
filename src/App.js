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

  const [listResponse, setListResponse] = useState();

  const [count, setCount] = useState(0);

  const [groupList, setGroupList] = useState([]);

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

  const [listeningDeleteMember, setListeningDeleteMember] = useState(false);

  const [listeningDeleteMemberAll, setListeningDeleteMemberAll] =
    useState(false);

  const [listeningDeleteFriend, setListeningDeleteFriend] = useState(false);

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

  ///listeningDeleteFriend
  try {
    socket.on("request_delete_friend", (data) => {
      setListSocket(data);
      setListeningDeleteFriend(true);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningDeleteFriend) {
        fetchNameGroup(listSocket);
        getAllNotification();
        getAllFriend(listSocket);
        setListeningDeleteFriend(false);
      }
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningDeleteFriend]);

  ///listeningDeleteMemberAll
  try {
    socket.on("reset_delete_member", (data) => {
      setListSocket(data);
      setListeningDeleteMemberAll(true);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningDeleteMemberAll) {
        fetchNameGroup(listSocket);
        setListeningDeleteMemberAll(false);
      }
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningDeleteMemberAll]);

  ///listeningDeleteMember
  try {
    socket.on("reset_delete_member_notification", (data) => {
      setListSocket(data);
      setListeningDeleteMember(true);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningDeleteMember) {
        getAllNotification();
        fetchNameGroup(listSocket);
        setListeningDeleteMember(false);
      }
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningDeleteMember]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningConnect]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningCreateGroup]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningCreateMemberGroup]);

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
        fetchNameGroup(listSocket);
        getAllNotification();
        setListeningNameMessage(false);
      }
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningNameMessage]);

  //listeningDisconnect
  try {
    socket.on("server_disconnect_listSocket", (data) => {
      setListeningDisconnect(true);
      setListSocket(data);
    });
  } catch (error) {}

  useEffect(() => {
    if (listeningDisconnect) {
      fetchNameGroup(listSocket);
      getAllFriend(listSocket);
      setListeningDisconnect(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningDisconnect]);

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
        getRequestFriend();
        fetchNameGroup(listSocket);
        setListeningAccept(false);
      }
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningAccept]);

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
        getRequestFriend();
        setListeningRequestAccept(false);
      }
    } catch (error) {}
  }, [listeningRequestAccept]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningAllNotification]);

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

  const getRequestFriend = async () => {
    const response = await Axios.Friends.getAllRequestAddFriend();
    setShowRequestFriend(response);
  };

  const getRoomId = async () => {
    const response = await Axios.Messages.getNameGroupDESC({ userId: 1 });
    for (let index = 0; index < response.data.length; index++) {
      const element = response.data[index];
      listRoomId.push(element.roomId * 192.168199);
    }

    setListResponse(response);
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
      var contactId;
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

      for (let js = 0; js < listFrindObject.listContact.length; js++) {
        const elementk = listContact[js];
        if (elementk[4] === account.email) {
          contactId = elementk[0];
        }
      }
      listFrindObject.contactId = contactId;
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
