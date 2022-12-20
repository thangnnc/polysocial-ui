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
import { useState } from "react";
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

export const DialogCreateGroup = ({ open, setOpen, onChange, propsSocket }) => {
  // const socket = propsSocket.socket.socket;
  // console.log("prooo--->", propsSocket.socket.socket);
  const [groupCreate, setGroupCreate] = useState({});

  const createGroup = async () => {
    console.log("groupCreate", groupCreate);
    const response = await Axios.Groups.createGroup(groupCreate);
    console.log("response", response);

    if (response) {
      toast.success("Tạo nhóm học tập thành công");

      setOpen(false);
      onChange();
    } else {
      toast.error("Tạo nhóm học tập thất bại!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="1000">
        <DialogTitle>Tạo Nhóm Học Tập</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={2} sx={{ width: 800 }}>
            <Grid item xs={5}>
              <label htmlFor="avatar">
                <Avatar
                  sx={styleAvatar}
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                />
                <Typography width="100%" fontSize={24} textAlign="center">
                  Chọn ảnh nhóm học tập
                </Typography>
              </label>
              <TextField
                id="avatarFile"
                name="avatarFile"
                label="File"
                type="file"
                sx={{ display: "none" }}
                onChange={(e) =>
                  setGroupCreate({ ...groupCreate, avatarFile: null })
                }
              />
            </Grid>

            <Grid item xs={7}>
              <TextField
                name="adminId"
                label="Người tạo nhóm học tập"
                onChange={(e) =>
                  setGroupCreate({ ...groupCreate, adminId: e.target.value })
                }
                variant="standard"
                placeholder="Nhập tên người tạo nhóm học tập"
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
                onChange={(e) =>
                  setGroupCreate({ ...groupCreate, name: e.target.value })
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
                name="className"
                label="Nhom lop hoc tap"
                onChange={(e) =>
                  setGroupCreate({ ...groupCreate, className: e.target.value })
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
                onChange={(e) =>
                  setGroupCreate({
                    ...groupCreate,
                    totalMember: e.target.value,
                  })
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
                onChange={(e) =>
                  setGroupCreate({
                    ...groupCreate,
                    description: e.target.value,
                  })
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
                onChange={(e) =>
                  setGroupCreate({
                    ...groupCreate,
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
          <Button onClick={createGroup} variant="contained" color="warning">
            Tạo nhóm
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
