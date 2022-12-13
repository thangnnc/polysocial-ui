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

export const DialogEditGroup = ({ open, setOpen, group, onChange }) => {
  const [groupEdit, setGroupEdit] = useState([]);

  useEffect(() => {
    setGroupEdit(group);
  }, [group]);

  const updateGroup = async () => {
    const response = await Axios.Groups.updateGroup(groupEdit);
    if (response) {
      toast.success("Cập nhật nhóm học tập thành công");
      setOpen(false);
      onChange(); // set call back update group
    } else {
      toast.error("Cập nhật nhóm học tập thất bại!");
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
              <label htmlFor="avatar">
                <Avatar sx={styleAvatar} alt="Remy Sharp" src={group?.avatar} />
                <Typography width="100%" fontSize={24} textAlign="center">
                  Chọn ảnh nhóm học tập
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
                value={groupEdit.groupId === null ? "" : groupEdit.groupId}
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
                name="name"
                label="Tên nhóm học tập"
                value={groupEdit.name === null ? "" : groupEdit.name}
                onChange={(e) =>
                  setGroupEdit({ ...groupEdit, name: e.target.value })
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
                name="totalMember"
                label="Số lượng thành viên"
                placeholder="Nhập số lượng thành viên "
                value={
                  groupEdit.totalMember === null ? "" : groupEdit.totalMember
                }
                onChange={(e) =>
                  setGroupEdit({ ...groupEdit, totalMember: e.target.value })
                }
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={"ic:sharp-groups"} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="none"
                sx={styleInputFullField}
              />

              <TextField
                name="description"
                label="Mô tả nhóm học tập"
                placeholder="Nhập mô tả nhóm học tập"
                value={
                  groupEdit.description === null ? "" : groupEdit.description
                }
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
              />

              <TextField
                name="createdDate"
                label="Ngày taọ nhóm học tập"
                type="datetime-local"
                placeholder="Chọn ngày tạo nhóm học tập"
                value={
                  groupEdit.createdDate === null ? "" : groupEdit.createdDate
                }
                onChange={(e) =>
                  setGroupEdit({ ...groupEdit, createdDate: e.target.value })
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
