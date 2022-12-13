import Axios from "../../Axios";

class Exercise {
  // API get adll exercise
  static getAllExercise = async (groupId) =>
    Axios.get(`/exercises/get-all-exercises?groupId=${groupId}`);
  // API get one exercise
  static getOneExercise = async (exId) =>
    Axios.get(`/exercises/get-one?exId=${exId}`);
  // API create exercise
  static createExercise = async (data) => Axios.post("/exercises/create", data);
  // API update exercise
  static updateExercise = async (data) => Axios.put("/exercises/update", data);
  // API delete exercise
  static deleteExercise = async (exId) =>
    Axios.delete(`/exercises/delete?exId=${exId}`);
  // API get adll file exercise
  static getAllFileExercise = async (exId, groupId) =>
    Axios.get(`/task/get-all-task-file?exId=${exId}&groupId=${groupId}`);
  // API upload file quiz
  static uploadFileExercise = async (data) =>
    Axios.postFile("/task-file/create", data);
  // API update file quiz
  static updateFileExercise = async (data) =>
    Axios.putFile("/task-file/update", data);
  // API delete file quiz
  static deleteFileExercise = async (taskFileId) =>
    Axios.delete(`/task-file/delete-file?taskFileId=${taskFileId}`);
  // API create marks
  static createMarks = async (data) => Axios.post("/task/create-mark", data);
}

export default Exercise;
