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

export const DialogCreateMember = ({ open, setOpen }) => {
  const [groupEdit, setGroupEdit] = useState([]);

  const createGroup = async () => {
    await Axios.Groups.createGroup(groupEdit);
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
                id="avatar"
                name="avatar"
                label="File"
                type="file"
                sx={{ display: "none" }}
              />
            </Grid>

            <Grid item xs={7}>
              <TextField
                name="name"
                label="Tên nhóm học tập"
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
