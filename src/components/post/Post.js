import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextsmsIcon from "@mui/icons-material/Textsms";
import DateTimeOfMessage from "../../utils/DateTimeOfMessage/DateTimeOfMessage";
import styled from "styled-components";
import { useState } from "react";
import CommentBox from "./CommentBox";
import Axios from "./../../utils/Axios/index";
import useLogin from "../../utils/Login/useLogin";

const AvatarCmt = styled(Avatar)(() => ({
  border: "2px solid #ff7f30",
}));

const ButtonLiked = styled(Button)(() => ({
  width: "50%",
  color: "#ff6b0f !important",
}));

const ButtonNormal = styled(Button)(() => ({
  width: "50%",
  color: "#a2a2a2 !important",
}));

export default function Post({ posts, onChange }) {
  const [isShowCmt, setShowCmt] = useState(false);
  const { account, socket } = useLogin();
  // const [isLike, setIsLike] = useState(false);

  const statusLike = false;
  // const [statusLike, setStatusLike] = useState(false);

  // const mySetStatusLike = new Set();
  const isLike=[];

  // const [statusLike, setStatusLike] = useState(false);

  const handleShowCmt = () => {
    setShowCmt(true);
  };

  const likeUnLike = async (postId) => {
    const data = {
      postId: postId,
    };
    const response = await Axios.Likes.likeUnLike(data);
    if (response.status === 200) {
      // if (isLike) {
      //   setIsLike(false);
      // } else {
      //   setIsLike(true);
      // }
      onChange();
      socket.emit("Client-request-like");
    }
  };

  return (
    <List
      disablePadding
      sx={{ width: "100%", p: 0, display: "block", mb: 4, mx: "auto" }}
    >
      {posts?.map(
        (
          {
            user,
            postId,
            content,
            createdDate,
            countLike,
            countComment,
            listUrl,
            listComment,
            listLike,
          },
          index
        ) => (
          <Card key={index} sx={{ width: "80%", my: 3, mx: "auto" }}>
            <CardHeader
              avatar={
                <AvatarCmt
                  alt={user.fullName}
                  src={user.avatar}
                  sx={{ width: 54, height: 54 }}
                />
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold" }}
                  noWrap
                  fontSize={16}
                >
                  {user.fullName}
                </Typography>
              }
              subheader={
                <DateTimeOfMessage
                  dateTime={createdDate}
                  style={{
                    fontWeight: 400,
                    fontSize: 14,
                    color: "text.secondary",
                  }}
                />
              }
            />
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                {content}
              </Typography>
            </CardContent>

            <List disablePadding sx={{ p: 0 }}>
              {listUrl?.map(({ urlFile, type }, index) => (
                <CardMedia
                  key={index}
                  component={type}
                  image={urlFile}
                  alt="Paella dish"
                  sx={{ maxHeight: 400 }}
                />
              ))}
            </List>
            <CardActions sx={{ display: "block", px: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", pb: 1 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#ff8b42",
                  }}
                >
                  {countLike + " lượt thích"}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#ff8b42",
                  }}
                >
                  {countComment + " bình thuận"}
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  border: "1px solid #c8c8c8",
                  borderLeft: 0,
                  borderRight: 0,
                }}
              >
                {listLike.map((element, index) => {
                    if(element.studentCode === account.studentCode){
                      isLike.push(element.studentCode);
                      isLike.push(element.postId);
                    }
                })}

                {isLike.includes(account.studentCode && postId) ? (
                  <ButtonLiked size="large" onClick={() => likeUnLike(postId)}>
                    <FavoriteIcon sx={{ mr: 1 }} />
                    Đã Thích
                  </ButtonLiked>
                ) : (
                  <ButtonNormal size="large" onClick={() => likeUnLike(postId)}>
                    <FavoriteIcon sx={{ mr: 1 }} />
                    Thích
                  </ButtonNormal>
                )}
                <ButtonNormal size="large" onClick={handleShowCmt}>
                  <TextsmsIcon sx={{ mr: 1 }} />
                  Bình Luận
                </ButtonNormal>
              </Box>

              <CommentBox
                key={index}
                show={isShowCmt}
                comments={listComment}
                postId={postId}
                onChange={onChange}
              />
            </CardActions>
          </Card>
        )
      )}
    </List>
  );
}
