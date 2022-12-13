import { Helmet } from "react-helmet";
import Post from "../../components/post/Post";
import UpPost from "../../components/post/UpPost";

const listPostDTO = [
  {
    postId: 7,
    content: "Đây là 1 bài đăng ko có nội dung gì hết",
    createdDate: "2022-12-14T02:56:32.41",
    user: {
      userId: 1,
      fullName: "Phan Nguyễn Đăng Trường",
      studentCode: "PS16501",
      email: "truongpnd@fe.fpt.vn",
      password: "$2a$12$VMDh95zBLcJh5u1N/H4MW.mqr66u0Rr3O4r4NqqHgADhACs94dQcG",
      avatar:
        "https://res.cloudinary.com/dwc7dkxy7/image/upload/v1670956090/164650097_1091887981293133_2219666657295254134_n_wzpcjy.jpg",
      createdDate: "2022-11-26T14:40:28.127",
      roleId: 2,
      qrCode: null,
      active: true,
    },
    groupId: 2,
    countLike: 0,
    countComment: 2,
    status: true,
    listComment: [
      {
        cmtId: 1,
        content: "Không có gì cũng đăng bài???",
        createdDate: "2022-12-13T14:40:28.127",
        user: {
          userId: 1,
          fullName: "Phan Nguyễn Đăng Trường",
          studentCode: "PS16501",
          email: "truongpnd@fe.fpt.vn",
          password: "$2a$12$VMDh95zBLcJh5u1N/H4MW.mqr66u0Rr3O4r4NqqHgADhACs94dQcG",
          avatar:
            "https://res.cloudinary.com/dwc7dkxy7/image/upload/v1670956090/164650097_1091887981293133_2219666657295254134_n_wzpcjy.jpg",
          createdDate: "2022-12-13T14:40:28.127",
          roleId: 2,
          qrCode: null,
          active: true,
        },
      },
      {
        cmtId: 2,
        content: "Bài như shit!",
        createdDate: "2022-12-13T22:40:28.127",
        user: {
          userId: 1,
          fullName: "Nguyễn Nhật Cao Thăng",
          studentCode: "PS16501",
          email: "truongpnd@fe.fpt.vn",
          password: "$2a$12$VMDh95zBLcJh5u1N/H4MW.mqr66u0Rr3O4r4NqqHgADhACs94dQcG",
          avatar:
            "https://res.cloudinary.com/dwc7dkxy7/image/upload/v1670956090/164650097_1091887981293133_2219666657295254134_n_wzpcjy.jpg",
          createdDate: "2022-12-13T22:40:28.127",
          roleId: 2,
          qrCode: null,
          active: true,
        },
      }
    ],
    listUrl: [
      {
        urlFile:
          "https://toigingiuvedep.vn/wp-content/uploads/2021/06/hinh-anh-gai-xinh-de-thuong-nhat-1-600x600.jpg",
        type: "img",
      },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Trang chủ | Poly Social</title>
      </Helmet>

      <UpPost />

      <Post posts={listPostDTO} />
    </>
  );
}
