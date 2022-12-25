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

  const [listeningPost, setListeningPost] = useState(false);

  try {
    socket = props.socket.socket;
  } catch (error) {}

  useEffect(() => {
    fetchData();
  }, []);

  ///listeningPost
  try {
    socket.on("Server_response_like_comment", () => {
      setListeningPost(true);
    });
  } catch (error) {}

  useEffect(() => {
    try {
      if (listeningPost) {
        fetchData();
        setListeningPost(false);
      }
    } catch (error) {}
  }, [listeningPost]);

  const fetchData = async () => {
    const response = await Axios.Posts.getAllByAllPost(0, 100);
    if (response) {
      setListPost(response.listPostDTO);
      console.log("list-->",response.listPostDTO)
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
      {account.role !== "Sinh viên" && (
        <UpPost onChange={handleChange} socket={socket} />
      )}

      <Post posts={listPostDTO} onChange={handleChange} socket={socket} />
    </>
  );
}
