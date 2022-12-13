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

export default function Post({ posts }) {
  const [isShowCmt, setShowCmt] = useState(false);

  const handleShowCmt = () => {
    setShowCmt(true);
  };

  return (
    <List
      disablePadding
      sx={{ p: 0, display: "flex", justifyContent: "center", mb: 4 }}
    >
      {posts.map(
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
          },
          index
        ) => (
          <Card key={index} sx={{ width: "80%" }}>
            <CardHeader
              avatar={
                <AvatarCmt
                  alt={user.fullName}
                  src={user.Avatar}
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
                {true ? (
                  <ButtonLiked size="large">
                    <FavoriteIcon sx={{ mr: 1 }} />
                    Đã Thích
                  </ButtonLiked>
                ) : (
                  <ButtonNormal size="large">
                    <FavoriteIcon sx={{ mr: 1 }} />
                    Thích
                  </ButtonNormal>
                )}
                <ButtonNormal size="large" onClick={handleShowCmt}>
                  <TextsmsIcon sx={{ mr: 1 }} />
                  Bình Luận
                </ButtonNormal>
              </Box>

              <CommentBox show={isShowCmt} comments={listComment} />
            </CardActions>
          </Card>
        )
      )}
    </List>
  );
}
