import * as dotenv from "dotenv";
import DbHelper from "src/utils/dbHelper";
import UserHelper from "src/utils/userHelper";
import invariant from "tiny-invariant";

dotenv.config();
invariant(process.env.DB_USER, "DB_USER must be set");
if (typeof process.env.DB_PASSWORD === "undefined") {
  throw "DB_PASSWORD must be set";
}
invariant(process.env.DB_HOST, "DB_HOST must be set");
invariant(process.env.DB_PORT, "DB_PORT must be set");
invariant(process.env.DB_NAME, "DB_NAME must be set");

const userHelper = UserHelper(
  await DbHelper({
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    database: process.env.DB_NAME!,
  })
);

export { userHelper };
