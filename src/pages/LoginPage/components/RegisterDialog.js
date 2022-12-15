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
  Backdrop,
  CircularProgress,
  DialogContentText,
  Divider,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import Iconify from "../../../components/iconify";
import Axios from "../../../utils/Axios";
import { toast } from "react-toastify";
import useLogin from "../../../utils/Login/useLogin";

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

const LayoutFormTwoField = ({ children }) => {
  return (
    <Grid container spacing={2} sx={{ width: "100%" }}>
      {children}
    </Grid>
  );
};

const genderList = [
  { title: "Nam", value: true },
  { title: "Nữ", value: false },
];

const marjorList = [
  { title: "Ứng Dụng Phần Mềm", value: "Ứng Dụng Phần Mềm" },
  { title: "Phát Triển Phần Mềm", value: "Phát Triển Phần Mềm" },
  { title: "Lập Trình Di Động", value: "Lập Trình Di Động" },
  { title: "Thiết Kế WEB", value: "Thiết Kế WEB" },
  { title: "Thiết Kế Đồ Họa", value: "Thiết Kế Đồ Họa" },
  { title: "Tự Động Hóa", value: "Tự Động Hóa" },
];

export const RegisterDialog = ({ open = false, setOpen, newUser }) => {
  const { setAccount } = useLogin();
  const [src, setSrc] = React.useState();
  const [userReg, setUserReg] = React.useState({});
  const [showLoading, setShowLoading] = React.useState(false);

  const handleUploadFile = (e) => {
    setUserReg((user) => ({
      ...user,
      avatarFile: e.target.files[0],
    }));
    setSrc(URL.createObjectURL(e.target.files[0]));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getStudentCodeFromEmail = (email) => {
    let studentCode;
    if (email) {
      let regexCode = /ps[0-9]{5}/;
      let arrEmail = email.split(regexCode);
      studentCode = email
        .replace(arrEmail[0], "")
        .replace(arrEmail[1], "")
        .toUpperCase();
    }
    return studentCode;
  };

  const handleOnSubmit = () => {
    setShowLoading(() => true);
    const data = userReg;
    let formData = new FormData();
    data.email = newUser.email;
    data.fullName = newUser.fullName;
    data.studentCode = getStudentCodeFromEmail(newUser.email);
    if (data.email.includes("@fpt.edu.vn")) {
      data.role = "Sinh viên";
    } else {
      data.role = "Giảng viên";
    }
    if (!data.file) {
      data.avatar = newUser.avatar;
    } else {
      formData.append("avatarFile", data.file);
    }
    for (var key in data) {
      if (key === "birthday") {
        formData.append("birthdayStr", data[key]);
      } else {
        formData.append(key, data[key]);
      }
    }
    handleRegister(formData);
  };

  const handleRegister = async (formData) => {
    const response = await Axios.LoginAPI.registerAPI(formData);
    console.log(response);
    if (response) {
      setAccount(response);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập!");
      window.location = "/home";
    } else {
      toast.error("Đăng ký thất bại. Vui lòng thử lại!");
      setOpen(() => false);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="1000">
        <DialogTitle>Đăng Ký Tài Khoản Mới</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={2} sx={{ width: 800 }}>
            <Grid item xs={5}>
              <label htmlFor="avatar">
                <Avatar
                  sx={styleAvatar}
                  alt="Remy Sharp"
                  src={src ? src : newUser.avatar}
                />
                <Typography width="100%" fontSize={24} textAlign="center">
                  Chọn ảnh đại diện
                </Typography>
              </label>
              <TextField
                id="avatar"
                name="avatar"
                label="File"
                type="file"
                sx={{ display: "none" }}
                onChange={handleUploadFile}
              />
            </Grid>

            <Grid item xs={7}>
              <TextField
                name="email"
                label="Email"
                value={newUser.email}
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
                name="password"
                type="password"
                label="Mật khẩu"
                placeholder="Nhập Mật Khẩu"
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={"carbon:password"} />
                    </InputAdornment>
                  ),
                }}
                onChange={({ target }) =>
                  setUserReg((user) => ({
                    ...userReg,
                    password: target.value,
                  }))
                }
                autoComplete="none"
                sx={styleInputFullField}
              />
              <TextField
                name="fullName"
                label="Họ Và Tên"
                value={userReg?.fullName ? userReg.fullName : newUser.fullName}
                placeholder="Nhập Họ Và Tên"
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={"icon-park-solid:edit-name"} />
                    </InputAdornment>
                  ),
                }}
                onChange={({ target }) =>
                  setUserReg((user) => ({
                    ...userReg,
                    fullName: target.value,
                  }))
                }
                autoComplete="none"
                sx={styleInputFullField}
              />
              <LayoutFormTwoField>
                <Grid item xs={6}>
                  <TextField
                    name="studentCode"
                    label="Mã Sinh Viên"
                    value={getStudentCodeFromEmail(newUser.email)}
                    placeholder="Nhập Mã Sinh Viên"
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
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="course"
                    label="Khóa Học"
                    placeholder="Nhập Khóa Học"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify icon={"bi:ticket-perforated-fill"} />
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="none"
                    onChange={({ target }) =>
                      setUserReg((user) => ({
                        ...userReg,
                        course: target.value,
                      }))
                    }
                    sx={styleInputFullField}
                  />
                </Grid>
              </LayoutFormTwoField>
              <Autocomplete
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
                      setUserReg((user) => ({
                        ...userReg,
                        major: target.value,
                      }))
                    }
                    sx={styleInputFullField}
                  />
                )}
              />
              <LayoutFormTwoField>
                <Grid item xs={6}>
                  <TextField
                    name="birthday"
                    label="Ngày Sinh"
                    type="date"
                    placeholder="Chọn Ngày Sinh"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify icon={"material-symbols:date-range"} />
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="none"
                    onChange={({ target }) =>
                      setUserReg((user) => ({
                        ...userReg,
                        birthday: target.value,
                      }))
                    }
                    sx={styleInputFullField}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    name="course"
                    options={genderList}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Iconify icon={"ph:gender-intersex-bold"} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <React.Fragment>
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                        variant="standard"
                        label="Giới Tính"
                        placeholder="Chọn Giới Tính"
                        onSelect={({ target }) =>
                          setUserReg((user) => ({
                            ...userReg,
                            gender: target.value === "Nam",
                          }))
                        }
                        sx={styleInputFullField}
                      />
                    )}
                  />
                </Grid>
              </LayoutFormTwoField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 12px 24px" }}>
          <Button
            onClick={handleOnSubmit}
            variant="contained"
            className="btn-orange"
          >
            Đăng Ký
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoading}
      >
        <CircularProgress color="inherit" sx={{ zIndex: 999999 }} />
      </Backdrop>
      s
    </div>
  );
};
