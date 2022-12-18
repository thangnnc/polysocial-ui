import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/post/Post";
import UpPost from "../../components/post/UpPost";
import useLogin from "../../utils/Login/useLogin";
import Axios from "./../../utils/Axios/index";

export default function GroupDetailPage() {
  const { groupId } = useParams();
  const { account } = useLogin();
  const [listPostDTO, setListPost] = useState([]);

  useEffect(() => {
    fetchData(groupId);
  }, [groupId]);

  const fetchData = async (groupId) => {
    const response = await Axios.Posts.getAllByAllPostGroup(groupId);
    if (response) {
      setListPost(response.listPostDTO);
    }
  };

  const handleChange = () => {
    fetchData(groupId);
  };

  return (
    <Box sx={{ mt: 20, width: "75%" }}>
      {account.role !== "Sinh viên" && <UpPost onChange={handleChange} />}

      <Post posts={listPostDTO} onChange={handleChange} />
    </Box>
  );
}
