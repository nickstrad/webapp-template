import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { User } from "src/utils/entities";
import UserHelper from "src/utils/userHelper";
import invariant from "tiny-invariant";
import DbHelper from "src/utils/dbHelper";
import * as dotenv from "dotenv";
import { singleton } from "./singleton.server";

dotenv.config();
invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
invariant(process.env.DB_USER, "DB_USER must be set");
if (typeof process.env.DB_PASSWORD === "undefined") {
  throw "DB_PASSWORD must be set";
}
invariant(process.env.DB_HOST, "DB_HOST must be set");
invariant(process.env.DB_PORT, "DB_PORT must be set");
invariant(process.env.DB_NAME, "DB_NAME must be set");

export const userHelper = await singleton("DbHelper", async () =>
  UserHelper(
    await DbHelper({
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      host: process.env.DB_HOST!,
      port: Number(process.env.DB_PORT!),
      database: process.env.DB_NAME!,
    })
  )
);

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

const USER_SESSION_KEY = "userId";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getUserId(
  request: Request
): Promise<User["id"] | undefined> {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (userId === undefined) return null;

  const user = await userHelper.getUserById(userId);
  if (user) return user;

  throw await logout(request);
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const userId = await getUserId(request);
  if (!userId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function requireUser(request: Request) {
  const userId = await requireUserId(request);

  const user = await userHelper.getUserById(userId);
  if (user) return user;

  throw await logout(request);
}

export async function createUserSession({
  request,
  userId,
  remember,
  redirectTo,
}: {
  request: Request;
  userId: string;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
