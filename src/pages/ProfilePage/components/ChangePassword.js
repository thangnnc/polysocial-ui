import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Iconify from "../../../components/iconify/Iconify";
import useLogin from "../../../utils/Login/useLogin";
import Axios from "./../../../utils/Axios/index";

const styleInputFullField = {
  width: "45%",
  mb: 3,
  mr: 3,
};

export default function ChangePassword(props) {
  const { logout } = useLogin();

  const [user, setUser] = useState({
    userId: props.user.userId,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const updatePassword = async () => {
    if (user.newPassword !== user.confirmPassword) {
      toast.error("Mật khẩu mới không khớp!");
      return;
    } else if (user.newPassword === user.oldPassword) {
      toast.error("Mật khẩu mới không được trùng với mật khẩu cũ!");
      return;
    } else {
      console.log(user);
      const response = await Axios.Accounts.updatePassword(user);
      if (response === "Update password success") {
        toast.success("Cập nhật mật khẩu thành công");
        setTimeout(() => {
          logout();
        }, 6000);
      } else {
        toast.error("Cập nhật mật khẩu thất bại!");
      }
    }
  };

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
          onChange={(e) => {
            setUser({ ...user, oldPassword: e.target.value });
          }}
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
          onChange={(e) => {
            setUser({ ...user, newPassword: e.target.value });
          }}
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
          onChange={(e) => {
            setUser({ ...user, confirmPassword: e.target.value });
          }}
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
      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 7 }}>
        <Button onClick={updatePassword} variant="contained" color="warning">
          Đổi mật khẩu
        </Button>
      </Box>
    </Box>
  );
}
