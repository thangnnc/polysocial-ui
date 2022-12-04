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
import Axios from "./../../../utils/Axios/index";
import React, { useState } from "react";
import { useEffect } from "react";

const styleInputFullField = {
  width: "100%",
  mb: 3,
};

export const DialogCreateMember = ({ open, setOpen, groupId }) => {
  const [user, setUser] = useState({});
  const [idUser, setIdUser] = useState("");

  useEffect(() => {
    getOneUser();
  }, []);

  const handleChange = (e) => {
    getOneUser(e.target.value === "" ? undefined : e.target.value);
  };

  const getOneUser = async (userId) => {
    if (userId !== undefined) {
      const response = await Axios.Accounts.getOneUser(userId);
      setUser(response);
      setIdUser(userId);
    } else {
      setUser(null);
    }
  };

  const createMember = async (e) => {
    e.preventDefault();
    const response = await Axios.Groups.createStudentGroup({
      groupId: groupId,
      userId: idUser,
    });
    console.log(response);
    if (response) {
      alert("Create member successfully!");
      setOpen(false);
      window.location.reload();
    } else {
      alert("Create member failed!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="1000">
        <DialogTitle>Thêm Sinh Viên Vào Nhóm Học Tập</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={2} sx={{ width: 800 }}>
            <Grid item xs={12}>
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
                name="userId"
                label="Mã sinh viên"
                variant="standard"
                placeholder="Nhập mã sinh viên"
                onChange={handleChange}
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

              {user !== null ? (
                <React.Fragment>
                  <TextField
                    name="fullName"
                    label="Họ và tên"
                    value={user.fullName}
                    variant="standard"
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
                    name="studentCode"
                    label="Mã số sinh viên"
                    value={user.studentCode}
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
                    name="email"
                    label="Email"
                    value={user.email}
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify
                            icon={"fluent:text-description-20-regular"}
                          />
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="none"
                    sx={styleInputFullField}
                  />
                </React.Fragment>
              ) : null}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 12px 24px" }}>
          <Button onClick={createMember} variant="contained" color="warning">
            Tạo sinh viên
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
