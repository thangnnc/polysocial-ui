import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  DialogContentText,
  Divider,
  Grid,
  InputAdornment,
} from "@mui/material";
import Iconify from "../../../components/iconify";
import React, { useState } from "react";
import Axios from "../../../utils/Axios/index";
import useLogin from "../../../utils/Login/useLogin";
import { toast } from "react-toastify";
import useValidator from "../../../utils/Validator";

const styleInputFullField = {
  width: "100%",
  mb: 3,
};

export const DialogCreateContent = ({ open, setOpen, content, onChange }) => {
  const { account } = useLogin();

  const { validate } = useValidator();

  const [errors, setErrors] = useState({
    content: "",
    groupId: "",
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

  const [itemInputPost, setItemInputPost] = useState({
    content: "",
    groupId: "",
    files: [],
  });

  const imageUpload = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      itemInputPost.files.push(e.target.files[i]);
    }
  };

  const handleSummit = async () => {
    const data = {
      content: "",
      groupId: "",
    };

    const formData = new FormData();
    formData.append("file", itemInputPost.files);
    if (!deepObjectEqual(data, errors)) {
      const responseCreate = await Axios.Contents.createPost(itemInputPost);
      if (responseCreate) {
        setOpen(false);
        toast.success("Thêm bài viết thành công");
        onChange();
      } else {
        toast.success("Thêm bài viết thất bại!");
      }
    } else {
      setErrors({
        ...errors,
        content: "Nội dung bài viết không được để trống!",
        groupId: "Mã nhóm học tập không được để trống!",
      });
      toast.error("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="1000">
        <DialogTitle>Đăng bài viết</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={2} sx={{ width: 800 }}>
            <Grid item xs={12}>
              <TextField
                name="fullName"
                label="Người đăng bài viết"
                value={account.fullName}
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify
                        icon={"material-symbols:qr-code-scanner-rounded"}
                      />
                    </InputAdornment>
                  ),
                }}
                autoComplete="none"
                sx={styleInputFullField}
              />

              <TextField
                name="groupId"
                label="Mã nhóm học tập"
                onChange={(event) =>
                  setItemInputPost({
                    ...itemInputPost,
                    groupId: event.target.value,
                  })
                }
                variant="standard"
                placeholder="Nhập mã nhóm học tập"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify
                        icon={"material-symbols:qr-code-scanner-rounded"}
                      />
                    </InputAdornment>
                  ),
                }}
                autoComplete="none"
                sx={styleInputFullField}
                error={errors.groupId ? true : false}
                helperText={errors.groupId}
                onInput={(e) => handleOnInput(e, "Mã nhóm học tập")}
              />

              <TextField
                name="content"
                label="Nội dung bài viết"
                onChange={(event) =>
                  setItemInputPost({
                    ...itemInputPost,
                    content: event.target.value,
                  })
                }
                variant="standard"
                placeholder="Nhập nội dung bài viết"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={"material-symbols:edit-note-sharp"} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="none"
                sx={styleInputFullField}
                error={errors.content ? true : false}
                helperText={errors.content}
                onInput={(e) => handleOnInput(e, "Nội dung bài viết")}
              />

              <TextField
                type="file"
                name="file"
                onChange={imageUpload}
                label="Hãy chọn ảnh của bạn."
                accept="image/jpeg, image/png, image/jpg"
                multiple
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={"material-symbols:attach-file-add"} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="none"
                sx={styleInputFullField}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 12px 24px" }}>
          <Button onClick={handleSummit} variant="contained" color="warning">
            Tạo bài viết
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
