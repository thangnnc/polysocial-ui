import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "./../../utils/Axios/index";

export default function DialogUpPost({ open, handleClose, onChange }) {
  const { groupId } = useParams();

  const [itemInputPost, setItemInputPost] = useState({
    content: "",
    groupId: groupId === undefined ? "1" : groupId,
    files: [],
  });

  const imageUpload = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      itemInputPost.files.push(e.target.files[i]);
    }
  };

  const handleSummit = async () => {
    const formData = new FormData();
    formData.append("file", itemInputPost.files);
    const responseCreate = await Axios.Posts.createPost(itemInputPost);
    if (responseCreate) {
      itemInputPost.files = [];
      toast.success("Tạo bài viết thành công");
      onChange();
    } else {
      toast.error("Tạo bài viết thất bại");
    }
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={700}>
      <DialogTitle sx={{ textAlign: "center", fontSize: 22, fontWeight: 700 }}>
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
  );
}
