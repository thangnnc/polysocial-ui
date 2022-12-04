import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
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
import { useEffect } from "react";
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
  mb: 4,
};

export const DialogEditUser = ({ open, setOpen, user, onChange }) => {
  const [userEdit, setUserEdit] = useState([]);

  useEffect(() => {
    setUserEdit(user);
  }, [user]);

  const updateUser = async () => {
    const response = await Axios.Accounts.updateUser(userEdit);
    if (response) {
      toast.success("Cập nhật người dùng thành công");
      setOpen(false);
      onChange(); // set call back update group
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
        <DialogTitle>Chỉnh Sửa Tài Khoản</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={2} sx={{ width: 800 }}>
            <Grid item xs={5}>
              <label htmlFor="avatar">
                <Avatar sx={styleAvatar} alt="Remy Sharp" src={user.avatar} />
                <Typography width="100%" fontSize={24} textAlign="center">
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

            <Grid item xs={7} style={{ marginTop: 17 }}>
              <TextField
                name="fullName"
                label="Họ Và Tên"
                placeholder="Nhập Họ Và Tên"
                value={user.fullName}
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
                value={user.email}
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
                value={user.studentCode}
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
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Trạng thái
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
                        checked={!user.status}
                        value="true"
                        name="radio-buttons"
                      />
                    }
                    label="Đang hoạt động"
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio
                        checked={user.status}
                        value="false"
                        name="radio-buttons"
                      />
                    }
                    label="Đã khóa"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 12px 24px" }}>
          <Button onClick={updateUser} variant="contained" color="warning">
            Cập nhật
          </Button>
          <Button onClick={handleClose} variant="contained" color="success">
            Làm mới
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
