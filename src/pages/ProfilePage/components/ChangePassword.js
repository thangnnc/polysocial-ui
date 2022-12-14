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
        toast.error("M???t kh???u m???i kh??ng kh???p!");
        return;
      } else if (user.newPassword === user.oldPassword) {
        toast.error("M???t kh???u m???i kh??ng ???????c tr??ng v???i m???t kh???u c??!");
        return;
      } else {
        const response = await Axios.Accounts.updatePassword(user);
        if (response === "Update password success") {
          toast.success("C???p nh???t m???t kh???u th??nh c??ng");
          setTimeout(() => {
            logout();
          }, 6000);
        } else {
          toast.error("C???p nh???t m???t kh???u th???t b???i!");
        }
      }
    } else {
      setErrors({
        ...errors,
        oldPassword: "M???t kh???u c?? kh??ng ???????c ????? tr???ng!",
        newPassword: "M???t kh???u m???i kh??ng ???????c ????? tr???ng!",
        confirmPassword: "X??c nh???n m???t kh???u m???i kh??ng ???????c ????? tr???ng!",
      });
      toast.error("Vui l??ng ??i???n ?????y ????? th??ng tin!");
    }
  };

  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", fontSize: "20" }}>
        ?????i m???t kh???u
      </Typography>
      <Box sx={{ mt: 2 }}>
        <TextField
          name="fullName"
          label="H??? V?? T??n"
          placeholder="Nh???p H??? V?? T??n"
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
          label="M???t kh???u"
          type={showPassword ? "text" : "password"}
          placeholder="Nh???p m???t kh???u"
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
          onInput={(e) => handleOnInput(e, "M???t kh???u c??")}
        />
      </Box>
      <Box>
        <TextField
          name="newpassword"
          label="M???t kh???u m???i"
          type={showNewPassword ? "text" : "password"}
          placeholder="Nh???p m???t kh???u m???i"
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
          onInput={(e) => handleOnInput(e, "M???t kh???u m???i")}
        />

        <TextField
          name="confirmpassword"
          label="Nh???p l???i m???t kh???u m???i"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Nh???p l???i m???t kh???u m???i"
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
          onInput={(e) => handleOnInput(e, "X??c nh???n m???t kh???u m???i")}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 7 }}>
        <Button onClick={updatePassword} variant="contained" color="warning">
          ?????i m???t kh???u
        </Button>
      </Box>
    </Box>
  );
}
