import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Card, CardContent, Tab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Iconify from "../../components/iconify/Iconify";
import AvatarStatus from "../../utils/AvatarStatus/AvatarStatus";
import Axios from "./../../utils/Axios/index";
import Infomation from "./components/Infomation";
import ListFriend from "./components/ListFriend";
import ListContent from "./components/ListContent";
import useLogin from "../../utils/Login/useLogin";
import { toast } from "react-toastify";
import { DialogEditAccount } from "./components/DialogEditAccount";
import ChangePassword from "./components/ChangePassword";

export default function ProfilePage() {
  const { account } = useLogin();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [value, setValue] = useState("1");
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getOneUser(userId);
  }, [userId]);

  const getOneUser = async (userId) => {
    if (userId !== undefined) {
      const response = await Axios.Accounts.getOneUser(userId);
      setUser(response);
    } else {
      setUser(null);
    }
  };

  const handleAddFriend = async () => {
    const response = await Axios.Friends.addFriend(user);
    if (response.status === 200) {
      toast.success("Gửi lời mời kết bạn thành công");
    } else {
      toast.error("Gửi lời mời kết bạn thất bại");
    }
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
                  <AvatarStatus
                    src={user?.avatar}
                    alt={user?.fullName}
                    isActive={true}
                    sx={{ width: 130, height: 130 }}
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
                  {account?.email !== user?.email ? (
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
                  ) : (
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
                  {!true && (
                    <>
                      <Button
                        variant="contained"
                        sx={{
                          background: "#D8DADF",
                          color: "black",
                          borderRadius: 2,
                          mr: 2,
                        }}
                      >
                        <Iconify icon={"bi:person-check-fill"} />
                        <Typography sx={{ fontWeight: "bold", ml: 1 }}>
                          Bạn bè
                        </Typography>
                      </Button>

                      <Button
                        variant="contained"
                        sx={{
                          background: "#D8DADF",
                          color: "black",
                          borderRadius: 2,
                        }}
                      >
                        <Iconify icon={"mdi:facebook-messenger"} />
                        <Typography sx={{ fontWeight: "bold", ml: 1 }}>
                          Nhắn tin
                        </Typography>
                      </Button>
                    </>
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
                <Tab
                  label="Bài viết"
                  value="3"
                  sx={{ fontSize: 15, fontWeight: "bold" }}
                />
                <Tab
                  label="Đổi mật khẩu"
                  value="4"
                  sx={{ fontSize: 15, fontWeight: "bold" }}
                />
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
                <Infomation user={user} />
              </TabPanel>
              <TabPanel value="2">
                <ListFriend />
              </TabPanel>
              <TabPanel value="3">
                <ListContent user={user} />
              </TabPanel>
              <TabPanel value="4">
                <ChangePassword user={user} />
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      </Box>

      <DialogEditAccount open={isEdit} setOpen={setIsEdit} user={user} />
    </Box>
  );
}
