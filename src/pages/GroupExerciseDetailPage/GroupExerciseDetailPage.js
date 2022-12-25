import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AvatarStatus from "../../utils/AvatarStatus/AvatarStatus";
import Axios from "../../utils/Axios/index";
import useLogin from "./../../utils/Login/useLogin";
import Iconify from "../../components/iconify";

const styleInputFullField = {
  display: "none",
};

const styleInputField = {
  width: "100%",
  my: 2,
};

export default function GroupExerciseDetailPage() {
  const { account } = useLogin();

  const { exerciseId } = useParams();

  const { groupId } = useParams();

  const [selectedFile, setSelectedFile] = useState();

  const [isSelected, setIsSelected] = useState(false);

  const [data, setData] = useState([]);

  const [upload, setUpload] = useState({
    file: "",
    exId: exerciseId,
    groupId: groupId,
  });

  const [exercise, setExercise] = useState({});

  const [updateExercise, setUpdateExercise] = useState({
    file: "",
    exId: exerciseId,
    groupId: groupId,
    userId: "2",
  });

  const [createMark, setCreateMark] = useState({
    userId: "",
    exId: exerciseId,
    groupId: groupId,
    mark: 0,
    taskId: "",
  });

  useEffect(() => {
    getAllData(exerciseId, groupId);
  }, [exerciseId, groupId]);

  const getAllData = async (exerciseId, groupId) => {
    const response = await Axios.Exersice.getAllFileExercise(
      exerciseId,
      groupId
    );
    if (response) {
      setData(response);
      // toast.success("Lấy dữ liệu thành công");
    } else {
      // toast.error("Lấy dữ liệu thất bại");
    }
  };

  useEffect(() => {
    getOneData(exerciseId);
  }, [exerciseId]);

  const getOneData = async (exerciseId) => {
    const response = await Axios.Exersice.getOneExercise(exerciseId);
    if (response) {
      setExercise(response);
      // toast.success("Lấy dữ liệu thành công");
    } else {
      // toast.error("Lấy dữ liệu thất bại");
    }
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setUpload({ ...upload, file: event.target.files[0] });
    setUpdateExercise({ ...updateExercise, file: event.target.files[0] });
    setIsSelected(true);
  };

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    const response = await Axios.Exersice.uploadFileExercise(upload);
    if (response) {
      toast.success("Nộp bài tập thành công");
      getAllData(exerciseId, groupId);
      getOneData(exerciseId);
    } else {
      toast.error("Nộp bài tập thất bại");
    }
  };

  const updateHandler = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    const response = await Axios.Exersice.updateFileExercise(updateExercise);
    if (response) {
      toast.success("Cập nhật nộp bài tập thành công");
      getAllData(exerciseId, groupId);
      getOneData(exerciseId);
    } else {
      toast.error("Cập nhật nộp bài tập thất bại");
    }
  };

  const deleteHandler = async (taskFileId) => {
    const response = await Axios.Exersice.deleteFileExercise(taskFileId);
    if (response.status === 200) {
      toast.success("Xoá bài tập đã nộp thành công");
      getAllData(exerciseId, groupId);
      getOneData(exerciseId);
    } else {
      toast.error("Xoá bài tập đã nộp thất bại");
    }
  };

  const submitMarkHandler = async (uId, tkId) => {
    const data = {
      userId: uId,
      exId: exerciseId,
      groupId: groupId,
      mark: createMark.mark,
      taskId: tkId,
    };
    const response = await Axios.Exersice.createMarks(data);
    if (response.status === 200) {
      toast.success("Chấm điểm bài tập thành công");
      getAllData(exerciseId, groupId);
      getOneData(exerciseId);
    } else {
      toast.error("Chấm điểm bài tập thất bại");
    }
  };

  return (
    <Box sx={{ display: "flex", mt: 15 }}>
      <Box sx={{ width: "70%", py: 5 }}>
        {account.role === "Sinh viên" && (
          <>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Nộp bài tập
            </Typography>
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
                        {!exercise.isSubmit ? "Chọn tệp" : "Đã nộp"}
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
                    {account.fullName} đã tạo mới một bài tập:{" "}
                    {exercise.content}
                  </Typography>
                }
                subheader={
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    {exercise.endDate}
                  </Typography>
                }
              />
              {exercise.isSubmit ? (
                <CardContent>
                  {isSelected ? (
                    <CardContent>
                      <Typography>Tên tệp: {selectedFile.name}</Typography>
                      <Typography>Loại tệp: {selectedFile.type}</Typography>
                      <Typography>
                        Dung lượng tệp: {selectedFile.size}
                      </Typography>
                      <Typography>
                        Ngày sửa đổi cuối cùng:
                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  ) : (
                    ""
                  )}
                  <Typography>
                    Đường dẫn file nộp bài: {exercise.url}
                  </Typography>
                  {!exercise.isSubmit ? (
                    <Button
                      variant="contained"
                      sx={{
                        background: "#ff7b29",
                        width: "100%",
                        mt: 3,
                        borderRadius: 2,
                      }}
                      onClick={submitHandler}
                    >
                      Nộp bài
                    </Button>
                  ) : (
                    <Box
                      sx={{ display: "flex", justifyContent: "space-around" }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          background: "#ff7b29",
                          width: "40%",
                          mt: 3,
                          borderRadius: 2,
                        }}
                        onClick={updateHandler}
                      >
                        Cập nhật
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          background: "#ff7b29",
                          width: "40%",
                          mt: 3,
                          borderRadius: 2,
                        }}
                        onClick={() => deleteHandler(exercise.taskFileId)}
                      >
                        Xoá
                      </Button>
                    </Box>
                  )}
                </CardContent>
              ) : (
                <React.Fragment>
                  {isSelected ? (
                    <CardContent>
                      <Typography>Tên tệp: {selectedFile.name}</Typography>
                      <Typography>Loại tệp: {selectedFile.type}</Typography>
                      <Typography>
                        Dung lượng tệp: {selectedFile.size}
                      </Typography>
                      <Typography>
                        Ngày sửa đổi cuối cùng:
                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          background: "#ff7b29",
                          width: "100%",
                          mt: 3,
                          borderRadius: 2,
                        }}
                        onClick={submitHandler}
                      >
                        Nộp bài
                      </Button>
                    </CardContent>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              )}
            </Card>
          </>
        )}
        {account.role !== "Sinh viên" && (
          <>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Danh sách bài tập đã nộp
            </Typography>
            {data?.map((item, index) => (
              <Card key={index} sx={{ mb: 3 }}>
                <CardHeader
                  avatar={
                    <AvatarStatus
                      alt={item.fullName}
                      src={item.avatar}
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
                          {item.isSubmit ? "Chọn tệp" : "Đã nộp"}
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
                      {item.fullName} đã nộp bài tập: {item.content}
                    </Typography>
                  }
                  subheader={
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                      noWrap
                    >
                      {item.endDate}
                    </Typography>
                  }
                />
                {!item.isSubmit ? (
                  <CardContent>
                    <Typography>Ngày nộp bài: {item.createdDate}</Typography>
                    <Typography>Đường dẫn file nộp bài: {item?.url}</Typography>
                    <TextField
                      type="number"
                      name="mark"
                      label="Điểm bài tập"
                      placeholder="Nhập điểm bài tập"
                      value={item.mark === 0 ? createMark.mark : item.mark}
                      onChange={(e) =>
                        setCreateMark({ ...createMark, mark: e.target.value })
                      }
                      variant="standard"
                      InputProps={{
                        inputProps: {
                          max: 10,
                          min: 0,
                          fontSize: 18,
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <Iconify icon={"ph:bookmarks-bold"} />
                          </InputAdornment>
                        ),
                      }}
                      autoComplete="none"
                      sx={styleInputField}
                      InputLabelProps={{ style: { fontSize: 18 } }}
                    />
                    <Button
                      variant="contained"
                      sx={{
                        background: "#ff7b29",
                        width: "100%",
                        mt: 3,
                        borderRadius: 2,
                      }}
                      onClick={() =>
                        submitMarkHandler(item.userId, item.taskId)
                      }
                    >
                      Chấm điểm
                    </Button>
                  </CardContent>
                ) : (
                  ""
                )}
              </Card>
            ))}
          </>
        )}
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
