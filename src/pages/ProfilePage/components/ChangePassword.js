import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Iconify from "../../../components/iconify/Iconify";
import useLogin from "../../../utils/Login/useLogin";
import useValidator from "../../../utils/Validator";
import Axios from "./../../../utils/Axios/index";

const styleInputFullField = {
  width: "45%",
  mb: 3,
  mr: 3,
};

export default function ChangePassword(props) {
  const { logout } = useLogin();

  const { validate } = useValidator();

  const [showPassword, setShowPassword] = useState(false);

  const [showNewPassword, setNewShowPassword] = useState(false);

  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const [user, setUser] = useState({
    userId: props.user.userId,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleOnInput = (event, error) => {
    const { name, value } = event.target;
    setErrors({
      ...errors,
      [name]: validate(error, value),
    });
  };

  function deepObjectEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);

      if (
        (areObjects && !deepObjectEqual(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) {
        return false;
      }
    }

    return true;
  }

  function isObject(object) {
    return object != null && typeof object === "object";
  }

  const updatePassword = async () => {
    const data = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    if (!deepObjectEqual(data, errors)) {
      setErrors({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      if (user.newPassword !== user.confirmPassword) {
        toast.error("Mật khẩu mới không khớp!");
        return;
      } else if (user.newPassword === user.oldPassword) {
        toast.error("Mật khẩu mới không được trùng với mật khẩu cũ!");
        return;
      } else {
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
    } else {
      setErrors({
        ...errors,
        oldPassword: "Mật khẩu cũ không được để trống!",
        newPassword: "Mật khẩu mới không được để trống!",
        confirmPassword: "Xác nhận mật khẩu mới không được để trống!",
      });
      toast.error("Vui lòng điền đầy đủ thông tin!");
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
          type={showPassword ? "text" : "password"}
          placeholder="Nhập mật khẩu"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={"bxs:lock"} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoComplete="none"
          onChange={(e) => {
            setUser({ ...user, oldPassword: e.target.value });
          }}
          sx={styleInputFullField}
          error={errors.oldPassword ? true : false}
          helperText={errors.oldPassword}
          onInput={(e) => handleOnInput(e, "Mật khẩu cũ")}
        />
      </Box>
      <Box>
        <TextField
          name="newpassword"
          label="Mật khẩu mới"
          type={showNewPassword ? "text" : "password"}
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
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setNewShowPassword(!showNewPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showNewPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoComplete="none"
          sx={styleInputFullField}
          error={errors.newPassword ? true : false}
          helperText={errors.newPassword}
          onInput={(e) => handleOnInput(e, "Mật khẩu mới")}
        />

        <TextField
          name="confirmpassword"
          label="Nhập lại mật khẩu mới"
          type={showConfirmPassword ? "text" : "password"}
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
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setConfirmShowPassword(!showConfirmPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={
                      showConfirmPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoComplete="none"
          sx={styleInputFullField}
          error={errors.confirmPassword ? true : false}
          helperText={errors.confirmPassword}
          onInput={(e) => handleOnInput(e, "Xác nhận mật khẩu mới")}
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
