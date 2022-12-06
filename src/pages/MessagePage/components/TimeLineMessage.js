import { Box, styled } from "@mui/material";

const MessageLine = styled(Box)(() => ({
  width: "100%",
  color: "#686868",
  fontWeight: 500,
  fontSize: 14,
  fontStyle: "italic",
  textAlign: "center",
  borderBottom: "1px solid #686868",
  lineHeight: "0.1em",
  margin: "10px 0 20px",
}));

const MessageTime = styled("span")(() => ({
  background: "#ffffff",
  padding: "0 10px",
  zIndex: 99999
}));

export default function TimeLineMessage({ message }) {
  return (
    <>
      {message && (
        <MessageLine>
          <MessageTime>{message}</MessageTime>
        </MessageLine>
      )}
    </>
  );
}
