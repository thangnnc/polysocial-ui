import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Iconify from "../../../components/iconify/Iconify";
import Axios from "../../../utils/Axios/index";
import useValidator from "../../../utils/Validator";

export default function ForgotPasswordFrom() {
  const { validate } = useValidator();

  const [inputValues, setInputValues] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const handleOnInput = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleSubmit = async () => {
    const response = await Axios.LoginAPI.forgotPassword(inputValues);
    if (response.status === 200) {
      toast.success("Gửi mã xác nhận thành công");
      setTimeout(() => {
        window.location.href = "/login";
      }, 6000);
    } else {
      toast.error("Gửi mã xác nhận thất bại");
    }
  };

  return (
    <>
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
      </Stack>

      <Box sx={{ my: 2 }}>
        <Button
          className="btn-orange"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Gửi mã xác nhận
        </Button>
      </Box>
    </>
  );
}
