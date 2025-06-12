import { json, error } from "@sveltejs/kit";
import { sql } from "$lib/db";
import type { UUID } from "crypto";
import type { Count } from "$lib/types";

const possibleTypes = new Set(["view", "like", "share"]);
const defaultCounts = { view: 0, like: 0, share: 0, comment: 0 };

function getFromParams(url: URL, key: string): UUID {
  const value = url.searchParams.get(key);
  if (!value) throw error(422, `Missing ${key}`);

  return value as UUID;
}

async function getPostData(post_id: UUID) {
  const interactions = (await sql`
    SELECT type, COUNT(*) as count 
      FROM interactions 
      WHERE post_id = ${post_id} 
      GROUP BY type
  ;`) as Count[];
  const result = Object.fromEntries(
    interactions.map(({ type, count }) => [type, count]),
  );
  return json({ ...defaultCounts, ...result });
}

export async function GET({ url, getClientAddress }) {
  const post_id = getFromParams(url, "post_id");
  const type = url.searchParams.get("type") ?? "";
  if (possibleTypes.has(type)) {
    await sql`
      INSERT 
        INTO interactions (type, post_id, ip_addr) 
        VALUES (${type}, ${post_id}, ${getClientAddress()})
    ;`;
  }

  return getPostData(post_id);
}
