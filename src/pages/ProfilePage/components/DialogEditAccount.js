import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Autocomplete,
  Avatar,
  Box,
  DialogContentText,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Iconify from "../../../components/iconify";
import { useState } from "react";
import { toast } from "react-toastify";
import Axios from "./../../../utils/Axios/index";

const styleInputFullField = {
  width: "100%",
  mb: 3,
};

const styleAvatar = {
  width: 180,
  height: 180,
  mx: "auto",
  mt: 6,
  mb: 2,
};

const marjorList = [
  { title: "Ứng Dụng Phần Mềm", value: "Ứng Dụng Phần Mềm" },
  { title: "Phát Triển Phần Mềm", value: "Phát Triển Phần Mềm" },
  { title: "Lập Trình Di Động", value: "Lập Trình Di Động" },
  { title: "Thiết Kế WEB", value: "Thiết Kế WEB" },
  { title: "Thiết Kế Đồ Họa", value: "Thiết Kế Đồ Họa" },
  { title: "Tự Động Hóa", value: "Tự Động Hóa" },
];

export const DialogEditAccount = ({
  open,
  setOpen,
  user,
  userDetails,
  onchange,
}) => {
  const [userEdit, setUserEdit] = useState(userDetails);

  const updateUser = async () => {
    const response = await Axios.Accounts.updateUser(userEdit);
    if (response) {
      toast.success("Cập nhật người dùng thành công");
      onchange();
      setOpen(false);
    } else {
      toast.error("Cập nhật người dùng thất bại!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="1000">
        <DialogTitle>Chỉnh Sửa Thông Tin</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={2} sx={{ width: 800 }}>
            <Grid item xs={6}>
              <label htmlFor="avatar">
                <Avatar sx={styleAvatar} alt="Remy Sharp" src={user?.avatar} />
                <Typography width="100%" fontSize={20} textAlign="center">
                  Ảnh đại diện
                </Typography>
              </label>
              <TextField
                id="avatar"
                name="avatar"
                label="File"
                type="file"
                sx={{ display: "none" }}
              />
            </Grid>

            <Grid item xs={6} style={{ marginTop: 17 }}>
              <TextField
                disabled
                name="fullName"
                label="Họ Và Tên"
                placeholder="Nhập Họ Và Tên"
                value={!user.fullName ? "" : user.fullName}
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
                disabled
                name="email"
                label="Email"
                value={!user.email ? "" : user.email}
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
                value={!user.studentCode ? "" : user.studentCode}
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

              <TextField
                disabled
                name="course"
                label="Khoá"
                placeholder="Nhập khoá"
                value={!userDetails.course ? "" : userDetails.course}
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={"fluent-mdl2:publish-course"} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="none"
                sx={styleInputFullField}
              />
            </Grid>

            <Box sx={{ mt: 1, display: "flex", width: "100%" }}>
              <Box sx={{ width: "49%", ml: 1 }}>
                <FormControl sx={{ mb: "7px", ml: 5 }}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Giới tính
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={userEdit.gender}
                    onChange={(e) => {
                      setUserEdit({ ...userEdit, gender: e.target.value });
                    }}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio name="radio-buttons" />}
                      label="Nam"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio name="radio-buttons" />}
                      label="Nữ"
                    />
                  </RadioGroup>
                </FormControl>
                <TextField
                  name="address"
                  label="Địa chỉ"
                  value={!userEdit.address ? "" : userEdit.address}
                  onChange={(e) => {
                    setUserEdit({ ...userEdit, address: e.target.value });
                  }}
                  variant="standard"
                  placeholder="Nhập địa chỉ"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon={"bxs:id-card"} />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="none"
                  sx={
                    (styleInputFullField,
                    { ...styleInputFullField, ml: 5, width: "90%" })
                  }
                />
              </Box>

              <Box sx={{ width: "49%" }}>
                <TextField
                  name="birthday"
                  label="Ngày sinh"
                  type="datetime-local"
                  placeholder="Chọn ngày sinh"
                  value={!userEdit.birthday ? "" : userEdit.birthday}
                  onChange={(e) => {
                    setUserEdit({ ...userEdit, birthday: e.target.value });
                  }}
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

                <Autocomplete
                  value={marjorList.find(
                    (major) => major.value === userEdit?.major
                  )}
                  name="major"
                  options={marjorList}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <Iconify icon={"bx:code-block"} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <React.Fragment>
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                      variant="standard"
                      label="Ngành Học"
                      placeholder="Chọn Ngành Học"
                      onSelect={({ target }) =>
                        setUserEdit((e) => ({
                          ...userEdit,
                          major: target.value,
                        }))
                      }
                      sx={styleInputFullField}
                    />
                  )}
                />
              </Box>
            </Box>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 12px 24px" }}>
          <Button onClick={updateUser} variant="contained" color="warning">
            Cập nhật
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            className="btn-secondary"
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
