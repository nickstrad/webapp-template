import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Company Name" },
    { name: "description", content: "World's Best Business!!" },
  ];
};

export default function AboutPage() {
  return <div>About</div>;
}
