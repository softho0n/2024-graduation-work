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
  p: 4,
};

const musicListView = () => {
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
        alert(
          `${process.env.NEXT_PUBLIC_AUDIO_STREAMING_BACKEND_URL_PREFIX}/get_musics/`
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
  }, []);

  const handleSubmit = () => {
    const token = localStorage.getItem("jwtToken");
    async function fn() {
      const data = {
        access_token: token,
        money_amount: money,
      };
      try {
        const response = await Axios.post(
          `${process.env.NEXT_PUBLIC_PAYMENTS_BACKEND_URL_PREFIX}/charge/`,
          data
        );
      } catch (error) {
        alert(error);
      }
    }
    fn();
  };

  const handlePlay = (musicTitle) => {
    alert(musicTitle);
  };

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
          `${process.env.NEXT_PUBLIC_AUDIO_STREAMING_BACKEND_URL_PREFIX}/play_music/${title}`
        );
        setModalContent(title);
        setModelLyrics(lyrics);
        setOpen(true);
      } catch (error) {
        alert(error);
      }
    }
    fn();
  };

  const handleClose = () => setOpen(false);

  return (
    <F.AuthWrapper desc="음원 다운로드를 위한 머니 충전하기">
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Lyrics
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalLyrics}
          </Typography>
        </Box>
      </Modal>
    </F.AuthWrapper>
  );
};

export default musicListView;