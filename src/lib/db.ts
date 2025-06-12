import { SQL } from "bun";

export const sql = new SQL({
  hostname: process.env.POSTGRES_HOST || import.meta.env.VITE_POSTGRES_HOST,
  port: process.env.POSTGRES_PORT || import.meta.env.VITE_POSTGRES_PORT,
  database: process.env.POSTGRES_DB || import.meta.env.VITE_POSTGRES_DB,
  username: process.env.POSTGRES_USER || import.meta.env.VITE_POSTGRES_USER,
  password:
    process.env.POSTGRES_PASSWORD || import.meta.env.VITE_POSTGRES_PASSWORD,
});
