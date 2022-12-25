import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "./../../../utils/Axios/index";
import ListGroupSearch from "./ListGroupSearch";

const Search = styled("div")(({ theme }) => ({
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
  height: 45,
  color: "inherit",
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
}));

export default function SearchBar(props) {
  const [search, setSearch] = useState([]);

  const [groups, setGroups] = useState([]);

  let socket;
  try {
    socket = props.socket.socket.socket;
  } catch (error) {}

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async (keyword) => {
    setSearch(keyword);
    const response = await Axios.Groups.findGroupByKeyWord(keyword);
    if (response) {
      setGroups(response);
      // toast.success("Lấy dữ liệu thành công");
    } else {
      // toast.error("Lấy dữ liệu thất bại");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={search}
          placeholder="Tìm kiếm nhóm học tập..."
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => {
            getAllData(e.target.value);
          }}
        />
      </Search>

      <Box sx={{ mt: 3 }} hidden={!search}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Nhóm do bạn tìm kiếm
        </Typography>
        <Box sx={{ height: "200px", overflowY: "scroll" }}>
          {groups.map((group) => (
            <ListGroupSearch
              key={group.groupId}
              group={group}
              socket={socket}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
