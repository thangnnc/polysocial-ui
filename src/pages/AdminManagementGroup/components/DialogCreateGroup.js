import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Autocomplete,
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
  const { validate } = useValidator();

  let socket;

  try {
    socket = propsSocket.socket.socket;
  } catch (error) {}

  const [groupCreate, setGroupCreate] = useState({});

  const [src, setSrc] = useState();

  const [admins, setAdmins] = useState([]);

  const [userId, setUserId] = useState();

  const [errors, setErrors] = useState({
    name: "",
    className: "",
    description: "",
    adminId: undefined,
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

  const handleUploadFile = (e) => {
    setGroupCreate((group) => ({
      ...group,
      avatarFile: e.target.files[0],
    }));
    setSrc(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e, value) => {
    setUserId(value.userId);
    setGroupCreate({ ...groupCreate, adminId: value.userId });
  };

  useEffect(() => {
    getAllAdmin();
  }, []);

  const getAllAdmin = async () => {
    const response = await Axios.Groups.getAllUserRoleAdmin();
    setAdmins(response);
  };

  const createGroup = async () => {
    const data = {
      name: "",
      className: "",
      description: "",
      adminId: undefined,
    };

    let formData = new FormData();
    formData.append("avatarFile", groupCreate.avatarFile);

    if (!deepObjectEqual(data, errors)) {
      const response = await Axios.Groups.createGroup(groupCreate);
      if (response) {
        toast.success("T???o nh??m h???c t???p th??nh c??ng");
        await socket.emit("create_group", userId);
        setOpen(false);
        onChange();
      } else {
        toast.error("T???o nh??m h???c t???p th???t b???i!");
      }
    } else {
      setErrors({
        ...errors,
        name: "T??n nh??m h???c t???p kh??ng ???????c ????? tr???ng!",
        className: "T??n l???p kh??ng ???????c ????? tr???ng!",
        description: "M?? t??? kh??ng ???????c ????? tr???ng!",
        adminId: "Ch???n ng?????i t???o nh??m h???c t???p",
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
        <DialogTitle>T???o Nh??m H???c T???p</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText />
          <Grid container spacing={2} sx={{ width: 800 }}>
            <Grid item xs={5}>
              <label htmlFor="avatarFile">
                <Avatar
                  sx={styleAvatar}
                  alt="Remy Sharp"
                  src={src ? src : "/static/images/avatar/1.jpg"}
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
              <Autocomplete
                name="adminId"
                options={admins}
                getOptionLabel={(option) => option?.fullName}
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
                    label="Ng?????i t???o nh??m h???c t???p"
                    placeholder="Ch???n ng?????i t???o nh??m h???c t???p"
                    sx={styleInputFullField}
                    error={errors.adminId ? true : false}
                    helperText={errors.adminId}
                    onInput={(e) =>
                      handleOnInput(e, "Ch???n ng?????i t???o nh??m h???c t???p")
                    }
                  />
                )}
              />

              <TextField
                name="name"
                label="T??n nh??m h???c t???p"
                onChange={(e) =>
                  setGroupCreate({ ...groupCreate, name: e.target.value })
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
                onChange={(e) =>
                  setGroupCreate({ ...groupCreate, className: e.target.value })
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
                error={errors.description ? true : false}
                helperText={errors.description}
                onInput={(e) => handleOnInput(e, "M?? t??? nh??m h???c t???p")}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 12px 24px" }}>
          <Button onClick={createGroup} variant="contained" color="warning">
            T???o nh??m
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
