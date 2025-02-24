import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { logout } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) =>
  logout(request);

export default function App() {
  return null;
}
