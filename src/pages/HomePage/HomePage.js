import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Post from "../../components/post/Post";
import UpPost from "../../components/post/UpPost";
import useLogin from "../../utils/Login/useLogin";
import Axios from "./../../utils/Axios/index";

export default function HomePage(props) {
  let socket;
  const { account } = useLogin();
  const [listPostDTO, setListPost] = useState([]);
  try {
    socket=props.socket.socket
  } catch (error) {
    
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    try {
      socket.on("Server-response-like-comment", function (listSocket) {
        fetchData();
      });
    } catch (error) {}
  });

  const fetchData = async () => {
    const response = await Axios.Posts.getAllByAllPost(0, 100);
    if (response) {
      setListPost(response.listPostDTO);
    }
  };

  const handleChange = () => {
    fetchData();
  };

  return (
    <>
      <Helmet>
        <title> Trang chủ | Poly Social</title>
      </Helmet>
      {account.role !== "Sinh viên" && <UpPost onChange={handleChange} socket={socket}/>}

      <Post posts={listPostDTO} onChange={handleChange} socket={socket} />
    </>
  );
}
