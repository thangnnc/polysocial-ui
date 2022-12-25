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
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import Iconify from "../../../components/iconify";
import Axios from "./../../../utils/Axios/index";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useValidator from "../../../utils/Validator";
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

export const DialogEditGroup = ({ open, setOpen, group, onChange }) => {
  const { validate } = useValidator();

  const { account } = useLogin();

  const [groupEdit, setGroupEdit] = useState({});

  const [errors, setErrors] = useState({
    name: "",
    className: "",
    description: "",
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

  useEffect(() => {
    setGroupEdit(group);
  }, [group]);

  const handleUploadFile = (e) => {
    setGroupEdit((group) => ({
      ...group,
      avatarFile: e.target.files[0],
    }));
  };

  const updateGroup = async () => {
    const data = {
      name: "",
      className: "",
      description: "",
    };

    if (!deepObjectEqual(data, errors)) {
      const response = await Axios.Groups.updateGroup(groupEdit);
      if (response) {
        toast.success("Cập nhật nhóm học tập thành công");
        setOpen(false);
        onChange(); // set call back update group
      } else {
        toast.error("Cập nhật nhóm học tập thất bại!");
      }
    } else {
      setErrors({
        ...errors,
        name: "Tên nhóm học tập không được để trống!",
        className: "Tên lớp không được để trống!",
        description: "Mô tả không được để trống!",
      });
      toast.error("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const deleteGroup = async () => {
    const response = await Axios.Groups.deleteGroup(groupEdit.groupId);
    if (response.status === 200) {
      toast.success("Xoá nhóm học tập thành công");
      setOpen(false);
      onChange();
    } else {
      toast.error("Xoá nhóm học tập thất bại!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="1000">
        <DialogTitle>Chỉnh Sửa Nhóm Học Tập</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={2} sx={{ width: 800 }}>
            <Grid item xs={5}>
              <label htmlFor="avatarFile">
                <Avatar
                  sx={styleAvatar}
                  alt="Remy Sharp"
                  src={group?.avatarGroup}
                />
                <Typography width="100%" fontSize={24} textAlign="center">
                  Chọn ảnh nhóm
                </Typography>
              </label>
              <TextField
                id="avatarFile"
                name="avatarFile"
                label="File"
                type="file"
                sx={{ display: "none" }}
                onChange={handleUploadFile}
              />
            </Grid>

            <Grid item xs={7}>
              <TextField
                disabled
                name="groupId"
                label="Mã nhóm học tập"
                value={groupEdit?.groupId === null ? "" : groupEdit?.groupId}
                onChange={(e) =>
                  setGroupEdit({ ...groupEdit, groupId: e.target.value })
                }
                variant="standard"
                placeholder="Nhập mã nhóm học tập"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={"material-symbols:edit-note-sharp"} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="none"
                sx={styleInputFullField}
              />

              <TextField
                name="name"
                label="Tên nhóm học tập"
                value={
                  (groupEdit?.groupName === null ? "" : groupEdit?.groupName) ||
                  (groupEdit?.name === null ? "" : groupEdit?.name)
                }
                onChange={(e) =>
                  groupEdit?.groupName
                    ? setGroupEdit({ ...groupEdit, groupName: e.target.value })
                    : setGroupEdit({ ...groupEdit, name: e.target.value })
                }
                variant="standard"
                placeholder="Nhập tên nhóm học tập"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={"material-symbols:edit-note-sharp"} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="none"
                sx={styleInputFullField}
                error={errors.name ? true : false}
                helperText={errors.name}
                onInput={(e) => handleOnInput(e, "Tên nhóm học tập")}
              />

              <TextField
                name="className"
                label="Tên lớp học tập"
                value={
                  groupEdit?.className === null ? "" : groupEdit?.className
                }
                onChange={(e) =>
                  setGroupEdit({ ...groupEdit, className: e.target.value })
                }
                variant="standard"
                placeholder="Nhập lớp học tập"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={"material-symbols:edit-note-sharp"} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="none"
                sx={styleInputFullField}
                error={errors.className ? true : false}
                helperText={errors.className}
                onInput={(e) => handleOnInput(e, "Tên lớp học tập")}
              />

              <TextField
                name="description"
                label="Mô tả nhóm học tập"
                placeholder="Nhập mô tả nhóm học tập"
                value={!groupEdit.description ? "" : groupEdit.description}
                onChange={(e) =>
                  setGroupEdit({ ...groupEdit, description: e.target.value })
                }
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={"fluent:text-description-20-regular"} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="none"
                sx={styleInputFullField}
                error={errors.description ? true : false}
                helperText={errors.description}
                onInput={(e) => handleOnInput(e, "Mô tả nhóm học tập")}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 12px 24px" }}>
          <Button onClick={updateGroup} variant="contained" color="warning">
            Cập nhật
          </Button>
          {account.role === "Giảng viên" && (
            <Button onClick={deleteGroup} variant="contained" color="error">
              Xóa
            </Button>
          )}
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
