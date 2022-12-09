import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  marginTop: 20,
  position: "relative",
  backgroundColor: "#f5f5f5",
  borderRadius: 24,
  height: 45,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "98%",
  height: 45,
  color: "inherit",
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
}));

export default function SearchBar() {
  return (
    <Box sx={{ flexGrow: 2 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Tìm kiếm thành viên nhóm"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </Box>
  );
}
