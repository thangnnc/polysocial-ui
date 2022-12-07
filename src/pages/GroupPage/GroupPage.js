import {
  Box,
  IconButton,
  ImageListItem,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import Iconify from "../../components/iconify";
import Header from "../../layouts/user/header";
import SearchBar from "./components/SearchBar";
import { Link } from "react-router-dom";
import ListGroupJoin from "./components/ListGroupJoin";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 72;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
  backgroundColor: "#f5f5f5",
  position: "relative",
});

const BoxNav = styled("div")(({ theme }) => ({
  width: "22%",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 10,
  backgroundColor: "#fff",
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 10,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(2),
  },
}));

export default function GroupPage() {
  return (
    <StyledRoot>
      <Header />
      <Box sx={{ display: "flex", width: "100%" }}>
        <BoxNav>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: 65,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Nhóm
            </Typography>
            <IconButton
              aria-label="Example"
              sx={{ backgroundColor: "#f5f5f5", color: "black" }}
            >
              <Iconify icon={"bi:gear-fill"} />
            </IconButton>
          </Box>

          <SearchBar />

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Nhóm do bạn quản lý
            </Typography>
            <Link
              to={"/home"}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 0.5,
                }}
              >
                <ImageListItem>
                  <img
                    style={{ borderRadius: 10, width: 75, height: 75 }}
                    src={
                      "https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.30497-1/116687302_959241714549285_318408173653384421_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=70495d&_nc_ohc=_-YHq5lMCPgAX-DkKFz&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfCvFMwO4H9a-hTvmw8UsMlYJfbFYy2X-R_C__m1CZ5dLw&oe=63B83083"
                    }
                  />
                </ImageListItem>
                <Box
                  sx={{
                    ml: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", fontSize: 19 }}
                  >
                    Nhóm Lập trình WEB
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: "#9b9b9b" }}>
                    Nhóm công khai - 31 thành viên
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Nhóm do bạn đã tham gia
            </Typography>
            <Box sx={{ height: "570px", overflowY: "scroll" }}>
              <ListGroupJoin />

              <ListGroupJoin />

              <ListGroupJoin />

              <ListGroupJoin />

              <ListGroupJoin />

              <ListGroupJoin />

              <ListGroupJoin />

              <ListGroupJoin />

              <ListGroupJoin />

              <ListGroupJoin />

              <ListGroupJoin />

              <ListGroupJoin />

              <ListGroupJoin />

              <ListGroupJoin />

              <ListGroupJoin />

              <ListGroupJoin />
            </Box>
          </Box>
        </BoxNav>
        <Box sx={{ width: "78%", mt: 10 }}>
          <h1 style={{ padding: 20 }}>Group Page</h1>
        </Box>
      </Box>
    </StyledRoot>
  );
}
