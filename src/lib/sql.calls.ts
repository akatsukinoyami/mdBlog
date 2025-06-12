import { json } from "@sveltejs/kit";
import { db } from "./db";
import { getPostCounts } from "./sql.queries";
import { Count } from "./types";
import type { UUID } from "crypto";

const defaultCounts = { view: 0, like: 0, share: 0, comment: 0 };

export async function getPostData($post_id: UUID) {
  const interactions = db.query(getPostCounts).as(Count).all({ $post_id });
  const result = Object.fromEntries(
    interactions.map(({ type, count }) => [type, count]),
  );
  return json({ ...defaultCounts, ...result });
}
