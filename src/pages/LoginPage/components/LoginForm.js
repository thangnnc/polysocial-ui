import { useEffect, useState } from "react";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
  Button,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
// components
import Iconify from "../../../components/iconify";
import Axios from "../../../utils/Axios/Axios";
import useLogin from "../../../utils/Login/useLogin";
import useValidator from "../../../utils/Validator";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { RegisterDialog } from "../components/RegisterDialog";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

const clientId =
  "42163288513-umf3io4r9hoab89kvqm5bu4tafmsqtqv.apps.googleusercontent.com";

export const LoginForm = (props) => {
  const { setAccount } = useLogin();
  const { validate } = useValidator();
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isShowRegister, setShowRegister] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: undefined,
    fullName: undefined,
    studentCode: undefined,
    avatar: undefined,
    course: undefined,
    major: undefined,
    birthday: undefined,
    gender: undefined,
  });
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [form, setForm] = useState({
    status: "success",
    message: "",
  });

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  const loginWithAccount = async () => {
    const response = await Axios.post("/api/login-account", inputValues);
    if (response.status === 200 && response.data) {
      setAccount(response.data);
      window.location = "/home";
      toast.success("Đăng nhập thành công!");
      return true;
    } else {
      toast.error("Sai tên đăng nhập hoặc tài khoản!");
    }
    setShowLoading(() => false);
  };

  const loginWithEmail = async (email) => {
    const response = await Axios.post("/api/login-email", { email: email });
    if (response.status === 200 && response.data) {
      setAccount(response.data);
      window.location = "/home";
      return true;
    } else {
      setShowRegister(true);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let target = Array.from(e.target);
    let validForm = true;
    let error = {};
    target.forEach((data) => {
      if (data.name) {
        let err = validate(data.name, data.value);
        if (err) {
          error[data.name] = err;
          validForm = false;
        }
      }
    });
    setErrors(() => ({ ...errors, ...error }));

    if (validForm) {
      setShowLoading(() => true);
      loginWithAccount();
    } else {
      setForm(() => ({
        status: "error",
        message: "Form is invalid!",
      }));
      setShowAlert(true);
    }
  };

  const handleOnInput = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const responseGoogle = (response) => {
    const data = response.profileObj;
    if (
      !(data.email.includes("fpt.edu.vn") || data.email.includes("fe.fpt.vn"))
    ) {
      toast.warning("Hãy đăng nhập vào tài khoản FPT!");
      return;
    }
    setUserInfo((user) => ({
      ...user,
      email: data.email,
      fullName: data.name,
      avatar: data.imageUrl,
    }));
    loginWithEmail(data.email);
  };

  // Alert
  const handleClose = (event) => {
    setShowAlert(false);
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <Stack spacing={3}>
          <TextField
            name="email"
            label="Email"
            value={inputValues.email}
            placeholder="Nhập email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={"bxs:user"} />
                </InputAdornment>
              ),
            }}
            autoComplete="none"
            error={errors.email ? true : false}
            helperText={errors.email}
            onInput={handleOnInput}
            autoFocus
          />
          <TextField
            name="password"
            label="Mật khẩu"
            value={inputValues.password}
            type={showPassword ? "text" : "password"}
            placeholder="Nhập mật khẩu"
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
            error={errors.password ? true : false}
            helperText={errors.password}
            onInput={handleOnInput}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={<Checkbox name="remember" />}
            label="Ghi nhớ tài khoản"
          />
          <Link
            to={"/forgot-password"}
            variant="subtitle2"
            style={{ textDecoration: "none", color: "#1b74e4" }}
          >
            Quên mật khẩu?
          </Link>
        </Stack>

        <Button
          className="btn-orange"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Đăng Nhập
        </Button>
      </form>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Hoặc
        </Typography>
      </Divider>

      <GoogleLogin
        clientId={clientId}
        render={(renderProps) => (
          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <Iconify
                icon="eva:google-fill"
                color="#DF3E30"
                width={22}
                height={22}
                marginRight={2}
              />
              Đăng nhập với Google
            </Button>
          </Stack>
        )}
        onSuccess={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={form.status}
          sx={{ width: "100%" }}
        >
          {form.message}
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <RegisterDialog
        newUser={userInfo}
        setUser={() => setUserInfo}
        open={isShowRegister}
        setOpen={setShowRegister}
      />
    </>
  );
};
