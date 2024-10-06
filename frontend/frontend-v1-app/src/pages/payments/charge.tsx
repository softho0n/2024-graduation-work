import { useRouter } from "next/router";
import Layout from "@/components/layout/layout";
import ChargeForm from "@/components/payments/chargeForm";

const Charge = () => {
  const router = useRouter();
  return (
    <Layout homeNum>
      <ChargeForm></ChargeForm>
    </Layout>
  );
};

export default Charge;
