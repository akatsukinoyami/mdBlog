import { connect } from "$lib/db";
import { json } from "@sveltejs/kit";

export async function GET() {
  const sql = await connect();

  if (sql) {
    return json(await sql`SELECT 'ara-ara~' AS message;`);
  } else {
    return json({ message: "no ara-ara((" });
  }
}
