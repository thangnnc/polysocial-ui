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

export default function Post({ posts, onChange, socket }) {
  const [isShowCmt, setShowCmt] = useState(false);
  const { account } = useLogin();

  const [checkPostId, setCheckPostId] = useState("");

  const isLike = [];

  const handleShowCmt = (e, postId) => {
    setCheckPostId(postId);
    setShowCmt(true);
  };

  const likeUnLike = async (postId,userId) => {
    const data = {
      postId: postId,
    };
    const response = await Axios.Likes.likeUnLike(data);
    if (response.status === 200) {
      socket.emit("Client_request_create_like_comment",userId);
      onChange();
    }
  };

  return (
    <List
      disablePadding
      sx={{ width: "100%", p: 0, display: "block", mb: 4, mx: "auto" }}
    >
      {posts?.map(
        ({
          user,
          postId,
          content,
          createdDate,
          countLike,
          countComment,
          listUrl,
          listComment,
          listLike,
        }) => (
          <Card key={postId} sx={{ width: "80%", my: 3, mx: "auto" }}>
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
                  {countLike + " l?????t th??ch"}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#ff8b42",
                  }}
                >
                  {countComment + " b??nh thu???n"}
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
                {listLike?.map((element) => {
                  if (element.userId === account.userId) {
                    isLike.push(element.userId);
                    isLike.push(element.postId);
                  }
                  return "";
                })}

                {isLike?.includes(account.studentCode && postId) ? (
                  <ButtonLiked size="large" onClick={() => likeUnLike(postId,user.userId)}>
                    <FavoriteIcon sx={{ mr: 1 }} />
                    ???? Th??ch
                  </ButtonLiked>
                ) : (
                  <ButtonNormal size="large" onClick={() => likeUnLike(postId,user.userId)}>
                    <FavoriteIcon sx={{ mr: 1 }} />
                    Th??ch
                  </ButtonNormal>
                )}
                <ButtonNormal
                  size="large"
                  onClick={(e) => handleShowCmt(e, postId)}
                >
                  <TextsmsIcon sx={{ mr: 1 }} />
                  B??nh Lu???n
                </ButtonNormal>
              </Box>
              <CommentBox
                key={postId}
                open={isShowCmt}
                setOpen={setShowCmt}
                comments={listComment}
                postId={postId}
                userId={user.userId}
                onChange={onChange}
                socket={socket}
                checkPostIds={checkPostId}
              />
            </CardActions>
          </Card>
        )
      )}
    </List>
  );
}
