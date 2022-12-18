import { Avatar, Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "./../../../../utils/Axios/index";

export default function FriendSearchBox({ searchData, sockets }) {
  const socket = sockets.sockets;

  const { avatar, fullName, email, status, userId, roomId, listContact } =
    searchData;
  // console.log("searchData",searchData)
  var listArr = [];
  try {
    for (let i = 0; i < listContact.length; i++) {
      var arr = [];
      const element2 = listContact[i];
      arr.push(element2.contactId);
      arr.push(element2.studentCode);
      arr.push(element2.avatar);
      arr.push(element2.fullName);
      listArr.push(arr);
    }
  } catch (error) {
    
  }
  const handleAddFriend = async () => {
    const response = await Axios.Friends.addFriend(searchData);
    if (response.status === 200) {
      await socket.emit("add-friend");
      toast.success("Gửi lời mời kết bạn thành công");
    } else {
      toast.error("Gửi lời mời kết bạn thất bại");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          "&:hover": {
            bgcolor: "#ffddc7",
            borderColor: "#ff7b29",
          },
        }}
      >
        <Box display={"flex"} maxWidth="70%">
          <Avatar alt={fullName} src={avatar} sx={{ width: 48, height: 48 }} />
          <Box sx={{ maxWidth: "80%", ml: 2 }}>
            <Link
              to={`/my-profile/${userId}`}
              state={{
                isActive: false,
                email: "hoangduy",
                roomId: roomId,
                listContacts: listArr,
              }}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography variant="subtitle2" noWrap fontSize={16}>
                {fullName}
              </Typography>
            </Link>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {email}
            </Typography>
          </Box>
        </Box>
        {!status && (
          <Button
            className="btn-orange"
            variant="contained"
            sx={{ borderRadius: 50 }}
            onClick={handleAddFriend}
          >
            Kết Bạn
          </Button>
        )}
      </Box>
      <Divider />
    </>
  );
}
