import { error, json } from "@sveltejs/kit";
import { db } from "$lib/db";
import { getPostData } from "$lib/sql.calls";
import { mutatePost } from "$lib/sql.queries";
import type { UUID } from "crypto";

const possibleTypes = new Set(["view", "like", "share"]);

function getFromParams(url: URL, key: string): UUID {
  const value = url.searchParams.get(key);
  if (!value) throw error(422, `Missing ${key}`);

  return value as UUID;
}

export async function GET({ url, getClientAddress }) {
  const $post_id = getFromParams(url, "post_id");
  const $type = url.searchParams.get("type") ?? "";
  if (possibleTypes.has($type)) {
    db.query(mutatePost).all({ $post_id, $ip_addr: getClientAddress(), $type });
  }

  return getPostData($post_id);
}
