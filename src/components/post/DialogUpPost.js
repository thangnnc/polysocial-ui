import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useValidator from "../../utils/Validator";
import Axios from "./../../utils/Axios/index";

export default function DialogUpPost({ open, handleClose, onChange, socket }) {
  const { validate } = useValidator();

  const { groupId } = useParams();

  const [showLoading, setShowLoading] = useState(false);

  const [files, setFiles] = useState([]);

  const [itemInputPost, setItemInputPost] = useState({
    content: "",
    groupId: groupId === undefined ? "1" : groupId,
    files: [],
  });

  const [errors, setErrors] = useState({
    content: "",
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

  const imageUpload = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      itemInputPost.files.push(e.target.files[i]);
      setFiles([...files, URL.createObjectURL(e.target.files[i])]);
    }
  };

  const handleSummit = async () => {
    const data = {
      content: "",
    };

    if (!deepObjectEqual(data, errors)) {
      handleClose();
      setShowLoading(!showLoading);
      setErrors({
        content: "",
      });
      const formData = new FormData();
      formData.append("file", itemInputPost.files);
      const responseCreate = await Axios.Posts.createPost(itemInputPost);
      if (responseCreate) {
        itemInputPost.files = [];
        itemInputPost.content = "";
        toast.success("Tạo bài viết thành công");
        await socket.emit("Client_request_create_like_comment");
        onChange();
        setShowLoading(false);
      } else {
        toast.error("Tạo bài viết thất bại");
      }
    } else {
      setErrors({
        content: "Nội dung bài viết không được để trống",
      });
      toast.error("Vui lòng điền đầy đủ thông tin!");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth={700}>
        <DialogTitle
          sx={{ textAlign: "center", fontSize: 22, fontWeight: 700 }}
        >
          Tạo Bài Viết
        </DialogTitle>
        <DialogContent sx={{ width: 700 }}>
          <DialogContentText>Hãy viết gì đó thật ý nghĩa!!!</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="content"
            name="content"
            label="Nội dung bài viết"
            type="email"
            fullWidth
            variant="outlined"
            multiline
            maxRows={10}
            sx={{ my: 3 }}
            onChange={(event) =>
              setItemInputPost({
                ...itemInputPost,
                content: event.target.value,
              })
            }
            error={errors.content ? true : false}
            helperText={errors.content}
            onInput={(e) => handleOnInput(e, "Nội dung bài viết")}
          />
          <TextField
            id="file"
            name="file"
            type="file"
            fullWidth
            variant="outlined"
            onChange={imageUpload}
          />
        </DialogContent>
        <Box sx={{ display: "flex", alignItems: "center", ml: 3 }}>
          {files.map((item, index) => (
            <img
              key={index}
              src={item}
              style={{ width: "100px", height: "100px", marginRight: "5px" }}
              alt={index}
            />
          ))}
        </Box>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="warning">
            Hủy
          </Button>
          <Button
            className="btn-orange"
            variant="contained"
            onClick={handleSummit}
          >
            Đăng Bài
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
