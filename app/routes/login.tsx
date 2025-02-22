import type { MetaFunction } from "@remix-run/node";
import { Layout, Login } from "components";

export const meta: MetaFunction = () => {
  return [
    { title: "Company Name" },
    { name: "description", content: "World's Best Business!!" },
  ];
};

export default function LoginPage() {
  return (
    <Layout>
      <Login />
    </Layout>
  );
}
