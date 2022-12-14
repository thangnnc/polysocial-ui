import Axios from "../../Axios";

class Groups {
  //API get all groups
  static getAllGroups = async () =>
    Axios.get("/group/api/get/all?page=0&limit=50");

  //API get all groups false
  static getAllGroupsFalse = async () =>
    Axios.get("/group/api/get/all/false?page=0&limit=10");

  //API get one group of list groups
  static getOneGroup = async (groupId) =>
    Axios.get(`/group/api/get/class?groupId=${groupId}`);

  //API create new group
  static createGroup = async (data) =>
    Axios.post("/group/api/create-group", data);

  //API create new group by excel
  static createGroupExcel = async (data, groupId) =>
    Axios.postFile(`/group/api/create-file?groupId=${groupId}`, data);

  //API update group
  static updateGroup = async (data) =>
    Axios.put("/group/api/update-group", data);

  //API delete group
  static deleteGroup = async (groupId) =>
    Axios.delete(`/group/api/delete-group?groupId=${groupId}`);

  //API get teacher of group
  static getTeacherGroup = async (groupId) =>
    Axios.get(`/group/api/get-teacher?groupId=${groupId}`);

  //API get all student of group
  static getAllStudentGroup = async (groupId) =>
    Axios.get(`/group/api/get/all-student?groupId=${groupId}`);

  //API get one student of group
  static getOneStudent = async (email, groupId) =>
    Axios.get(`/group/api/get-student?email=${email}&groupId=${groupId}`);

  //API create student in group
  static createStudentGroup = async (data) =>
    Axios.post("/group/api/create-student", data);

  //API delete student in group
  static deleteStudentGroup = async (userId, groupId) =>
    Axios.delete(
      `/group/api/remove-student?userId=${userId}&groupId=${groupId}`
    );

  //API get all group by student
  static getAllGroupStudent = async () =>
    Axios.get(`/group/api/get-all/student`);

  //API get all group by student
  static getAllGroupUser = async () => Axios.get(`/group/api/get-all/user`);

  //API get all group by teacher
  static getAllGroupTeacher = async () =>
    Axios.get(`/group/api/get-all/teacher`);

  //API find group by keywork
  static findGroupByKeyWord = async (keyword) =>
    Axios.get(`/group/api/find-group?keywork=${keyword}`);
}

export default Groups;
