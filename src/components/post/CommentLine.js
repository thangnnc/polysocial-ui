import {
  Avatar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import DateTimeOfMessage from "../../utils/DateTimeOfMessage/DateTimeOfMessage";
import styled from "styled-components";
import { useState } from "react";
import RepComment from "./RepComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Iconify from "../iconify/Iconify";

const LineComment = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "center",
  justifyContent: "lelf",
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

export default function CommentLine({ comment }, { postId }) {
  const [open, setOpen] = useState(null);

  const { user, content, createdDate } = comment;

  const [isShow, setIsShow] = useState(false);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  return (
    <Box sx={{ mb: 2, width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <LineComment>
          <AvatarCmt src={user.avatar} />
          <Comment>
            <Typography fontSize={14}>
              <b>{user.fullName}</b>
            </Typography>
            <Typography>{content}</Typography>
          </Comment>
        </LineComment>
        <IconButton
          aria-label="settings"
          size="large"
          color="inherit"
          onClick={handleOpenMenu}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Button
        sx={{
          ml: "8%",
        }}
        onClick={() => setIsShow(true)}
      >
        <Typography
          sx={{
            width: "100%",
            fontWeight: "bold",
            color: "#65676b",
            fontSize: "12px",
            lineHeight: "12px",
          }}
        >
          Trả lời -{" "}
          <DateTimeOfMessage
            dateTime={createdDate}
            style={{ fontWeight: "normal", color: "#65676b" }}
          />
        </Typography>
      </Button>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
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
        <MenuItem>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Chỉnh sửa
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>
      <RepComment
        open={isShow}
        setOpen={setIsShow}
        postId={postId}
        user={comment.user}
      />
    </Box>
  );
}
