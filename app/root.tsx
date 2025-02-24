import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import "./tailwind.css";
import { getUser } from "./session.server";
import { useOptionalUser } from "src/utils/appHelper";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return Response.json({ user: await getUser(request) });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const user = useOptionalUser();

  return (
    <div className="h-screen flex flex-col">
      <div>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a href="/" className="btn btn-ghost text-xl">
              Business
            </a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/pricing">Pricing</a>
              </li>
              <li>
                <a href="/dashboard">Dashboard</a>
              </li>
              <li>
                <details>
                  <summary>Options</summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li>
                      {typeof user === "undefined" ? (
                        <Link to="/login">Login</Link>
                      ) : (
                        <Link to="/logout">Logout</Link>
                      )}
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grow">
        <Outlet />
      </div>
      <div>
        <footer className="footer footer-center bg-base-300 text-base-content p-4">
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved by
              ACME Industries Ltd
            </p>
          </aside>
        </footer>
      </div>
    </div>
  );
}
