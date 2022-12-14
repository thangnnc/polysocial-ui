import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/post/Post";
import Axios from "./../../utils/Axios/index";

export default function GroupDetailPage() {
  const { groupId } = useParams();
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

  return (
    <Box sx={{ mt: 20, width: "75%" }}>
      <Post posts={listPostDTO} />
    </Box>
  );
}
