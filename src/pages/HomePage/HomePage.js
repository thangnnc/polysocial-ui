import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Post from "../../components/post/Post";
import UpPost from "../../components/post/UpPost";
import useLogin from "../../utils/Login/useLogin";
import Axios from "./../../utils/Axios/index";

export default function HomePage() {
  const [listPostDTO, setListPost] = useState([]);
  const { account, socket } = useLogin();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await Axios.Posts.getAllByAllPost(0, 100);
    if (response) {
      setListPost(response.listPostDTO);
    }
  };

  useEffect(() => {
    socket.on("Server-response-like-comment", async function () {
      fetchData();
    });
  }, []);

  const handleChange = () => {
    fetchData();
  };

  return (
    <>
      <Helmet>
        <title> Trang chủ | Poly Social</title>
      </Helmet>

      <UpPost />

      <Post posts={listPostDTO} onChange={handleChange} />
    </>
  );
}
