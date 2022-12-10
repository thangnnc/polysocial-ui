import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import Iconify from "../../components/iconify/Iconify";

const styleInputFullField = {
  width: "100%",
  mb: 3,
  fontSize: 16,
  fontWeight: "bold",
};

export default function GroupFeedbackPage() {
  return (
    <Card sx={{ display: "flex", width: "78%", mt: 28, p: 5 }}>
      <Box
        sx={{
          width: "30%",
          borderRight: "2px solid #afafb6",
          p: 3,
        }}
      >
        <Box sx={{ textAlign: "center", my: 3 }}>
          <IconButton
            aria-label="Example"
            sx={{ backgroundColor: "#f5f5f5", color: "black" }}
          >
            <LocationOnIcon sx={{ color: "#ff7b29" }} />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              paddingTop: 0.5,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Địa chỉ
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "#9b9b9b", paddingTop: 0.5 }}
            color="text.secondary"
          >
            778/B1 Nguyễn Kiệm, P.4 Q. Phú Nhuận, TP. Hồ Chí Minh.
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", my: 3 }}>
          <IconButton
            aria-label="Example"
            sx={{ backgroundColor: "#f5f5f5", color: "black" }}
          >
            <LocalPhoneIcon sx={{ color: "#ff7b29" }} />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              paddingTop: 0.5,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Điện thoại
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "#9b9b9b", paddingTop: 0.5 }}
            color="text.secondary"
          >
            02873088800
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "#9b9b9b", paddingTop: 0.5 }}
            color="text.secondary"
          >
            02873088800
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", my: 3 }}>
          <IconButton
            aria-label="Example"
            sx={{ backgroundColor: "#f5f5f5", color: "black" }}
          >
            <MailIcon sx={{ color: "#ff7b29" }} />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              paddingTop: 0.5,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Email
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "#9b9b9b", paddingTop: 0.5 }}
            color="text.secondary"
          >
            dvsvpoly.hcm@poly.edu.vn
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "#9b9b9b", paddingTop: 0.5 }}
            color="text.secondary"
          >
            daotaofpoly.hcm@fe.edu.vn
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "70%",
          p: 3,
          ml: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            paddingTop: 0.5,
            fontWeight: "bold",
            fontSize: 26,
            color: "#ff7b29",
            mt: 3,
          }}
        >
          Gửi tin nhắn cho chúng tôi
        </Typography>
        <Typography
          variant="h5"
          sx={{
            paddingTop: 0.5,
            fontSize: 18,
          }}
        >
          Nếu bạn có bất kỳ công việc hoặc bất kỳ loại câu hỏi nào liên quan đến
          hướng dẫn của tôi, bạn có thể gửi tin nhắn cho tôi từ đây.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <TextField
            name="fullName"
            label="Họ Và Tên"
            placeholder="Nhập họ và tên của bạn"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={"icon-park-solid:edit-name"} />
                </InputAdornment>
              ),
            }}
            autoComplete="none"
            sx={styleInputFullField}
            InputLabelProps={{ style: { fontSize: 16 } }}
            inputProps={{ style: { fontSize: 18 } }}
          />

          <TextField
            name="Email"
            label="Email"
            placeholder="Nhập email của bạn"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={"entypo:mail"} />
                </InputAdornment>
              ),
            }}
            autoComplete="none"
            sx={styleInputFullField}
            InputLabelProps={{ style: { fontSize: 16 } }}
            inputProps={{ style: { fontSize: 18 } }}
          />

          <TextField
            name="content"
            label="Nội dung"
            placeholder="Nhập nội dung của bạn"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={"ic:outline-message"} />
                </InputAdornment>
              ),
            }}
            autoComplete="none"
            sx={styleInputFullField}
            InputLabelProps={{ style: { fontSize: 16 } }}
            inputProps={{ style: { fontSize: 18 } }}
          />
        </Box>
        <Button variant="contained" sx={{ background: "#ff7b29" }}>
          Gửi ngay
        </Button>
      </Box>
    </Card>
  );
}
