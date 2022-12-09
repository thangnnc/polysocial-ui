import { Avatar, Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function FriendSearchBox({ searchData }) {
  const { avatar, fullName, email, isFriend } = searchData;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          "&:hover": {
            bgcolor: "#ffddc7",
            borderColor: "#ff7b29",
          },
        }}
      >
        <Box display={"flex"} maxWidth="70%">
          <Avatar alt={fullName} src={avatar} sx={{ width: 48, height: 48 }} />
          <Box sx={{ maxWidth: "80%", ml: 2 }}>
            <Typography variant="subtitle2" noWrap fontSize={16}>
              {fullName}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {email}
            </Typography>
          </Box>
        </Box>
        {!isFriend && (
          <Button
            className="btn-orange"
            variant="contained"
            sx={{ borderRadius: 50 }}
          >
            Kết Bạn
          </Button>
        )}
      </Box>
      <Divider />
    </>
  );
}
