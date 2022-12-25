import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import Axios from "./../../utils/Axios/index";
import useLogin from "../../utils/Login/useLogin";

const LineComment = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "center",
  justifyContent: "lelf",
  marginLeft: "60px",
  marginTop: "10px",
}));

const Comment = styled("span")(() => ({
  maxWidth: "70%",
  display: "block",
  backgroundColor: "#f0f2f5",
  color: "#252525",
  borderRadius: 12,
  padding: "8px 12px",
  marginLeft: 8,
  marginBottom: 4,
  flexWrap: "wrap",
  wordWrap: "break-word",
}));

const AvatarCmt = styled(Avatar)(() => ({
  border: "2px solid #ff7f30",
}));

export default function RepComment({ postId, open }) {
  const { account } = useLogin();

  const [itemInputComment, setItemInputComment] = useState({
    postId: postId,
    content: "",
  });

  const createComment = async () => {
    const response = await Axios.Comments.createComment(itemInputComment);
    if (response.status === 200) {
      setItemInputComment({ ...itemInputComment, content: "" });
    }
  };

  return (
    <Box open={open} style={{ display: open ? "block" : "none" }}>
      <LineComment>
        <AvatarCmt src={account.avatar} />
        <Comment>
          <Typography fontSize={14}>
            <b>{account.fullName}</b>
          </Typography>
          <Typography>Hi</Typography>
        </Comment>
      </LineComment>
      <TextField
        className="rounded"
        size="medium"
        value={itemInputComment.content}
        onChange={(e) =>
          setItemInputComment({
            ...itemInputComment,
            content: e.target.value,
          })
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AvatarCmt src={account.avatar} />
            </InputAdornment>
          ),
          endAdornment: (
            <Button
              className="btn-orange"
              size="large"
              variant="contained"
              sx={{ width: 200, borderRadius: 50, py: 1 }}
              onClick={createComment}
            >
              Phản hồi
            </Button>
          ),
        }}
        placeholder="Nhập bình luận ....."
        sx={{
          width: "80%",
          mt: 1,
          ml: 7,
          borderRadius: 50,
        }}
      />
    </Box>
  );
}
