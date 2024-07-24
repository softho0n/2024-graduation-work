import Layout from "@/components/layout/layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Home = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token === null) {
      router.push("/accounts/login");
    }
  }, []);
  return <Layout homeNum></Layout>;
};

export default Home;
