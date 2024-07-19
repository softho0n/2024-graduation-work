import { useRouter } from "next/router";
import Layout from "@/components/layout/layout";
import LoginForm from "@/components/accounts/loginForm";
const Login = () => {
  const router = useRouter();
  return (
    <Layout loginPage>
      <LoginForm></LoginForm>
    </Layout>
  );
};

export default Login;
