import pg from "pg";
export default async function DbHelper({
  user,
  password,
  host,
  port,
  database,
}: {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
}) {
  const { Client } = pg;

  const client = new Client({
    user,
    password,
    host,
    port,
    database,
  });

  await client.connect();
  return client;
}
