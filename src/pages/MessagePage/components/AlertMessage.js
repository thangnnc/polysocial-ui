import { Box, styled } from "@mui/material";

const MessageLine = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "center",
  justifyContent: "center",
  color: "#686868",
  fontWeight: 500,
  fontSize: 14,
  fontStyle: "italic",
  padding: 16
}));

export default function AlertMessage({ message }) {
  return <>{message && <MessageLine>{message}</MessageLine>}</>;
}
