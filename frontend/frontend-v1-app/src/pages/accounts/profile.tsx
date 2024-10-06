import { useRouter } from "next/router";
import Layout from "@/components/layout/layout";
import ProfileForm from "@/components/accounts/profileForm";
const Profile = () => {
  const router = useRouter();
  return (
    <Layout homeNum>
      <ProfileForm></ProfileForm>
    </Layout>
  );
};

export default Profile;
