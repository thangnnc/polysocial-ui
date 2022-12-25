import { Box, ImageListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ListGroupJoin(props) {
  const roomId = props.group.roomId;

  return (
    <Link
      to={`/groups/detail/${props.group.groupId}`}
      state={{ roomId: roomId }}
      style={{
        color: "inherit",
        textDecoration: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 0.5,
          mb: 2,
        }}
      >
        <ImageListItem>
          <img
            style={{ borderRadius: 10, width: 75, height: 75 }}
            src={props.group.avatarGroup}
            alt="avatar group"
          />
        </ImageListItem>
        <Box
          sx={{
            ml: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: 19 }}>
            Nhóm {props.group.groupName} - {props.group.className}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#9b9b9b" }}>
            Nhóm kín - {props.group.totalMember} thành viên
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}
