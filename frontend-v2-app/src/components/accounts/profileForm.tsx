// Todo: AppLayout 수정 필요
import { use, useEffect, useRef, useState } from "react";
import * as F from "./profileForm.styled";
import Axios from "axios";
import { useRouter } from "next/router";
const profileForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [money, setMoney] = useState("");

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    // document.cookie = `token=${token}`;
    async function fn() {
      try {
        const data = {
          access_token: token,
        };
        const response = await Axios.post(
          `${process.env.NEXT_PUBLIC_USER_BACKEND_URL_PREFIX}/profile/`,
          data
        );
        console.log(response);
        const {
          data: { username, password, nickname },
        } = response;

        setUsername(username);
        setPassword(password);
        setNickname(nickname);

        const charge_response = await Axios.post(
          `${process.env.NEXT_PUBLIC_PAYMENTS_BACKEND_URL_PREFIX}/get_money/`,
          data
        );
        const {
          data: { money },
        } = charge_response;

        setMoney(money);
      } catch (error) {
        router.push("/accounts/login");
      }
    }
    fn();
  }, []);

  const handleSubmit = () => {
    async function fn() {
      const data = {
        username,
        password,
        nickname,
      };
      try {
        const response = await Axios.post(
          `${process.env.NEXT_PUBLIC_USER_BACKEND_URL_PREFIX}/update_profile/`,
          data
        );
        alert("프로필이 업데이트 되었습니다.");
      } catch (error) {
        alert(error);
      }
    }
    fn();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "nickname") {
      setNickname(value);
    }
  };

  const handleQuitUser = () => {};

  return (
    <F.AuthWrapper desc="내 프로필 보기">
      <F.verticalWrapper>
        <F.InputWithLabel
          label="아이디"
          name="username"
          value={username}
          readonly="readonly"
        />
      </F.verticalWrapper>
      <F.verticalWrapper>
        <F.InputWithLabel
          label="패스워드"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </F.verticalWrapper>
      <F.verticalWrapper>
        <F.InputWithLabel
          label="닉네임"
          name="nickname"
          value={nickname}
          onChange={handleChange}
        />
      </F.verticalWrapper>
      <F.verticalWrapper>
        <F.InputWithLabel
          label="잔액"
          name="money"
          value={money}
          readonly="readonly"
        />
      </F.verticalWrapper>
      <F.horizontalWrapper>
        <F.AuthButton onClick={handleSubmit}>변경하기</F.AuthButton>
        <F.AuthButton onClick={handleQuitUser}>회원 탈퇴하기</F.AuthButton>
      </F.horizontalWrapper>
    </F.AuthWrapper>
  );
};

export default profileForm;
