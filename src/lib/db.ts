import { SQL } from "bun";

export async function connect() {
  const sql = new SQL({
    hostname: process.env.POSTGRES_HOST || import.meta.env.VITE_POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || import.meta.env.VITE_POSTGRES_PORT,
    database: process.env.POSTGRES_DB || import.meta.env.VITE_POSTGRES_DB,
    username: process.env.POSTGRES_USER || import.meta.env.VITE_POSTGRES_USER,
    password:
      process.env.POSTGRES_PASSWORD || import.meta.env.VITE_POSTGRES_PASSWORD,
  });

  await sql`
    CREATE TABLE IF NOT EXISTS public.interactions (
      post_id TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      type TEXT NOT NULL CHECK (type IN ('like', 'view', 'share')),
      ip_addr TEXT,
      PRIMARY KEY (created_at, post_id, type)
    );
  `.catch((e) => console.error(e));

  return sql;
}
