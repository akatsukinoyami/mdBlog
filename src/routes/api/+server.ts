import { db } from "$lib/db";
import { json } from "@sveltejs/kit";

export async function GET() {
  return json(db.query("select 'ara-ara~' as message;").get());
}
