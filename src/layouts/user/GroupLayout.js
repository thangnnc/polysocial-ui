import { Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
import Header from "./header";
import { Box } from "@mui/material";
import NavGroup from "./nav-group";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
  backgroundColor: "#f5f5f5",
  position: "relative",
});

const Main = styled("div")(({ theme }) => ({
  width: "75%",
  minHeight: "100%",
  marginLeft: "35%",
}));

// ----------------------------------------------------------------------

export default function GroupLayout() {
  return (
    <StyledRoot>
      <Header />

      <Box sx={{ display: "flex", width: "100%" }}>
        <NavGroup />

        <Main>
          <Outlet />
        </Main>
      </Box>
    </StyledRoot>
  );
}
