import { Avatar, Box, Typography } from "@mui/material";
import DateTimeOfMessage from "../../utils/DateTimeOfMessage/DateTimeOfMessage";
import styled from "styled-components";

const LineComment = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "center",
  justifyContent: "lelf",
  marginBottom: 8
}));

const Comment = styled("span")(() => ({
  maxWidth: "70%",
  display: "block",
  backgroundColor: "#d2d2d2",
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

export default function CommentLine ({ comment }) {
  const { user, content, createdDate } = comment;

  return (
    <LineComment>
      <AvatarCmt src={user.avatar} />
      <Comment>
        <Typography fontSize={14}>
          <b>{user.fullName + " - "}</b>
          <DateTimeOfMessage
            dateTime={createdDate}
            style={{ fontSize: 14 }}
          />
        </Typography>
        <Typography>
          {content}
        </Typography>
      </Comment>
    </LineComment>
  );
}
