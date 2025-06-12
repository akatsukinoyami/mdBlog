import { sql } from "$lib/db";
import { json } from "@sveltejs/kit";

export async function GET() {
  return json(await sql`SELECT 'ara-ara~' AS message;`);
}
