import { Box, CircularProgress } from "@mui/material";

export default function CommentLoading () {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress
        sx={{ width: "100%", textAlign: "center", color: "#c8c8c8" }}
      />
    </Box>
  );
}
