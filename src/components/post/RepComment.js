import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import Axios from "./../../utils/Axios/index";
import useLogin from "../../utils/Login/useLogin";
import DateTimeOfMessage from "../../utils/DateTimeOfMessage/DateTimeOfMessage";
import { toast } from "react-toastify";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Iconify from "../iconify/Iconify";

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

export default function RepComment({ data, open, onChange }) {
  const { account } = useLogin();

  const [openCmt, setOpenCmt] = useState(null);

  const [repCmtId, setRepCmtId] = useState("");

  const handleOpenMenu = (event, repCmtId) => {
    setOpenCmt(event.currentTarget);
    setRepCmtId(repCmtId);
  };

  const handleCloseMenu = () => {
    setOpenCmt(null);
  };

  const [itemInputComment, setItemInputComment] = useState({
    postId: data?.postId,
    content: "",
    idReply: data?.cmtId,
  });

  const replyComment = async () => {
    const response = await Axios.Comments.replyComment(itemInputComment);
    if (response.status === 200) {
      setItemInputComment({ ...itemInputComment, content: "" });
      onChange();
    }
  };

  const deleteConment = async () => {
    const response = await Axios.Comments.deleteComment(repCmtId);
    if (response.status === 200) {
      onChange();
    } else {
      toast.error("Xoá bình luận thất bại!");
    }
  };

  return (
    <Box open={open} style={{ display: open ? "block" : "none" }}>
      {data?.commentReplies?.map((item, index) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LineComment key={index}>
              <AvatarCmt src={item?.user.avatar} />
              <Comment>
                <Typography fontSize={14}>
                  <b>
                    {item?.user.fullName} -{" "}
                    <DateTimeOfMessage
                      dateTime={item?.createdDate}
                      style={{ fontWeight: "normal", color: "#65676b" }}
                    />
                  </b>
                </Typography>
                <Typography>{item?.content}</Typography>
              </Comment>
            </LineComment>
            {account?.userId === item?.user.userId && (
              <IconButton
                aria-label="settings"
                size="large"
                color="inherit"
                onClick={(e) => handleOpenMenu(e, item?.cmtId)}
              >
                <MoreVertIcon />
              </IconButton>
            )}
          </Box>
        );
      })}

      <Popover
        open={Boolean(openCmt)}
        anchorEl={openCmt}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem sx={{ color: "error.main" }} onClick={deleteConment}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>

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
              onClick={replyComment}
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
