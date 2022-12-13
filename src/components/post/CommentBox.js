import {
  Box,
  Button,
  List,
  TextField,
} from "@mui/material";
import CommentLoading from "./CommentLoading";
import CommentLine from "./CommentLine";

export default function CommentBox({ show, comments }) {
  return (
    <Box sx={{ pt: 2 }} hidden={!show}>
      <List disablePadding sx={{ p: 0 }}>
        <CommentLoading />

        <Button sx={{ color: "#808080", py: 0, px: 1, mb: 1, minWidth: 0 }}>
          Xem thêm bình luận
        </Button>
        {comments?.map((comment) => (
          <CommentLine key={comment.cmtId} comment={comment} />
        ))}
      </List>

      <TextField
        className="rounded"
        size="medium"
        InputProps={{
          endAdornment: (
            <Button
              className="btn-orange"
              size="large"
              variant="contained"
              sx={{ width: 200, borderRadius: 50, py: 1 }}
            >
              Bình luận
            </Button>
          ),
        }}
        placeholder="Nhập bình luận ....."
        sx={{
          width: "100%",
          mt: 2,
          borderRadius: 50,
          pr: 3,
        }}
      />
    </Box>
  );
}
