import { useRouter } from "next/router";
import * as S from "./layout.styled";

// Todo: AppLayout 수정 필요
const layout = ({ children, homeNum, loginPage, signUpPage }) => {
  const router = useRouter();
  return (
    <div className="app">
      <div className="header">
        <S.LogoImage
          src="/logo_skku.png"
          alt="SKMG"
          onClick={(event) => router.push("/")}
        />
        <S.TopNav>
          {signUpPage ? (
            <S.TopNavUL>
              <S.TopNavLI onClick={(event) => router.push("/accounts/login")}>
                로그인 페이지로 돌아가기
              </S.TopNavLI>
            </S.TopNavUL>
          ) : (
            <div></div>
          )}
          {loginPage ? (
            <S.TopNavUL>
              <S.TopNavLI onClick={(event) => router.push("/accounts/signup")}>
                회원가입
              </S.TopNavLI>
            </S.TopNavUL>
          ) : (
            <div></div>
          )}
          {homeNum ? (
            <S.TopNavUL>
              <S.TopNavLI onClick={(event) => router.push("/accounts/profile")}>
                내 프로필
              </S.TopNavLI>
              <S.TopNavLI onClick={(event) => router.push("/payments/charge")}>
                충전하기
              </S.TopNavLI>
              <S.TopNavLI>찜 목록</S.TopNavLI>
              <S.TopNavLI
                onClick={(event) => {
                  localStorage.removeItem("jwtToken");
                  router.push("/accounts/login");
                }}
              >
                로그아웃
              </S.TopNavLI>
            </S.TopNavUL>
          ) : (
            <div></div>
          )}
        </S.TopNav>
      </div>
      <div className="contents">{children}</div>
      <div className="footer">&copy; 2018310242 신승훈 졸업작품</div>
    </div>
  );
};

export default layout;
