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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const styleInputFullField = {
  width: "100%",
  mb: 3,
};

export const DialogEditExercise = ({ open, setOpen, exercise, onChange,props }) => {
  const [exerciseEdit, setExerciseEdit] = useState({
    content: "",
    deadline: "",
  });

  useEffect(() => {
    setExerciseEdit(exercise);
  }, [exercise]);

  const updateHandler = async () => {
    const response = await Axios.Exersice.updateExercise(exerciseEdit);
    if (response) {
      onChange();
      setOpen(false);
      toast.success("Cập nhập bài tập thành công");
    } else {
      toast.error("Cập nhật bài tập thất bại");
    }
  };

  const deleteHandler = async (exId) => {
    const response = await Axios.Exersice.deleteExercise(exId);
    if (response.status === 200) {
      toast.success("Xoá bài tập thành công");
      setOpen(false);
    } else {
      toast.error("Xoá bài tập thất bại");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="1000">
        <DialogTitle>Chỉnh Sửa Bài Tập</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={2} sx={{ width: 800 }}>
            <Grid item xs={12}>
              <TextField
                name="groupId"
                label="Mã tạo học tập"
                value={exerciseEdit.exId}
                variant="standard"
                placeholder="Nhập mã tạo học tập"
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
                name="content"
                label="Nộp dung bài tập"
                placeholder="Nhập nộp dung bài tập"
                value={exerciseEdit.content}
                onChange={(e) =>
                  setExerciseEdit({
                    ...exerciseEdit,
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
                name="endDate"
                label="Hạn nộp bài tập"
                type="datetime-local"
                placeholder="Chọn hạn nộp bài tập"
                value={exerciseEdit.endDate}
                onChange={(e) =>
                  setExerciseEdit({
                    ...exerciseEdit,
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
          <Button onClick={updateHandler} variant="contained" color="warning">
            Cập nhật
          </Button>
          <Button
            onClick={() => deleteHandler(exerciseEdit.exId)}
            variant="contained"
            color="error"
          >
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
      </Dialog>
    </div>
  );
};
