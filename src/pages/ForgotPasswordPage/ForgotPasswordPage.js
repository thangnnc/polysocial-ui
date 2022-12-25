// @mui
import { styled } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
// components
import Logo from "../../components/logo";
// sections
import { Helmet } from "react-helmet";
import ForgotPasswordFrom from "./components/ForgotPasswordFrom";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
  backgroundImage:
    "url(https://ap.poly.edu.vn/theme/student_v2/media//bg/bg-3.jpg)",
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 400,
  margin: "auto",
  padding: "30",
  minHeight: "100vh",
  fontSize: "2",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  borderRadius: "12px",
  background: "#fff",
}));

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title> ForgotPassword | Poly Social </title>
      </Helmet>

      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography align="center" marginBottom={3}>
              <Logo
                sx={{
                  height: 150,
                }}
              />
            </Typography>

            <ForgotPasswordFrom />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
