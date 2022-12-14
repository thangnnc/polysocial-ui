import { Box, Button, ImageListItem, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Axios from "./../../../utils/Axios/index";

export default function ListGroupSearch(props) {
  const handleJoinGroup = async (groupId) => {
    const response = await Axios.Groups.requestJoinGroup(groupId);
    if (response) {
      alert("Gửi lời tham gia nhóm thành công");
    } else {
      alert("Gửi lời tham gia nhóm thất bại");
    }
  };

  return (
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
            "https://res.cloudinary.com/dwc7dkxy7/image/upload/v1670978828/groups-default-cover-photo-2x_igy9tq.png"
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
          {props.group.name} - {props.group.description}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "#9b9b9b" }}>
          Nhóm công khai - {props.group.totalMember} thành viên
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{ background: "#ff7b29", width: "5%", ml: 2 }}
        onClick={() => handleJoinGroup(props.group.groupId)}
      >
        <LoginIcon />
      </Button>
    </Box>
  );
}
