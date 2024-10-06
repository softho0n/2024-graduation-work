// Todo: AppLayout 수정 필요
import { useEffect, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/navigation";
import * as S from "./loginForm.styled";

const loginForm = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "id") {
      setId(value);
    } else {
      setPassword(value);
    }
  };

  const handleLogin = (e) => {
    async function fn() {
      const data = { username: id, password: password };
      try {
        alert("잠시만 기다려주세요!");
        const response = await Axios.post(
          `${process.env.NEXT_PUBLIC_USER_BACKEND_URL_PREFIX}/login/`,
          data
        );
        const {
          data: { access_token },
        } = response;

        localStorage.setItem("jwtToken", access_token);
        localStorage.setItem("userID", id);
        router.push("/");
      } catch (error) {
        alert("에러 발생, 잠시 후 다시 시도해주세요.");
      }
    }
    fn();
  };

  return (
    <S.AuthWrapper desc="Welcome to SKKU music streaming service 🤚">
      <S.InputWithLabel
        label="아이디"
        name="id"
        onChange={handleChange}
      ></S.InputWithLabel>
      <S.InputWithLabel
        label="패스워드"
        type="password"
        name="password"
        onChange={handleChange}
      ></S.InputWithLabel>
      <S.AuthButton id="login_btn" onClick={handleLogin}>
        로그인
      </S.AuthButton>
    </S.AuthWrapper>
  );
};

export default loginForm;
