import { Box, ImageListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ListGroupJoin(props) {
  console.log("-----",props)
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
            src={
              "https://res.cloudinary.com/dwc7dkxy7/image/upload/v1670588428/groups-default-cover-photo-2x_ysxgpp.png"
            }
            alt="avatar group"
          />
        </ImageListItem>
        <Box
          sx={{
            ml: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: 19 }}>
            Nhóm {props.group.groupName}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#9b9b9b" }}>
            Nhóm công khai - {props.group.totalMember} thành viên
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}
