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
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useValidator from "../../../utils/Validator";
import useLogin from "../../../utils/Login/useLogin";

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
  const { validate } = useValidator();

  const { account } = useLogin();

  const [groupEdit, setGroupEdit] = useState({});

  const [errors, setErrors] = useState({
    name: "",
    className: "",
    description: "",
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

  useEffect(() => {
    setGroupEdit(group);
  }, [group]);

  const handleUploadFile = (e) => {
    setGroupEdit((group) => ({
      ...group,
      avatarFile: e.target.files[0],
    }));
  };

  const updateGroup = async () => {
    const data = {
      name: "",
      className: "",
      description: "",
    };

    if (!deepObjectEqual(data, errors)) {
      setErrors({
        name: "",
        className: "",
        description: "",
      });
      const response = await Axios.Groups.updateGroup(groupEdit);
      if (response) {
        toast.success("C???p nh???t nh??m h???c t???p th??nh c??ng");
        setOpen(false);
        onChange(); // set call back update group
      } else {
        toast.error("C???p nh???t nh??m h???c t???p th???t b???i!");
      }
    } else {
      setErrors({
        ...errors,
        name: "T??n nh??m h???c t???p kh??ng ???????c ????? tr???ng!",
        className: "T??n l???p kh??ng ???????c ????? tr???ng!",
        description: "M?? t??? kh??ng ???????c ????? tr???ng!",
      });
      toast.error("Vui l??ng ??i???n ?????y ????? th??ng tin!");
    }
  };

  const deleteGroup = async () => {
    const response = await Axios.Groups.deleteGroup(groupEdit.groupId);
    if (response.status === 200) {
      toast.success("Xo?? nh??m h???c t???p th??nh c??ng");
      setOpen(false);
      onChange();
    } else {
      toast.error("Xo?? nh??m h???c t???p th???t b???i!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="1000">
        <DialogTitle>Ch???nh S???a Nh??m H???c T???p</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={2} sx={{ width: 800 }}>
            <Grid item xs={5}>
              <label htmlFor="avatarFile">
                <Avatar
                  sx={styleAvatar}
                  alt="Remy Sharp"
                  src={group?.avatarGroup}
                />
                <Typography width="100%" fontSize={24} textAlign="center">
                  Ch???n ???nh nh??m
                </Typography>
              </label>
              <TextField
                id="avatarFile"
                name="avatarFile"
                label="File"
                type="file"
                sx={{ display: "none" }}
                onChange={handleUploadFile}
              />
            </Grid>

            <Grid item xs={7}>
              <TextField
                disabled
                name="groupId"
                label="M?? nh??m h???c t???p"
                value={groupEdit?.groupId === null ? "" : groupEdit?.groupId}
                onChange={(e) =>
                  setGroupEdit({ ...groupEdit, groupId: e.target.value })
                }
                variant="standard"
                placeholder="Nh???p m?? nh??m h???c t???p"
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
                label="T??n nh??m h???c t???p"
                value={
                  (groupEdit?.groupName === null ? "" : groupEdit?.groupName) ||
                  (groupEdit?.name === null ? "" : groupEdit?.name)
                }
                onChange={(e) =>
                  groupEdit?.groupName
                    ? setGroupEdit({ ...groupEdit, groupName: e.target.value })
                    : setGroupEdit({ ...groupEdit, name: e.target.value })
                }
                variant="standard"
                placeholder="Nh???p t??n nh??m h???c t???p"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={"material-symbols:edit-note-sharp"} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="none"
                sx={styleInputFullField}
                error={errors.name ? true : false}
                helperText={errors.name}
                onInput={(e) => handleOnInput(e, "T??n nh??m h???c t???p")}
              />

              <TextField
                name="className"
                label="T??n l???p h???c t???p"
                value={
                  groupEdit?.className === null ? "" : groupEdit?.className
                }
                onChange={(e) =>
                  setGroupEdit({ ...groupEdit, className: e.target.value })
                }
                variant="standard"
                placeholder="Nh???p l???p h???c t???p"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={"material-symbols:edit-note-sharp"} />
                    </InputAdornment>
                  ),
                }}
                autoComplete="none"
                sx={styleInputFullField}
                error={errors.className ? true : false}
                helperText={errors.className}
                onInput={(e) => handleOnInput(e, "T??n l???p h???c t???p")}
              />

              <TextField
                name="description"
                label="M?? t??? nh??m h???c t???p"
                placeholder="Nh???p m?? t??? nh??m h???c t???p"
                value={!groupEdit.description ? "" : groupEdit.description}
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
                error={errors.description ? true : false}
                helperText={errors.description}
                onInput={(e) => handleOnInput(e, "M?? t??? nh??m h???c t???p")}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 12px 24px" }}>
          <Button onClick={updateGroup} variant="contained" color="warning">
            C???p nh???t
          </Button>
          {account.role === "Gi???ng vi??n" && (
            <Button onClick={deleteGroup} variant="contained" color="error">
              X??a
            </Button>
          )}
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
