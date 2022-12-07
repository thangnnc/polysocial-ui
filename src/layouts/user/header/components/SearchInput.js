import { TextField } from "@mui/material";
import Iconify from "../../../../components/iconify";

export default function SearchInput({ sx, ...props }) {
  return (
    <TextField
      className="rounded"
      size="medium"
      InputProps={{
        endAdornment: (
          <Iconify
            icon="ic:round-person-search"
            width={36}
            sx={{ mr: 1, color: "#ff6b0f" }}
          />
        ),
      }}
      placeholder="Tìm kiếm ....."
      sx={{
        width: "500px",
        borderRadius: 50,
        pr: 1,
        ...sx,
      }}
      {...props}
    />
  );
}
