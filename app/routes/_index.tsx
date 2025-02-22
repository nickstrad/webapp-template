import type { MetaFunction } from "@remix-run/node";
import { Layout } from "components/Layout";

import { LandingPage } from "components/LandingPage";

export const meta: MetaFunction = () => {
  return [
    { title: "Company Name" },
    { name: "description", content: "World's Best Business!!" },
  ];
};

export default function Index() {
  return (
    <Layout>
      <LandingPage />
    </Layout>
  );
}
