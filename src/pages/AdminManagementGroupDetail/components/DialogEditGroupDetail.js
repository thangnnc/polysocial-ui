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
import useLogin from "./../../../utils/Login/useLogin";

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

export const DialogEditGroupDetail = ({
  open,
  setOpen,
  member,
  groupId,
  onChange,
}) => {
  const [memberEdit, setMemberEdit] = useState([]);

  const { account } = useLogin();

  useEffect(() => {
    setMemberEdit(member);
  }, [member]);

  const deleteMember = async () => {
    const data = {
      userId: memberEdit.userId,
      groupId: groupId,
    };
    const response = await Axios.Groups.deleteStudentGroup(data);
    if (response === "Leave group success") {
      toast.success("Xoá sinh viên thành công");
      setOpen(false);
      onChange();
    } else {
      toast.error("Xoá sinh viên thất bại");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="1000">
        <DialogTitle>Chỉnh Sửa Sinh Viên Nhóm Học Tập</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={2} sx={{ width: 800 }}>
            <Grid item xs={5}>
              <label htmlFor="avatar">
                <Avatar sx={styleAvatar} alt="Remy Sharp" src={member.avatar} />
                <Typography width="100%" fontSize={24} textAlign="center">
                  Ảnh sinh viên
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
                value={groupId}
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
                label="Họ và tên"
                value={!memberEdit.fullName ? "" : memberEdit.fullName}
                variant="standard"
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

              <TextField
                name="studentCode"
                label="Mã số sinh viên"
                value={!memberEdit.studentCode ? "" : memberEdit.studentCode}
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

              <TextField
                name="email"
                label="Email"
                value={!memberEdit.email ? "" : memberEdit.email}
                variant="standard"
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
                name="createdDate"
                label="Ngày vào nhóm học tập"
                type="datetime-local"
                value={!memberEdit.createdDate ? "" : memberEdit.createdDate}
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
        {account.role === "Giảng viên" && (
          <DialogActions sx={{ p: "0 24px 12px 24px" }}>
            <Button onClick={deleteMember} variant="contained" color="error">
              Xóa
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              className="btn-secondary"
            >
              Hủy
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};
