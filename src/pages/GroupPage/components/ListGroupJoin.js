import { Box, ImageListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ListGroupJoin() {
  return (
    <Link
      to={"/groups/detail/1"}
      style={{
        color: "inherit",
        textDecoration: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 0.5,
          mb: 2,
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
          <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: 19 }}>
            Nhóm Lập trình WEB
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#9b9b9b" }}>
            Nhóm công khai - 31 thành viên
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}
