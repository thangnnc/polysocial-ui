import { Box, styled } from "@mui/material";
import Iconify from "../../../components/iconify";
import AvatarStatus from "../../../utils/AvatarStatus/AvatarStatus";

const MessageLine = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
}));

const Message = styled("span")(() => ({
  display: "flex",
  alignItems: "end",
  color: "#252525",
  borderRadius: 12,
  padding: "8px 12px 0 0",
  marginLeft: 8,
  marginBottom: 4,
}));

const effect = {
  "@keyframes myEffect": {
    "0%": {
      transform: "scale(0.6)",
    },
    "50%": {
      transform: "scale(1.8)",
    },
    "100%": {
      transform: "scale(0.6)",
    },
  },
};

const Dot1 = {
  position: "relative",
  animationName: "myEffect",
  animationDuration: "1.3s",
  animationIterationCount: "infinite",
  animationDelay: "0.2s",
};
const Dot2 = {
  position: "relative",
  animationName: "myEffect",
  animationDuration: "1.3s",
  animationIterationCount: "infinite",
  animationDelay: "0.4s",
};
const Dot3 = {
  position: "relative",
  animationName: "myEffect",
  animationDuration: "1.3s",
  animationIterationCount: "infinite",
  animationDelay: "0.6s",
};
export default function EnteringMessage({ account }) {
  return (
    <>
      <MessageLine>
        <AvatarStatus src={account.avatar} isActive={account.isActive} />
        <Message>
          <Iconify icon="ci:dot-02-s" sx={{ effect, ...Dot1 }} />
          <Iconify icon="ci:dot-02-s" sx={{ effect, ...Dot2 }} />
          <Iconify icon="ci:dot-02-s" sx={{ effect, ...Dot3 }} />
        </Message>
      </MessageLine>
    </>
  );
}
