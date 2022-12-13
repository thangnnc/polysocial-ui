import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Autocomplete,
  DialogContentText,
  Divider,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import Iconify from "../../../components/iconify";
import React, { useState } from "react";
import Axios from "../../../utils/Axios/index";
import { toast } from "react-toastify";
import { Box } from "@mui/system";

const styleInputFullField = {
  width: "100%",
  mb: 3,
};

export const DialogCreateGroupExcel = ({ open, setOpen, groups, onChange }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [groupId, setGroupId] = useState("");

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const createMember = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    const response = await Axios.Groups.createGroupExcel(formData, groupId);
    if (response) {
      toast.success("Thêm thành viên thành công");
      setOpen(false);
      onChange();
    } else {
      toast.error("Thêm thành viên thất bại!");
    }
  };

  const handleChange = (e, value) => {
    setGroupId(value.groupId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="1000">
        <DialogTitle>Thêm Sinh Viên Vào Nhóm Học Tập Bằng Excel</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={2} sx={{ width: 800 }}>
            <Grid item xs={12}>
              <Autocomplete
                name="groupId"
                options={groups}
                getOptionLabel={(option) => option?.name}
                key={groups.groupId}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify icon={"bx:code-block"} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <React.Fragment>
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                    variant="standard"
                    label="Mã nhóm học tập"
                    placeholder="Chọn mã nhóm học tập"
                    sx={styleInputFullField}
                  />
                )}
              />

              <TextField
                type="file"
                name="file"
                onChange={changeHandler}
                label="Hãy chọn file excel"
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={"material-symbols:attach-file-add"} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="none"
                sx={styleInputFullField}
              />
              {isSelected ? (
                <Box>
                  <Typography>Tên tệp: {selectedFile.name}</Typography>
                  <Typography>Loại tệp: {selectedFile.type}</Typography>
                  <Typography>Dung lượng tệp: {selectedFile.size}</Typography>
                  <Typography>
                    Ngày sửa đổi cuối cùng:
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                  </Typography>
                </Box>
              ) : (
                <Typography>Bạn chưa chọn file nào?</Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 12px 24px" }}>
          <Button onClick={createMember} variant="contained" color="warning">
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
