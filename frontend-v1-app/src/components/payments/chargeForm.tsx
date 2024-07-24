// Todo: AppLayout 수정 필요
import { use, useEffect, useRef, useState } from "react";
import * as F from "./chargeForm.styled";
import Axios from "axios";
const chargeForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    // document.cookie = `token=${token}`;
    async function fn() {
      try {
        const data = {
          access_token: token,
        };
        const response = await Axios.post(
          "http://localhost:8000/user/profile/",
          data
        );
        console.log(response);
        const {
          data: { username, password, nickname },
        } = response;

        setUsername(username);
        setPassword(password);
        setNickname(nickname);

        // setEmail(email);
        // setUsername(userName);
        // setCampus(campus);
      } catch (error) {
        alert(error);
      }
    }
    // fn();
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
          "http://localhost:8000/user/update_profile/",
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

  return (
    <F.AuthWrapper desc="충전하기">
      <F.verticalWrapper>
        <F.InputWithLabel
          label="충전금액"
          // type="password"
          name="password"
          // value={password}
          placeholder="충전 금액을 입력 해주세요.   ex) 5000"
          onChange={handleChange}
        />
      </F.verticalWrapper>

      <F.AuthButton onClick={handleSubmit}>충전하기</F.AuthButton>
    </F.AuthWrapper>
  );
};

export default chargeForm;
