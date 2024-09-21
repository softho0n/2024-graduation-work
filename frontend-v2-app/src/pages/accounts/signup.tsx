import { useRouter } from "next/router";
import Layout from "@/components/layout/layout";
import SignUpForm from "@/components/accounts/signUpForm";

const SignUp = () => {
  const router = useRouter();

  return (
    <Layout signUpPage>
      <SignUpForm></SignUpForm>
    </Layout>
  );
};

export default SignUp;
