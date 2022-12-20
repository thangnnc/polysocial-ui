import { Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
import Header from "./header";
import { Box } from "@mui/material";
import NavUser from "./nav";
import NavFriend from "./nav-friends";
// ----------------------------------------------------------------------

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
  width: "20%",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 36,
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 36,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const BoxFriend = styled("div")(({ theme }) => ({
  width: "20%",
  minHeight: "100%",
  [theme.breakpoints.up("lg")]: {},
}));

const Main = styled("div")(({ theme }) => ({
  width: "55%",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 36,
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 36,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function UserLayout(props) {
  // console.log("UserLayout",props)
  return (
    <StyledRoot>
      <Header socket={props} />

      <Box sx={{ display: "flex", width: "100%", pl: 8 }}>
        <BoxNav>
          <NavUser />
        </BoxNav>

        <Main>
          <Outlet />
        </Main>

        <BoxFriend>
          <NavFriend socket={props} />
        </BoxFriend>
      </Box>
    </StyledRoot>
  );
}
