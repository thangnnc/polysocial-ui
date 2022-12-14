import { Box, styled, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import AvatarBlank from "../../../components/avatar-blank/AvatarBlank";
import AvatarStatus from "../../../utils/AvatarStatus/AvatarStatus";

const MessageLine = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "center",
  justifyContent: "lelf",
}));

const Message = styled("span")(() => ({
  maxWidth: "50%",
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

export default function OtherMessage({
  isActive,
  message,
  account,
  avatar,
  showAvatar,
  createdDate,
  userId,
  email,
  roomId,
  listContacts,
}) {
  return (
    <>
      {message && (
        <MessageLine>
          {showAvatar ? (
            <Link
              to={`/my-profile/${userId}`}
              state={{
                isActive: isActive,
                email: email,
                roomId: roomId,
                listContacts: listContacts,
              }}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Tooltip title={account}>
                <span>
                  <AvatarStatus src={avatar} isActive={!isActive} />
                </span>
              </Tooltip>
            </Link>
          ) : (
            <AvatarBlank sx={{ width: 44, height: 44 }} />
          )}

          <Tooltip title={createdDate}>
            <Message>{message}</Message>
          </Tooltip>
        </MessageLine>
      )}
    </>
  );
}
