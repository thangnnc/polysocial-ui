import {
  Avatar,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Iconify from "../../../components/iconify/Iconify";
import useLogin from "../../../utils/Login/useLogin";

const styleInputFullField = {
  width: "80%",
  mb: 3,
};

export default function Infomation(props) {
  const { account } = useLogin();

  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", fontSize: "20" }}>
        Thông tin cá nhân
      </Typography>

      <Box sx={{ mt: 1, display: "flex", width: "100%" }}>
        <Box sx={{ width: "30%" }}>
          <Avatar
            sx={{ width: 200, height: 200 }}
            variant="square"
            src={props.user.avatar}
            alt={props.user.fullName}
          />
        </Box>
        <Box sx={{ width: "70%" }}>
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
            name="email"
            label="Email"
            value={!props.user.email ? "" : props.user.email}
            variant="standard"
            placeholder="Nhập email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={"entypo:mail"} />
                </InputAdornment>
              ),
            }}
            autoComplete="none"
            sx={styleInputFullField}
          />

          <TextField
            name="studentCode"
            label="Mã Sinh Viên"
            placeholder="Nhập Mã Sinh Viên"
            value={!props.user.studentCode ? "" : props.user.studentCode}
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={"bxs:id-card"} />
                </InputAdornment>
              ),
            }}
            autoComplete="none"
            sx={styleInputFullField}
          />
        </Box>
      </Box>

      {props.user.status === 2 ||
        (account?.email === props.user.email && (
          <>
            <Typography sx={{ fontWeight: "bold", fontSize: "20" }}>
              Thông tin chi tiết
            </Typography>

            <Box sx={{ mt: 1, display: "flex", width: "100%" }}>
              <Box sx={{ width: "50%" }}>
                <FormControl sx={{ mb: "7px" }}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Giới tính
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="true"
                      control={
                        <Radio
                          checked={!props.user.gender}
                          value="true"
                          name="radio-buttons"
                        />
                      }
                      label="Name"
                    />
                    <FormControlLabel
                      value="false"
                      control={
                        <Radio
                          checked={props.user.gender}
                          value="false"
                          name="radio-buttons"
                        />
                      }
                      label="Nữ"
                    />
                  </RadioGroup>
                </FormControl>
                <TextField
                  name="address"
                  label="Địa chỉ"
                  placeholder="Nhập địa chỉ"
                  value={!props.user.address ? "" : props.user.address}
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon={"bxs:id-card"} />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="none"
                  sx={styleInputFullField}
                />
              </Box>
              <Box sx={{ width: "50%" }}>
                <TextField
                  name="birthday"
                  label="Ngày sinh"
                  type="datetime-local"
                  placeholder="Chọn ngày sinh"
                  value={!props.user.birthday ? "" : props.user.birthday}
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon={"material-symbols:date-range"} />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="none"
                  sx={styleInputFullField}
                />

                <TextField
                  name="major"
                  label="Chuyên ngành"
                  placeholder="Nhập chuyên ngành"
                  value={!props.user.major ? "" : props.user.major}
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon={"bxs:id-card"} />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="none"
                  sx={styleInputFullField}
                />
              </Box>
            </Box>
          </>
        ))}
    </Box>
  );
}
