import { Box, styled } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../layouts/user/header";
import NavGroup from "./../../layouts/user/nav-group";

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
  backgroundColor: "#f5f5f5",
  position: "relative",
});

export default function GroupDetailPage() {
  const { groupId } = useParams();
  console.log(groupId);

  return (
    <StyledRoot>
      <Header />
      <Box sx={{ display: "flex", width: "100%" }}>
        <NavGroup groupId={groupId} />
        <Box sx={{ width: "75%", marginLeft: "25%" }}>
          <h1 style={{ marginTop: 100 }}>Group Page</h1>
        </Box>
      </Box>
    </StyledRoot>
  );
}
