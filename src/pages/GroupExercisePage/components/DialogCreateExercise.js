import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Backdrop,
  CircularProgress,
  DialogContentText,
  Divider,
  Grid,
  InputAdornment,
} from "@mui/material";
import Iconify from "../../../components/iconify";
import Axios from "./../../../utils/Axios/index";
import { useState } from "react";
import { toast } from "react-toastify";
import useLogin from "../../../utils/Login/useLogin";

const styleInputFullField = {
  width: "100%",
  mb: 3,
};

export const DialogCreateExercise = ({ open, setOpen, onChange, groupId,socket }) => {
  const { account } = useLogin();
  // console.log("sockett",socket.socket.socket)

  const [showLoading, setShowLoading] = useState(false);

  const [exerciseCreate, setExerciseCreate] = useState({
    groupId: groupId,
    content: "",
    deadline: "",
  });

  const createExercise = async () => {
    setShowLoading(!showLoading);
    handleClose();
    const response = await Axios.Exersice.createExercise(exerciseCreate);
    if (response) {
      socket.socket.socket.emit("create_successful_exercises");
      toast.success("Tạo bài tập thành công");
      setOpen(false);
      onChange();
      setShowLoading(false);
    } else {
      toast.error("Tạo bài tập thất bại!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="1000">
        <DialogTitle>Tạo Bài Tập (Quiz)</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={2} sx={{ width: 800 }}>
            <Grid item xs={12}>
              <TextField
                name="adminId"
                label="Người tạo bài tập"
                variant="standard"
                value={account.fullName}
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
                name="content"
                label="Nội dung bài tập"
                placeholder="Nội dung bài tập"
                onChange={(e) =>
                  setExerciseCreate({
                    ...exerciseCreate,
                    content: e.target.value,
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
                name="deadline"
                label="Ngày hết hạn bài tập"
                type="datetime-local"
                placeholder="Chọn ngày hết hạn bài tập"
                onChange={(e) =>
                  setExerciseCreate({
                    ...exerciseCreate,
                    deadline: e.target.value,
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
          <Button onClick={createExercise} variant="contained" color="warning">
            Tạo bài tập
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
