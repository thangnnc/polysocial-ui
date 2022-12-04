import {
  Avatar,
  Button,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Iconify from "../../../components/iconify";

const styleListFriends = {
  padding: "12px 12px",
  width: "100%",
  color: "#515151",
};

const listFriends = [
  {
    id: "1",
    roomId: "1",
    fullName: "Nguyễn Nhật Cao Thăng",
    avatar:
      "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
  },
  {
    id: "1",
    roomId: "1",
    fullName: "Trần Mậu Phi",
    avatar:
      "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
  },
  {
    id: "1",
    roomId: "1",
    fullName: "Phan Nguyễn Đăng Trường",
    avatar:
      "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
  },
  {
    id: "1",
    roomId: "1",
    fullName: "Đặng Hoàng Duy",
    avatar:
      "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
  },
  {
    id: "1",
    roomId: "1",
    fullName: "Nguyễn Quang Nhật",
    avatar:
      "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
  },
  {
    id: "1",
    roomId: "1",
    fullName: "Nguyễn Quang Nhật",
    avatar:
      "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
  },
  {
    id: "1",
    roomId: "1",
    fullName: "Nguyễn Quang Nhật",
    avatar:
      "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
  },
  {
    id: "1",
    roomId: "1",
    fullName: "Nguyễn Quang Nhật",
    avatar:
      "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
  },
  {
    id: "1",
    roomId: "1",
    fullName: "Nguyễn Quang Nhật",
    avatar:
      "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
  },
  {
    id: "1",
    roomId: "1",
    fullName: "Nguyễn Quang Nhật",
    avatar:
      "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
  },
  {
    id: "1",
    roomId: "1",
    fullName: "Nguyễn Quang Nhật",
    avatar:
      "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
  },
  {
    id: "1",
    roomId: "1",
    fullName: "Nguyễn Quang Nhật",
    avatar:
      "https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nam-toc-do.jpg",
  },
];

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 72;

const BoxFriend = styled("div")(({ theme }) => ({
  width: "20%",
  maxHeight: "100vh",
  position: "fixed",
  right: 0,
  borderRadius: 0,
  boxShadow: "0px 0px 4px #d2d2d2",
  paddingTop: APP_BAR_MOBILE + 10,
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 10,
  },
}));
export default function NavFriend() {
  return (
    <BoxFriend>
      <Card
        sx={{
          width: "100%",
          height: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#ffffff",
          zIndex: 9999,
          borderBottom: "1px solid #ed6c02",
          borderRadius: 0,
        }}
      >
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ fontWeight: 700, fontSize: 18 }}
        >
          Bạn bè
        </ListSubheader>

        <Button sx={{ mr: 1, color: "#515151" }}>
          <Iconify
            icon={"ic:round-person-search"}
            sx={{ width: 32, height: 32 }}
          />
        </Button>
      </Card>
      <List
        dense
        sx={{
          width: "100%",
          maxHeight: "calc(100vh - 136px)",
          overflow: "auto",
          p: 0,
          bgcolor: "background.paper",
        }}
      >
        {listFriends.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <Button color="warning" sx={styleListFriends}>
              <ListItem key={value}>
                <ListItemAvatar>
                  <Avatar
                    alt={value.fullName}
                    src={value.avatar}
                    sx={{ width: "52px", height: "52px", mr: 2 }}
                  />
                </ListItemAvatar>
                <Typography sx={{ fontWeight: "700" }}>
                  {value.fullName}
                </Typography>
              </ListItem>
            </Button>
          );
        })}
      </List>
    </BoxFriend>
  );
}
