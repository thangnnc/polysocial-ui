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
import React, { useState } from "react";
import Axios from "../../../utils/Axios/index";
import useLogin from "../../../utils/Login/useLogin";
import { toast } from "react-toastify";
import useValidator from "../../../utils/Validator";

const styleInputFullField = {
  width: "100%",
  mb: 3,
};

export const DialogCreateContent = ({ open, setOpen, content, onChange }) => {
  const { account } = useLogin();

  const { validate } = useValidator();

  const [errors, setErrors] = useState({
    content: "",
    groupId: "",
  });

  const handleOnInput = (event, error) => {
    const { name, value } = event.target;
    setErrors({
      ...errors,
      [name]: validate(error, value),
    });
  };

  function deepObjectEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);

      if (
        (areObjects && !deepObjectEqual(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) {
        return false;
      }
    }

    return true;
  }

  function isObject(object) {
    return object != null && typeof object === "object";
  }

  const [itemInputPost, setItemInputPost] = useState({
    content: "",
    groupId: "",
    files: [],
  });

  const imageUpload = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      itemInputPost.files.push(e.target.files[i]);
    }
  };

  const handleSummit = async () => {
    const data = {
      content: "",
      groupId: "",
    };

    const formData = new FormData();
    formData.append("file", itemInputPost.files);
    if (!deepObjectEqual(data, errors)) {
      const responseCreate = await Axios.Contents.createPost(itemInputPost);
      if (responseCreate) {
        setOpen(false);
        toast.success("Th??m b??i vi???t th??nh c??ng");
        onChange();
      } else {
        toast.success("Th??m b??i vi???t th???t b???i!");
      }
    } else {
      setErrors({
        ...errors,
        content: "N???i dung b??i vi???t kh??ng ???????c ????? tr???ng!",
        groupId: "M?? nh??m h???c t???p kh??ng ???????c ????? tr???ng!",
      });
      toast.error("Vui l??ng ??i???n ?????y ????? th??ng tin!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="1000">
        <DialogTitle>????ng b??i vi???t</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={2} sx={{ width: 800 }}>
            <Grid item xs={12}>
              <TextField
                name="fullName"
                label="Ng?????i ????ng b??i vi???t"
                value={account.fullName}
                variant="standard"
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
                name="groupId"
                label="M?? nh??m h???c t???p"
                onChange={(event) =>
                  setItemInputPost({
                    ...itemInputPost,
                    groupId: event.target.value,
                  })
                }
                variant="standard"
                placeholder="Nh???p m?? nh??m h???c t???p"
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
                error={errors.groupId ? true : false}
                helperText={errors.groupId}
                onInput={(e) => handleOnInput(e, "M?? nh??m h???c t???p")}
              />

              <TextField
                name="content"
                label="N???i dung b??i vi???t"
                onChange={(event) =>
                  setItemInputPost({
                    ...itemInputPost,
                    content: event.target.value,
                  })
                }
                variant="standard"
                placeholder="Nh???p n???i dung b??i vi???t"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={"material-symbols:edit-note-sharp"} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="none"
                sx={styleInputFullField}
                error={errors.content ? true : false}
                helperText={errors.content}
                onInput={(e) => handleOnInput(e, "N???i dung b??i vi???t")}
              />

              <TextField
                type="file"
                name="file"
                onChange={imageUpload}
                label="H??y ch???n ???nh c???a b???n."
                accept="image/jpeg, image/png, image/jpg"
                multiple
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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 12px 24px" }}>
          <Button onClick={handleSummit} variant="contained" color="warning">
            T???o b??i vi???t
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            className="btn-secondary"
          >
            H???y
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
