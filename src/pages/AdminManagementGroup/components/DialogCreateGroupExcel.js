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
} from "@mui/material";
import Iconify from "../../../components/iconify";
import React, { useState } from "react";
import Axios from "../../../utils/Axios/index";

const styleInputFullField = {
  width: "100%",
  mb: 3,
};

export const DialogCreateGroupExcel = ({ open, setOpen, group }) => {
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
    console.log(response);
    if (response) {
      alert("Create group successfully!");
      setOpen(false);
      window.location.reload();
    } else {
      alert("Create group failed!");
    }
  };

  const handleChange = (e) => {
    setGroupId(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="1000">
        <DialogTitle>Tạo Nhóm Học Tập Bằng Excel</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={2} sx={{ width: 800 }}>
            <Grid item xs={12}>
              <Autocomplete
                name="groupId"
                options={group}
                getOptionLabel={(option) => option.name}
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
                    onChange={handleChange}
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
                <div>
                  <p>Filename: {selectedFile.name}</p>
                  <p>Filetype: {selectedFile.type}</p>
                  <p>Size in bytes: {selectedFile.size}</p>
                  <p>
                    lastModifiedDate:{" "}
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p>Bạn chưa chọn file nào?</p>
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
