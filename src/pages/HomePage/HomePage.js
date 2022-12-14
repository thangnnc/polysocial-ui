import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Post from "../../components/post/Post";
import UpPost from "../../components/post/UpPost";
import Axios from "./../../utils/Axios/index";

export default function HomePage() {
  const [listPostDTO, setListPost] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await Axios.Posts.getAllByAllPost(0, 100);
    console.log(response);
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

      <UpPost onChange={handleChange} />

      <Post posts={listPostDTO} onChange={handleChange} />
    </>
  );
}
