import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import FriendSearchBox from "./components/FriendSearchBox";
import SearchInput from "./components/SearchInput";
import Axios from "./../../../utils/Axios/index";

const scrollbar = {
  "::-webkit-scrollbar": {
    width: "8px",
  },
  ":hover::-webkit-scrollbar-thumb": {
    " -webkit-border-radius": "5px",
    borderRadius: "5px",
    background: "#ffa36a",
  },
  "::-webkit-scrollbar-thumb:window-inactive": {
    background: "#ffa36a",
  },
};

export default function SearchPopover(sockets) {
  let socket;
  try {
    socket = sockets.sockets;
  } catch (error) {}
  const [open, setOpen] = useState(false);
  const [isFocusPopup, setFocusPopup] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [listeningRequestAccept, setListeningRequestAccept] = useState(false);


  useEffect(() => {
    getData();
  }, []);

  const handleChange = () => {
    getData();
  };

    try {
      socket.on("request_accept", function () {
        setListeningRequestAccept(true);
      });
    } catch (error) {}

  useEffect(() => {
    try {
      if (listeningRequestAccept) {
        console.log("request-accept");
        getData();
      }
    } catch (error) {}
  }, [listeningRequestAccept]);

  const getData = async () => {
    const response = await Axios.Friends.searchUserByKeywork("");
    setSearchList(response);
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (event) => {
    if (!isFocusPopup) {
      setOpen(false);
    }
  };

  const handleClose2 = (event) => {
    if (!isFocusPopup) {
      setOpen(false);
      setFocusPopup(false);
    } else {
      setFocusPopup(false);
    }
  };

  const handleSearch = async (e) => {
    const response = await Axios.Friends.searchUserByKeywork(e.target.value);
    setSearchList(response);
  };

  return (
    <Box onFocus={handleOpen} onBlur={handleClose}>
      <SearchInput onInput={handleSearch} />
      <Card
        hidden={!open}
        sx={{
          width: 500,
          position: "fixed",
          mt: 1,
          p: 0,
          borderRadius: 2,
          boxShadow: "0 0 8px #976235",
          maxHeight: "40vh",
        }}
      >
        <Box
          onBlur={handleClose}
          onMouseEnter={() => setFocusPopup(true)}
          onClick={() => setFocusPopup(false)}
          onMouseLeave={handleClose2}
        >
          <CardHeader
            title={
              <Typography fontWeight={500} fontSize={16}>
                {"Danh Sách Tìm Kiếm"}
              </Typography>
            }
            sx={{ pb: 1, height: 24 }}
          />
          <Divider />
          <CardContent
            sx={{
              p: "0 !important",
              maxHeight: "calc(40vh - (24*2px))",
              overflow: "auto",
              ...scrollbar,
            }}
          >
            {searchList?.map((searchData, index) => (
              <FriendSearchBox
                key={index}
                searchData={searchData}
                sockets={sockets}
                onchange={handleChange}
              />
            ))}
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
