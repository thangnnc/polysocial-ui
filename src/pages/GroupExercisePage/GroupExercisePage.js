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
import React, { useEffect, useState } from "react";
import AvatarStatus from "../../utils/AvatarStatus/AvatarStatus";
import BasicSpeedDial from "../GroupExercisePage/components/BasicSpeedDial";
import useLogin from "./../../utils/Login/useLogin";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useParams } from "react-router-dom";
import { DialogCreateExercise } from "./components/DialogCreateExercise";
import Axios from "./../../utils/Axios/index";
import { toast } from "react-toastify";

export default function GroupExercisePage() {
  const { account } = useLogin();
  const { groupId } = useParams();
  const [expanded, setExpanded] = useState(false);
  const [isCreateExercise, setIsCreateExercise] = useState(false);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    getAllData(groupId);
  }, [groupId]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getAllData = async (groupId) => {
    const response = await Axios.Exersice.getAllExercise(groupId);
    if (response) {
      setExercises(response);
      toast.success("Lấy dữ liệu bài tập thành công");
    } else {
      toast.error("Lấy dữ liệu bài tập thất bại!");
    }
  };

  //Call back data
  const onlDailogChange = () => {
    getAllData(groupId);
  };

  const handleCreateExercise = () => {
    setIsCreateExercise(true);
  };

  return (
    <Box sx={{ display: "flex", mt: 15 }}>
      <Box sx={{ width: "70%", py: 5 }}>
        {exercises?.map((exercise, index) => (
          <Card key={index} sx={{ mb: 3 }}>
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
                  <ExpandMore
                    expand={expanded ? exercise.exId : undefined}
                    onClick={handleExpandClick}
                    aria-expanded={expanded ? exercise.exId : undefined}
                    aria-label="show"
                    sx={{ mt: 2 }}
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </Box>
              }
              title={
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold" }}
                  noWrap
                  fontSize={16}
                >
                  {account.fullName} đã tạo mới một bài tập: {exercise?.content}
                </Typography>
              }
              subheader={
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                  noWrap
                >
                  {exercise?.endDate}
                </Typography>
              }
            />
            <Collapse
              key={exercise.exId}
              in={expanded}
              timeout="auto"
              unmountOnExit
            >
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
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      component={"p"}
                      style={{ fontSize: 25, fontWeight: 700 }}
                    >
                      0
                    </Typography>
                    <Typography variant="body2" paragraph sx={{ fontSize: 18 }}>
                      Đã nộp
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      component={"p"}
                      style={{ fontSize: 25, fontWeight: 700 }}
                    >
                      0
                    </Typography>
                    <Typography variant="body2" paragraph sx={{ fontSize: 18 }}>
                      Chưa nộp
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Collapse>
            <CardActions disableSpacing sx={{ borderTop: "1px solid #afafb6" }}>
              <Button aria-label="add to detail" sx={{ color: "#ff7b29" }}>
                <Link
                  to={`/groups/detail/exercise/detail/${groupId}/${exercise.exId}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Typography variant="body2" sx={{ fontSize: 18 }}>
                    Xem chi tiết
                  </Typography>
                </Link>
              </Button>
            </CardActions>
          </Card>
        ))}
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

        <DialogCreateExercise
          onChange={onlDailogChange}
          open={isCreateExercise}
          setOpen={setIsCreateExercise}
          groupId={groupId}
        />

        <BasicSpeedDial handleCreateExercise={handleCreateExercise} />
      </Box>
    </Box>
  );
}
