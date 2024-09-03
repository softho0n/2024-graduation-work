// Todo: AppLayout 수정 필요
import { use, useEffect, useRef, useState } from "react";
import * as F from "./musicListView.styled";
import Axios from "axios";
const musicListView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [money, setMoney] = useState("");

  const [musics, setMusics] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    // document.cookie = `token=${token}`;
    async function fn() {
      try {
        const data = {
          access_token: token,
        };
        const response = await Axios.post(
          `${process.env.NEXT_PUBLIC_AUDIO_STREAMING_BACKEND_URL_PREFIX}/get_musics/`,
          data
        );

        const { data: results } = response;
        setMusics(results);
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
      // alert("asdf");
      // alert(`${process.env.NEXT_PUBLIC_PAYMENTS_BACKEND_URL_PREFIX}/charge/`);
      try {
        const response = await Axios.post(
          // "http://localhost:8000/user/update_profile/",
          // "http://localhost:8001/payments/charge",
          // "/api/payments/charge",
          `${process.env.NEXT_PUBLIC_PAYMENTS_BACKEND_URL_PREFIX}/charge/`,
          data
        );
        alert("정상적으로 충전되었습니다.");
      } catch (error) {
        alert(error);
      }
    }
    fn();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "money") {
      setMoney(value);
    }
  };

  return (
    <F.AuthWrapper desc="음원 다운로드를 위한 머니 충전하기">
      <F.verticalWrapper>
        <F.ListViewWrapper>
          {musics.map((result, index) => (
            <F.MusicElement
              key={index}
              imgUrl="/img.png"
              title={result.title}
              artist={result.artist}
              label={result.label}
            />
          ))}
        </F.ListViewWrapper>
      </F.verticalWrapper>
    </F.AuthWrapper>
  );
};

export default musicListView;
