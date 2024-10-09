import Layout from "@/components/layout/layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MusicListView from "@/components/listview/musicListView";

const Home = () => {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token === null) {
      router.push("/accounts/login");
    }
  }, []);
  return (
    <Layout homeNum>
      {/* <p>API URL: {apiUrl}</p> */}
      <MusicListView></MusicListView>
    </Layout>
  );
};

export default Home;