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
import { useEffect, useState } from "react";

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

export const DialogEditContent = ({ open, setOpen, content }) => {
  const [contentEdit, setContentEdit] = useState([]);

  useEffect(() => {
    setContentEdit(content);
  }, [content]);

  const updateGroup = async () => {
    const response = await Axios.Groups.updateGroup(contentEdit);
    if (response) {
      alert("Update group successfully!");
      setOpen(false);
      window.location.reload();
    } else {
      alert("Update group failed!");
    }
  };

  const deleteGroup = async () => {
    const response = await Axios.Groups.deleteGroup(contentEdit.groupId);
    if (response.status === 200) {
      alert("Delete group successfully!");
      setOpen(false);
      window.location.reload();
    } else {
      alert("Delete group failed!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="1000">
        <DialogTitle>Chỉnh Sửa Bài Viết</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={2} sx={{ width: 800 }}>
            <Grid item xs={5}>
              <label htmlFor="avatar">
                <Avatar
                  sx={styleAvatar}
                  alt="Hình ảnh bài viết"
                  src={contentEdit.user?.avatar}
                />
                <Typography width="100%" fontSize={24} textAlign="center">
                  Ảnh người đăng
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

            <Grid item xs={7}>
              <TextField
                name="groupId"
                label="Mã nhóm học tập"
                value={contentEdit?.groupId}
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
              />

              <TextField
                name="fullName"
                label="Người đăng"
                value={contentEdit.user?.fullName}
                variant="standard"
                placeholder="Nhập người đăng bài viết"
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

              <LayoutFormTwoField>
                <Grid item xs={6}>
                  <TextField
                    name="countComment"
                    label="Tổng số bình luận"
                    variant="standard"
                    value={contentEdit?.countComment}
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
                    name="countLike"
                    label="Tổng số lượt thích"
                    variant="standard"
                    value={contentEdit?.countLike}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify icon={"bi:ticket-perforated-fill"} />
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="none"
                    sx={styleInputFullField}
                  />
                </Grid>
              </LayoutFormTwoField>

              <TextField
                name="content"
                label="Nội dung bài viết"
                value={contentEdit?.content}
                onChange={(e) =>
                  setContentEdit({ ...contentEdit, name: e.target.value })
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
              />

              <TextField
                name="createdDate"
                label="Ngày taọ bài viết"
                type="datetime-local"
                placeholder="Chọn ngày tạo bài viết"
                value={contentEdit?.createdDate}
                onChange={(e) =>
                  setContentEdit({
                    ...contentEdit,
                    createdDate: e.target.value,
                  })
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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 12px 24px" }}>
          <Button onClick={updateGroup} variant="contained" color="warning">
            Cập nhật
          </Button>
          <Button onClick={deleteGroup} variant="contained" color="error">
            Xóa
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
