import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import React from "react";
import Iconify from "../../../components/iconify/Iconify";

const styleInputFullField = {
  width: "45%",
  mb: 3,
  mr: 3,
};

export default function ChangePassword(props) {
  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", fontSize: "20" }}>
        Đổi mật khẩu
      </Typography>
      <Box sx={{ mt: 2 }}>
        <TextField
          name="fullName"
          label="Họ Và Tên"
          placeholder="Nhập Họ Và Tên"
          value={!props.user.fullName ? "" : props.user.fullName}
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={"icon-park-solid:edit-name"} />
              </InputAdornment>
            ),
          }}
          autoComplete="none"
          sx={styleInputFullField}
        />

        <TextField
          name="password"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={"carbon:password"} />
              </InputAdornment>
            ),
          }}
          autoComplete="none"
          sx={styleInputFullField}
        />
      </Box>
      <Box>
        <TextField
          name="newpassword"
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={"material-symbols:password"} />
              </InputAdornment>
            ),
          }}
          autoComplete="none"
          sx={styleInputFullField}
        />

        <TextField
          name="confirmpassword"
          label="Nhập lại mật khẩu mới"
          placeholder="Nhập lại mật khẩu mới"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={"material-symbols:password"} />
              </InputAdornment>
            ),
          }}
          autoComplete="none"
          sx={styleInputFullField}
        />
      </Box>
    </Box>
  );
}
