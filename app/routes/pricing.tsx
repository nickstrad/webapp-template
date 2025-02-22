import type { MetaFunction } from "@remix-run/node";
import { Layout, Pricing } from "components";

export const meta: MetaFunction = () => {
  return [
    { title: "Company Name" },
    { name: "description", content: "World's Best Business!!" },
  ];
};

export default function PricingPage() {
  return (
    <Layout>
      <Pricing />
    </Layout>
  );
}
