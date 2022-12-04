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
import { toast } from "react-toastify";

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

export const DialogEditContent = ({ open, setOpen, content, onChange }) => {
  const [contentEdit, setContentEdit] = useState([]);

  useEffect(() => {
    setContentEdit(content);
  }, [content]);

  const updateGroup = async () => {
    const data = {
      postId: contentEdit.postId,
      content: contentEdit.content,
      createBy: contentEdit.user.userId,
      groupId: contentEdit.groupId,
      files: contentEdit.listUrl,
    };
    const response = await Axios.Contents.updatePost(data);
    if (response) {
      toast.success("Cập nhật bài viết thành công");
      setOpen(false);
      onChange();
    } else {
      toast.error("Cập nhật bài viết thất bại!");
    }
  };

  const deleteGroup = async () => {
    const response = await Axios.Contents.deletePost(contentEdit.postId);
    if (response.status === 200) {
      toast.success("Xoá bài viết thành công");
      setOpen(false);
      onChange();
    } else {
      toast.error("Xoá bài viết thất bại!");
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
                      <Iconify icon={"icon-park-solid:edit-name"} />
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
                          <Iconify icon={"material-symbols:comment-outline"} />
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
                          <Iconify icon={"bxs:like"} />
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
                  setContentEdit({
                    ...contentEdit,
                    content: e.target.value,
                  })
                }
                variant="standard"
                placeholder="Nhập tên nhóm học tập"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={"fluent:text-description-20-regular"} />
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
