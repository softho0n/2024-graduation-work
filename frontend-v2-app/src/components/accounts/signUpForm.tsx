// Todo: AppLayout 수정 필요
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Axios from "axios";
import * as F from "./signUpForm.styled";

const signUpForm = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "username") {
      setUsername(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = () => {
    async function fn() {
      const data = {
        username: username,
        password: password,
        nickname: name,
      };
      try {
        const response = await Axios.post(
          `${process.env.NEXT_PUBLIC_USER_BACKEND_URL_PREFIX}/signup/`,
          data
        );
        router.push("/accounts/login");
      } catch (error) {
        alert("아이디 및 닉네임이 중복됩니다.");
      }
    }
    fn();
  };

  return (
    <F.AuthWrapper desc="Welcome to SKKU music streaming service 🤚">
      <F.InputWithLabel
        label="ID 입력"
        type="username"
        name="username"
        onChange={handleChange}
      />
      <F.InputWithLabel
        label="비밀번호 입력"
        type="password"
        name="password"
        onChange={handleChange}
      />
      <F.InputWithLabel
        label="닉네임 입력"
        type="name"
        name="name"
        onChange={handleChange}
      />
      <F.AuthButton id="signup_btn" onClick={handleSubmit}>
        회원가입
      </F.AuthButton>
    </F.AuthWrapper>
  );
};

export default signUpForm;
