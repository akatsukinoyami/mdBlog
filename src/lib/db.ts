import { SQL } from "bun";

export const sql = new SQL({
  hostname: import.meta.env.VITE_POSTGRES_HOST,
  port: import.meta.env.VITE_POSTGRES_PORT,
  database: import.meta.env.VITE_POSTGRES_DB,
  username: import.meta.env.VITE_POSTGRES_USER,
  password: import.meta.env.VITE_POSTGRES_PASSWORD,
  //onconnect: _ => console.log("Connected to database"),
  //onclose: _ => console.log("Connection closed"),
});
