import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import AvatarStatus from "../../utils/AvatarStatus/AvatarStatus";
import useLogin from "../../utils/Login/useLogin";
import DialogUpPost from "./DialogUpPost";

export default function UpPost() {
  const { account } = useLogin();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ p: 0, display: "flex", justifyContent: "center", mb: 4 }}>
      <Card
        sx={{
          width: "80%",
        }}
      >
        <CardContent sx={{ p: 3, display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
            <AvatarStatus
              src={account.avatar}
              alt={account.fullName}
              sx={{ width: 54, height: 54 }}
            />
            <TextField
              className="input-24"
              size="medium"
              variant="standard"
              placeholder="Hôm nay bạn muốn đăng gì thế!"
              sx={{ ml: 2, width: "100%", height: "100%" }}
              onClick={handleClickOpen}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        </CardContent>
      </Card>
      <DialogUpPost open={open} handleClose={handleClose} />
    </Box>
  );
}
