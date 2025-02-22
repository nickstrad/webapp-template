import type { MetaFunction } from "@remix-run/node";
import { Layout } from "components";

export const meta: MetaFunction = () => {
  return [
    { title: "Company Name" },
    { name: "description", content: "World's Best Business!!" },
  ];
};

export default function AboutPage() {
  return (
    <Layout>
      <div>About</div>
    </Layout>
  );
}
