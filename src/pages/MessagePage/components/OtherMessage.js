import { Box, styled, Tooltip } from "@mui/material";
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

export default function OtherMessage({ message, account, showAvatar }) {
  return (
    <>
      {message && (
        <MessageLine>
          {showAvatar ? (
            <Tooltip title={account.fullName + " (" + account.email + ")"}>
              <span>
                <AvatarStatus
                  src={account.avatar}
                  isActive={account.isActive}
                />
              </span>
            </Tooltip>
          ) : (
            <AvatarBlank sx={{ width: 44, height: 44 }} />
          )}

          <Tooltip title="06/12/2022 11:00:00 PM">
            <Message>{message}</Message>
          </Tooltip>
        </MessageLine>
      )}
    </>
  );
}