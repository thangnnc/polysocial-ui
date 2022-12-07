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
import { useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AvatarStatus from "../../utils/AvatarStatus/AvatarStatus";
import Iconify from "../../components/iconify";
import MyMessage from "./components/MyMessage";
import OtherMessage from "./components/OtherMessage";
import AlertMessage from "./components/AlertMessage";
import TimeLineMessage from "./components/TimeLineMessage";


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
  return (
    <>
      <Helmet>
        <title> Message | Poly Social</title>
      </Helmet>

      <Card sx={{ minHeight: "72vh" }}>
        <CardHeader
          avatar={
            <AvatarStatus
              src={friend.avatar}
              isActive={friend.isActive}
              sx={{ width: "46px", height: "46px" }}
            />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={<Typography fontWeight={700}>{friend.fullName}</Typography>}
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
            ...scrollbar
          }}
        >
          <AlertMessage
            message={"Hai bạn đã trở thành bạn bè trên Poly Social!"}
          />
          <TimeLineMessage message={"11:00"} />
          <MyMessage message={"Hi! Em ngon vậy"} />
          <MyMessage message={"Cho anh làm quen nhé"} showAvatar/>
          <OtherMessage account={friend} message={"Oke a iu"} showAvatar/>
          <TimeLineMessage message={"16:00"} />
          <MyMessage message={"Em ăn cơm chưa?"} />
          <MyMessage message={"Em ăn cơm chưa?"} />
          <MyMessage message={"Em ăn cơm chưa?"} />
          <MyMessage message={"Em ăn cơm chưa?"} />
          <MyMessage message={"Em ăn cơm chưa?"} showAvatar/>
          <OtherMessage account={friend} message={"Chưa"} />
          <OtherMessage account={friend} message={"Anh chở e đi ăn đi <3"} showAvatar/>
          <MyMessage message={"Méo :V"} showAvatar/>
          <AlertMessage
            message={"♥ Gấu Chó ♥ đã chặn bạn."}
          />
        </CardContent>
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
                  className="btn-orange"
                  variant="contained"
                  sx={{ borderRadius: 50 }}
                >
                  <Iconify icon="wpf:sent" />
                </Button>
              ),
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
