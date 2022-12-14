import { Box, Button, List, TextField, Typography } from "@mui/material";
// import CommentLoading from "./CommentLoading";
import CommentLine from "./CommentLine";
import Axios from "./../../utils/Axios/index";
import { useEffect, useRef, useState } from "react";
import EnteringMessagePost from "./EnteringMessagePost";

export default function CommentBox({
  open,
  comments,
  postId,
  userId,
  onChange,
  checkPostIds,
  socket,
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (postId === checkPostIds) {
      setIsOpen(true);
    }
  }, [checkPostIds, postId]);

  const [itemInputComment, setItemInputComment] = useState({
    postId: postId,
    content: "",
  });
  const ref = useRef(null);
  const [userTyping, setUserTyping] = useState([]);
  const [checkPostId, setCheckPostId] = useState();
  const [listeningTyping, setListeningTyping] = useState(false);
  const [listeningStopTyping, setListeningStopTyping] = useState(false);
  const createComment = async () => {
    const response = await Axios.Comments.createComment(itemInputComment);
    if (response.status === 200) {
      await socket.emit("Client_request_create_like_comment", userId);
      setItemInputComment({ ...itemInputComment, content: "" });
      onChange();
    }
  };
  useEffect(() => {
    setUserTyping("");
  }, []);
  //listeningStopTyping
  try {
    socket.on("stop_user_typing_comment", (data) => {
      setUserTyping(data);
      setListeningStopTyping(true);
    });
  } catch (error) {}
  useEffect(() => {
    if (listeningStopTyping) {
      setListeningStopTyping(false);
    }
  }, [listeningStopTyping]);
  //listeningTyping
  try {
    socket.on("user_typing_comment", (data, checkPostIds) => {
      // console.log("check-",checkPostId)
      setCheckPostId(checkPostIds);
      setUserTyping(data);
      setListeningTyping(true);
    });
  } catch (error) {}
  useEffect(() => {
    if (listeningTyping) {
      setListeningTyping(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningTyping]);
  const handleClick = () => {
    ref.current.focus();
    socket.emit("I'm_typing_comment", postId);
  };
  const handleClickOut = () => {
    console.log("stop");
    socket.emit("I_stopped_typing_comment", postId);
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
            socket={socket}
          />
        ))}
        {comments?.length === 0 && (
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{ textAlign: "center" }}
          >
            Ch??a c?? b??nh lu???n!
          </Typography>
        )}
      </List>
      {checkPostId === postId && userTyping ? (
        <EnteringMessagePost account={userTyping} />
      ) : (
        ""
      )}
      {checkPostId === postId ? userTyping : ""}
      <TextField
        className="rounded"
        size="medium"
        value={itemInputComment.content}
        ref={ref}
        onBlur={handleClickOut}
        onFocus={handleClick}
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
              B??nh lu???n
            </Button>
          ),
        }}
        placeholder="Nh???p b??nh lu???n ....."
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
