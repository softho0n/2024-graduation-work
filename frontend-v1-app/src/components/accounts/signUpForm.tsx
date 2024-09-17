// Todo: AppLayout 수정 필요
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Axios from "axios";
import * as F from "./signUpForm.styled";

const signUpForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

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
    } else if (name === "campus") {
      setCampus(value);
    } else if (name === "major") {
      setMajor(value);
    } else if (name === "code") {
      setCode(value);
    } else if (name === "studentId") {
      setStudentId(value);
    } else if (name === "phone") {
      setPhone(value);
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
        alert(`${process.env.NEXT_PUBLIC_USER_BACKEND_URL_PREFIX}/signup/`);
        alert("에러 발생, 잠시 후 다시 시도해주세요.");
        alert(error);
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
      <F.AuthButton id="signup_btn" onClick={handleSubmit}>
        회원가입
      </F.AuthButton>
    </F.AuthWrapper>
  );
};

export default signUpForm;
