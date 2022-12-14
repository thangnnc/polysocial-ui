import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

export default function DialogUpPost({open, handleClose}) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={700} >
      <DialogTitle sx={{textAlign: "center", fontSize: 22, fontWeight: 700}}>Tạo Bài Viết</DialogTitle>
      <DialogContent sx={{width: 700}}>
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
          sx={{my: 3}}
        />
        <TextField
          id="file"
          name="file"
          type="file"
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="warning">Hủy</Button>
        <Button className="btn-orange" variant="contained" onClick={handleClose}>Đăng Bài</Button>
      </DialogActions>
    </Dialog>
  );
}
