import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AvatarStatus from "../../utils/AvatarStatus/AvatarStatus";
import useLogin from "./../../utils/Login/useLogin";

const styleInputFullField = {
  display: "none",
};

export default function GroupExerciseDetailPage() {
  const { account } = useLogin();
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  return (
    <Box sx={{ display: "flex", mt: 15 }}>
      <Box sx={{ width: "70%", py: 5 }}>
        <Card>
          <CardHeader
            avatar={
              <AvatarStatus
                alt={account.fullName}
                src={account.avatar}
                isActive={true}
                sx={{ width: 54, height: 54 }}
              />
            }
            action={
              <Box>
                <TextField
                  id="file-input"
                  type="file"
                  name="file"
                  onChange={changeHandler}
                  sx={styleInputFullField}
                />
                <label
                  htmlFor="file-input"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    sx={{ mt: 2, mr: 5, background: "#ff7b29" }}
                  >
                    {!isSelected ? "Chọn tệp" : `${selectedFile.name}`}
                  </Button>
                </label>
              </Box>
            }
            title={
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold" }}
                noWrap
                fontSize={16}
              >
                {account.fullName} đã tạo mới một bài tập: Lab 1
              </Typography>
            }
            subheader={
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                noWrap
              >
                Thứ 2, 28/09/2022 - 9:00 AM
              </Typography>
            }
          />
          {isSelected ? (
            <CardContent>
              <Typography>Tên tệp: {selectedFile.name}</Typography>
              <Typography>Loại tệp: {selectedFile.type}</Typography>
              <Typography>Dung lượng tệp: {selectedFile.size}</Typography>
              <Typography>
                Ngày sửa đổi cuối cùng:
                {selectedFile.lastModifiedDate.toLocaleDateString()}
              </Typography>
            </CardContent>
          ) : (
            ""
          )}
        </Card>
      </Box>
      <Box sx={{ width: "30%", p: 5 }}>
        <Card sx={{ p: 3 }}>
          <Typography
            variant="h5"
            sx={{
              paddingTop: 0.5,
              fontWeight: "bold",
              fontSize: 19,
            }}
          >
            Giới thiệu
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              paddingTop: 0.5,
              fontSize: 16,
            }}
          >
            Chào mừng các bạn đã đến với lớp học.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h5"
              sx={{
                paddingTop: 0.5,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Hướng dẫn
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                paddingTop: 0.5,
                fontSize: 16,
              }}
            >
              Bước 1: Nhấp vào các bài tập bên phía tay phải.
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                paddingTop: 0.5,
                fontSize: 16,
              }}
            >
              Bước 2: Chọn tệp muốn nộp.
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                paddingTop: 0.5,
                fontSize: 16,
              }}
            >
              Bước 3: Nhấp tải tệp.
            </Typography>
          </Box>

          <Button
            variant="contained"
            sx={{
              background: "#ff7b29",
              width: "100%",
              mt: 3,
              borderRadius: 2,
            }}
          >
            Tìm hiểu thêm
          </Button>
        </Card>
      </Box>
    </Box>
  );
}
