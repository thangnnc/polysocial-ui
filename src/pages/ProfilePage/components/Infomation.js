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

      <Box sx={{ my: 1, display: "flex", width: "100%" }}>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Avatar
              sx={{
                width: "180px",
                height: "180px",
                objectFit: "cover",
                border: "3px solid #c9c9d1",
              }}
              variant="square"
              src={props.user.avatar}
              alt={props.user.fullName}
            />
            <Typography sx={{ fontSize: "18", textAlign: "center", pt: 1 }}>
              Ảnh đại diện
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "50%" }}>
          <TextField
            disabled
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
            sx={{ ...styleInputFullField, mt: 1 }}
          />

          <TextField
            disabled
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
            disabled
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

      {account?.email === props.user?.email ? (
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
                  value={props.userDetails.gender}
                >
                  <FormControlLabel
                    disabled
                    value="true"
                    control={<Radio value="true" name="radio-buttons" />}
                    label="Nam"
                  />
                  <FormControlLabel
                    disabled
                    value="false"
                    control={<Radio value="false" name="radio-buttons" />}
                    label="Nữ"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                disabled
                name="address"
                label="Địa chỉ"
                placeholder="Nhập địa chỉ"
                value={
                  !props.userDetails.address ? "" : props.userDetails.address
                }
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
                disabled
                name="birthday"
                label="Ngày sinh"
                type="datetime-local"
                placeholder="Chọn ngày sinh"
                value={
                  !props.userDetails.birthday ? "" : props.userDetails.birthday
                }
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
                disabled
                name="major"
                label="Chuyên ngành"
                placeholder="Nhập chuyên ngành"
                value={!props.userDetails.major ? "" : props.userDetails.major}
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
      ) : (
        ""
      )}
    </Box>
  );
}
