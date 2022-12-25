import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Popover,
  Tab,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Iconify from "../../components/iconify/Iconify";
import Axios from "./../../utils/Axios/index";
import Infomation from "./components/Infomation";
import ListFriend from "./components/ListFriend";
import useLogin from "../../utils/Login/useLogin";
import { toast } from "react-toastify";
import { DialogEditAccount } from "./components/DialogEditAccount";
import ChangePassword from "./components/ChangePassword";

export default function ProfilePage(props) {
  const socket = props.socket.socket;

  const location = useLocation();

  const { account } = useLogin();

  const { userId } = useParams();

  const [user, setUser] = useState({});

  const [userDetails, setUserDetails] = useState({});

  const [value, setValue] = useState("1");

  const [isEdit, setIsEdit] = useState(false);

  const [listeningAccept, setListeningAccept] = useState(false);

  const [listeningRequestAccept, setListeningRequestAccept] = useState(false);

  const [listeningDeleteFriend, setListeningDeleteFriend] = useState(false);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  let profilePage;

  try {
    profilePage = location.state;
  } catch (error) {}

  let online;

  let roomId;

  let listContacts;

  try {
    roomId = profilePage.roomId;
    listContacts = profilePage.listContacts;
    online = props.socket.listOnline;
  } catch (error) {}

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  ///listeningDeleteFriend
  try {
    socket.on("request_delete_friend_profile", (data) => {
      setListeningDeleteFriend(true);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningDeleteFriend) {
        getOneUser(userId);
        setListeningDeleteFriend(false);
      }
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningDeleteFriend]);

  try {
    socket.on("request_accept", function () {
      setListeningRequestAccept(true);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningRequestAccept) {
        getOneUser(userId);
        setListeningRequestAccept(false);
      }
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningRequestAccept]);

  ///listeningAccept
  try {
    socket.on("successful_accept", (data) => {
      setListeningAccept(true);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningAccept) {
        getOneUser(userId);
        setListeningAccept(false);
      }
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningAccept]);

  useEffect(() => {
    getOneUser(userId);
  }, [userId]);

  const getOneUser = async (userId) => {
    if (userId !== undefined) {
      const response = await Axios.Accounts.getOneUser(userId);
      const responseDetail = await Axios.Accounts.getOneUserDetail(userId);
      setUserDetails(responseDetail);
      setUser(response);
    } else {
      setUser(null);
    }
  };

  const handleAddFriend = async () => {
    const response = await Axios.Friends.addFriend(user);
    if (response.status === 200) {
      await socket.emit("add_friend", user.userId);
      toast.success("Gửi lời mời kết bạn thành công");
      getOneUser(userId);
    } else {
      toast.error("Gửi lời mời kết bạn thất bại");
    }
  };

  const handleDeleteFriend = async () => {
    await Axios.Friends.deleteOneAllRequestAddFriend({
      userId: userId,
    });
    await socket.emit("delete_friend", user.userId);
    getOneUser(userId);
    toast.success("Huỷ kết bạn thành công");
  };

  const handleOneDeleteFriend = async () => {
    const data = {
      userInviteId: user.userInviteId,
      userConfirmId: user.userConfirmId,
    };
    const response = await Axios.Friends.deleteAllRequestAddFriend(data);
    if (response.status === 200) {
      await socket.emit("add_friend", user.userId);
      getOneUser(userId);
      toast.success("Huỷ lời mời kết bạn thành công");
    } else {
      toast.success("Huỷ lời mời kết bạn thất bại");
    }
  };

  const pathMessage = "/message/room/";

  const handleOnClick = async (e, avatar, name, isActive) => {
    let group = {};
    group.listContacts = listContacts;
    group.name = name;
    group.avatar = avatar;
    group.isActive = isActive;
    group.listOnline = online;
    navigate(pathMessage + roomId, {
      state: {
        group: group,
      },
    });
  };

  const handleConfirmFriend = async () => {
    const response = await Axios.Friends.acceptFriend(user);
    if (response.status === 200) {
      getOneUser(userId);
      await socket.emit("accept_friend", user.userId);
      toast.success("Đã thêm bạn thành công");
    } else {
      toast.error("Đã thêm bạn thất bại");
    }
  };

  const handleChangeUser = () => {
    getOneUser(userId);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "80%" }}>
        <Card
          sx={{
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              p: 0,
            }}
          >
            <Box
              sx={{
                width: "100%",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  minHeight: 200,
                  backgroundColor: "rgb(207, 217, 222)",
                }}
              >
                <Box sx={{ position: "absolute", mt: 14, ml: 4 }}>
                  <Avatar
                    src={user?.avatar}
                    alt={user?.fullName}
                    isActive={true}
                    sx={{
                      width: 130,
                      height: 130,
                      border: "2px solid #ff7f30",
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  minHeight: 30,
                  mt: 7,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ ml: 4 }}>
                  <Typography sx={{ fontWeight: "bold", fontSize: "20" }}>
                    {user?.fullName}
                  </Typography>
                  <Typography sx={{ fontSize: "18", color: "#9b9b9b" }}>
                    {user?.email}
                  </Typography>
                </Box>
                <Box sx={{ mr: 4 }}>
                  {account?.email === user?.email && (
                    <Button
                      variant="contained"
                      sx={{
                        background: "#f97c2e",
                        borderRadius: 2,
                        mr: 2,
                      }}
                      onClick={() => setIsEdit(true)}
                    >
                      <Iconify icon={"material-symbols:edit"} />
                      <Typography sx={{ fontWeight: "bold", ml: 1 }}>
                        Chỉnh sửa thông tin
                      </Typography>
                    </Button>
                  )}
                  {user.status === 2 && account.userId !== user.userId && (
                    <Button
                      variant="contained"
                      sx={{
                        background: "#f97c2e",
                        borderRadius: 2,
                        mr: 2,
                      }}
                      onClick={handleAddFriend}
                    >
                      <Iconify icon={"material-symbols:person-add"} />
                      <Typography sx={{ fontWeight: "bold", ml: 1 }}>
                        Thêm bạn
                      </Typography>
                    </Button>
                  )}
                  {user.status === 1 && (
                    <>
                      <Button
                        variant="contained"
                        sx={{
                          background: "#D8DADF",
                          color: "black",
                          borderRadius: 2,
                          mr: 2,
                          "&:hover": {
                            background: "#D8DADF",
                          },
                        }}
                        aria-describedby={id}
                        onClick={handleClick}
                      >
                        <Iconify icon={"bi:person-check-fill"} />
                        <Typography sx={{ fontWeight: "bold", ml: 1 }}>
                          Bạn bè
                        </Typography>
                      </Button>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        sx={{
                          "& .MuiPopover-paper": {
                            mt: 1,
                            height: "max-content",
                            borderRadius: 1,
                            ml: 4,
                          },
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            width: "100%",
                            background: "initial",
                            color: "black",
                            boxShadow: "none",
                            mr: 2,
                            p: 1,
                            "&:hover": {
                              background: "#D8DADF",
                            },
                          }}
                          onClick={handleDeleteFriend}
                        >
                          <Iconify icon={"bi:person-check-fill"} />
                          <Typography sx={{ fontWeight: "bold", ml: 1 }}>
                            Huỷ kết bạn
                          </Typography>
                        </Button>
                      </Popover>

                      <Button
                        variant="contained"
                        sx={{
                          background: "#1b74e4",
                          color: "white",
                          borderRadius: 2,
                        }}
                        onClick={(e) => {
                          handleOnClick(e, user?.avatar, user?.fullName, true);
                        }}
                      >
                        <Iconify icon={"mdi:facebook-messenger"} />
                        <Typography sx={{ fontWeight: "bold", ml: 1 }}>
                          Nhắn tin
                        </Typography>
                      </Button>
                    </>
                  )}
                  {user.status === 0 &&
                    user.userConfirmId !== account.userId && (
                      <Button
                        variant="contained"
                        sx={{
                          background: "#f97c2e",
                          borderRadius: 2,
                          mr: 2,
                        }}
                        onClick={handleOneDeleteFriend}
                      >
                        <Iconify icon={"material-symbols:person-add"} />
                        <Typography sx={{ fontWeight: "bold", ml: 1 }}>
                          Huỷ
                        </Typography>
                      </Button>
                    )}
                  {user.status === 0 &&
                    user.userConfirmId === account.userId && (
                      <Button
                        variant="contained"
                        sx={{
                          background: "#f97c2e",
                          borderRadius: 2,
                          mr: 2,
                        }}
                        onClick={handleConfirmFriend}
                      >
                        <Iconify icon={"material-symbols:person-add"} />
                        <Typography sx={{ fontWeight: "bold", ml: 1 }}>
                          Chấp nhận
                        </Typography>
                      </Button>
                    )}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Box
          sx={{
            width: "100%",
            typography: "body1",
          }}
        >
          <TabContext value={value}>
            <Box
              sx={{
                borderColor: "divider",
                background: "white",
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
                pl: 1,
                boxShadow:
                  "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
              }}
            >
              <TabList
                onChange={handleChange}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#f97c2e",
                  },
                }}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="Thông tin"
                  value="1"
                  sx={{ fontSize: 15, fontWeight: "bold" }}
                />
                <Tab
                  label="Bạn bè"
                  value="2"
                  sx={{ fontSize: 15, fontWeight: "bold" }}
                />
                {account?.email === user?.email && (
                  <Tab
                    label="Đổi mật khẩu"
                    value="3"
                    sx={{ fontSize: 15, fontWeight: "bold" }}
                  />
                )}
              </TabList>
            </Box>
            <Box
              sx={{
                background: "white",
                width: "100%",
                height: 450,
                mt: 2,
                borderRadius: "12px",
                boxShadow:
                  "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
              }}
            >
              <TabPanel value="1">
                <Infomation user={user} userDetails={userDetails} />
              </TabPanel>
              {user.status === 1 || account?.email === user?.email ? (
                <>
                  <TabPanel value="2">
                    <ListFriend userId={user.userId} />
                  </TabPanel>
                </>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "22",
                      fontWeight: "bold",
                      color: "#9b9b9b",
                    }}
                  >
                    Bạn không có quyền xem
                  </Typography>
                </Box>
              )}
              {account?.email === user?.email && (
                <TabPanel value="3">
                  <ChangePassword user={user} />
                </TabPanel>
              )}
            </Box>
          </TabContext>
        </Box>
      </Box>

      <DialogEditAccount
        open={isEdit}
        setOpen={setIsEdit}
        user={user}
        userDetails={userDetails}
        onchange={handleChangeUser}
      />
    </Box>
  );
}
