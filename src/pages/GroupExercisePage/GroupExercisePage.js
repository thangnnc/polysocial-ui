import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AvatarStatus from "../../utils/AvatarStatus/AvatarStatus";
import BasicSpeedDial from "../GroupExercisePage/components/BasicSpeedDial";
import useLogin from "./../../utils/Login/useLogin";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useParams } from "react-router-dom";

export default function GroupExercisePage() {
  const { account } = useLogin();
  const { groupId } = useParams();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCreate = () => {
    console.log("Create exercise");
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
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                sx={{ mt: 2 }}
              >
                <ExpandMoreIcon />
              </ExpandMore>
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
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                paragraph
                sx={{ fontSize: 20, fontWeight: "bold", width: "50%" }}
              >
                Số bài đã nộp
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "50%",
                }}
              >
                <Typography
                  variant="body2"
                  paragraph
                  sx={{ textAlign: "center", fontSize: 18 }}
                >
                  <Box style={{ fontSize: 25, fontWeight: 700 }}>0</Box>
                  Đã nộp
                </Typography>
                <Typography
                  variant="body2"
                  paragraph
                  sx={{ textAlign: "center", fontSize: 18 }}
                >
                  <Box style={{ fontSize: 25, fontWeight: 700 }}>0</Box>
                  Chưa nộp
                </Typography>
              </Box>
            </CardContent>
          </Collapse>
          <CardActions disableSpacing sx={{ borderTop: "1px solid #afafb6" }}>
            <Button aria-label="add to detail" sx={{ color: "#ff7b29" }}>
              <Link
                to={`/groups/detail/exercise/detail/${groupId}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Typography variant="body2" sx={{ fontSize: 18 }}>
                  Xem chi tiết
                </Typography>
              </Link>
            </Button>
          </CardActions>
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

        <BasicSpeedDial handleCreate={handleCreate} />
      </Box>
    </Box>
  );
}
