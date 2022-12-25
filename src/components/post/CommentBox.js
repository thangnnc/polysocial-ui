import { Box, Button, List, TextField, Typography } from "@mui/material";
// import CommentLoading from "./CommentLoading";
import CommentLine from "./CommentLine";
import Axios from "./../../utils/Axios/index";
import { useEffect, useState } from "react";

export default function CommentBox({
  open,
  comments,
  postId,
  onChange,
  socket,
  checkPostId,
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (postId === checkPostId) {
      setIsOpen(true);
    }
  }, [checkPostId, postId]);

  const [itemInputComment, setItemInputComment] = useState({
    postId: postId,
    content: "",
  });

  const createComment = async () => {
    const response = await Axios.Comments.createComment(itemInputComment);
    if (response.status === 200) {
      socket.emit("Client_request_create_like_comment");
      setItemInputComment({ ...itemInputComment, content: "" });
      onChange();
    }
  };

  return (
    <Box
      key={postId}
      sx={{ pt: 2 }}
      style={{ display: isOpen ? "block" : "none" }}
      open={open}
    >
      <List disablePadding sx={{ p: 0 }}>
        {comments?.map((comment, index) => (
          <CommentLine
            key={index}
            comment={comment}
            postId={postId}
            onChange={onChange}
          />
        ))}
        {comments?.length === 0 && (
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{ textAlign: "center" }}
          >
            Chưa có bình luận!
          </Typography>
        )}
      </List>

      <TextField
        className="rounded"
        size="medium"
        value={itemInputComment.content}
        onChange={(e) =>
          setItemInputComment({ ...itemInputComment, content: e.target.value })
        }
        InputProps={{
          endAdornment: (
            <Button
              className="btn-orange"
              size="large"
              variant="contained"
              sx={{ width: 200, borderRadius: 50, py: 1 }}
              onClick={createComment}
            >
              Bình luận
            </Button>
          ),
        }}
        placeholder="Nhập bình luận ....."
        sx={{
          width: "100%",
          mt: 2,
          borderRadius: 50,
          pr: 3,
        }}
      />
    </Box>
  );
}
