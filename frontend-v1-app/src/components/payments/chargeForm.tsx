// Todo: AppLayout 수정 필요
import { use, useEffect, useRef, useState } from "react";
import * as F from "./chargeForm.styled";
import Axios from "axios";
const chargeForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [money, setMoney] = useState("");
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
    const token = localStorage.getItem("jwtToken");
    async function fn() {
      const data = {
        access_token: token,
        money_amount: money,
      };
      // alert("asdf");
      alert(`${process.env.NEXT_PUBLIC_PAYMENTS_BACKEND_URL_PREFIX}/charge/`);
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
        <F.InputWithLabel
          label="충전금액"
          // type="password"
          name="money"
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
