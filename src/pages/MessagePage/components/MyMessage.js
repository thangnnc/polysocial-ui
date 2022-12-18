import { Box, styled, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import AvatarBlank from "../../../components/avatar-blank/AvatarBlank";
import AvatarStatus from "../../../utils/AvatarStatus/AvatarStatus";
import useLogin from "../../../utils/Login/useLogin";

const MessageLine = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "center",
  justifyContent: "right",
}));

const Message = styled("span")(() => ({
  maxWidth: "50%",
  display: "block",
  backgroundColor: "#f97c2e",
  color: "#ffffff",
  borderRadius: 12,
  padding: "8px 12px",
  marginRight: 8,
  marginBottom: 4,
  flexWrap: "wrap",
  wordWrap: "break-word",
}));

export default function MyMessage({ message, showAvatar,createdDate,userId, email,
  roomId,
  listContacts, }) {
  // console.log("avt",showAvatar)
  const { account } = useLogin();
  return (
    <>
      {message && (
        <MessageLine>
          <Tooltip title={createdDate}>
            <Message>{message}</Message>
          </Tooltip>
         
          {showAvatar ? (
             <Link
             to={`/my-profile/`+userId}
             state={{
              isActive: true,
              email: email,
              roomId: roomId,
              listContacts: listContacts,
            }}
             style={{ textDecoration: "none", color: "black" }}
           >
            <Tooltip title={account.fullName + " (" + account.email + ")"}>
              <span>
                <AvatarStatus src={account.avatar} isActive={true} />
              </span>
            </Tooltip>
            </Link>
          ) : (
            <AvatarBlank sx={{ width: 44, height: 44 }} />
          )}
          
        </MessageLine>
      )}
    </>
  );
}
