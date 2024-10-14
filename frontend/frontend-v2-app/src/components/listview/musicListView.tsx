import { use, useEffect, useRef, useState } from "react";
import * as F from "./musicListView.styled";
import Axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "scroll",
  p: 4,
};

const musicListView = ({ liktBtndisplay, headerDisplay, isLikePage }) => {
  const [audioUrl, setAudioUrl] = useState("");
  const [money, setMoney] = useState("");
  const [musics, setMusics] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    async function fn() {
      try {
        const data = {
          access_token: token,
        };
        const response = await Axios.post(
          `${process.env.NEXT_PUBLIC_AUDIO_STREAMING_BACKEND_URL_PREFIX}/get_musics/`,
          data
        );
        const subscription_response = await Axios.post(
          `${process.env.NEXT_PUBLIC_SUBSCRIPTION_BACKEND_URL_PREFIX}/get_like_musics/`,
          data
        );

        const { data: results } = response;
        const { data: likeMusics } = subscription_response;
        const updatedResults = results.map((result) => ({
          ...result,
          like: likeMusics ? likeMusics.includes(result.title) : false,
        }));

        if (isLikePage === true) {
          const likedMusics = updatedResults.filter((result) => result.like);
          setMusics(likedMusics);
        } else {
          setMusics(updatedResults);
        }
      } catch (error) {
        alert(error);
      }
    }
    fn();
  }, []);

  const handleTest = (likeValue, musicTitle, index) => {
    const token = localStorage.getItem("jwtToken");
    const data = {
      access_token: token,
      music_title: musicTitle,
    };

    setMusics((prevMusics) => {
      const updatedMusics = prevMusics.map((music, idx) =>
        idx === index ? { ...music, like: !music.like } : music
      );
      return updatedMusics;
    });

    try {
      var apiUrl = "";
      if (likeValue === true) {
        apiUrl = `${process.env.NEXT_PUBLIC_SUBSCRIPTION_BACKEND_URL_PREFIX}/unlike/`;
      } else {
        apiUrl = `${process.env.NEXT_PUBLIC_SUBSCRIPTION_BACKEND_URL_PREFIX}/like/`;
      }

      const response = Axios.post(apiUrl, data);
    } catch (error) {
      alert(error);
    }
  };

  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalLyrics, setModelLyrics] = useState("");

  const handleOpen = (title, lyrics) => {
    async function fn() {
      try {
        setAudioUrl(
          `${process.env.NEXT_PUBLIC_AUDIO_STREAMING_BACKEND_URL_PREFIX}/play_music/${title}/`
        );
        setModalContent(title);
        setModelLyrics(lyrics);
        const response = await fetch(audioUrl);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Unknown error occurred");
        } else {
          setOpen(true);
        }
      } catch (error) {
        alert(error);
      }
    }
    fn();
  };

  const handleDownload = (title) => {
    const token = localStorage.getItem("jwtToken");
    async function fn() {
      const data = {
        access_token: token,
        music_title: title,
      };

      try {
        const response = await Axios.post(
          `${process.env.NEXT_PUBLIC_DOWNLOAD_BACKEND_URL_PREFIX}/download_music/`,
          data,
          {
            responseType: "blob", // 응답 타입을 blob으로 설정
          }
        );

        const filename = title + ".mp3"; // 예: mp3 파일로 가정

        const url = window.URL.createObjectURL(new Blob([response.data]));

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(url);
      } catch (error) {
        alert(error);
      }
    }
    fn();
  };

  const handleClose = () => setOpen(false);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const token = localStorage.getItem("jwtToken");
      async function fn() {
        try {
          const data = {
            access_token: token,
            query: event.target.value,
          };
          const response = await Axios.post(
            `${process.env.NEXT_PUBLIC_SEARCH_BACKEND_URL_PREFIX}/get_musics/`,
            data
          );
          const subscription_response = await Axios.post(
            `${process.env.NEXT_PUBLIC_SUBSCRIPTION_BACKEND_URL_PREFIX}/get_like_musics/`,
            data
          );

          const { data: results } = response;
          const { data: likeMusics } = subscription_response;
          const updatedResults = results.map((result) => ({
            ...result,
            like: likeMusics ? likeMusics.includes(result.title) : false,
          }));

          setMusics(updatedResults);
        } catch (error) {
          alert(error);
        }
      }
      fn();
    }
  };

  return (
    <F.AuthWrapper
      handleKeyPress={handleKeyPress}
      headerDisplay={headerDisplay}
    >
      <F.verticalWrapper>
        <F.ListViewWrapper>
          {musics.map((result, index) => (
            <F.MusicElement
              key={index}
              imgUrl={result.img_uri}
              title={result.title}
              artist={result.artist}
              label={result.label}
              like={result.like}
              isDownloaded={result.isDownloaded}
              onClickHeart={handleTest}
              onClickLyrics={() => handleOpen(result.title, result.lyrics)}
              onClickPlay={() => handleOpen(result.title, result.lyrics)}
              onClickDownload={handleDownload}
              isLikeBtnDisplay={liktBtndisplay}
              index={index}
            />
          ))}
        </F.ListViewWrapper>
      </F.verticalWrapper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            {modalContent}
          </Typography>
          <audio controls autoPlay>
            <source src={audioUrl} type="audio/mpeg" />
          </audio>
          <Typography
            id="modal-lyrics-title"
            variant="h6"
            component="h2"
            sx={{ mt: 2 }}
          >
            가사
          </Typography>
          <Box
            sx={{
              maxHeight: "200px", // 가사 섹션의 최대 높이 설정
              overflowY: "auto", // 수직 스크롤 활성화
              border: "1px solid #ccc", // 선택사항: 가시성을 위한 테두리
              padding: "8px", // 선택사항: 패딩 추가
              borderRadius: "4px", // 선택사항: 모서리 둥글게
            }}
          >
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {modalLyrics}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </F.AuthWrapper>
  );
};

export default musicListView;
