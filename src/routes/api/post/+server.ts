import { error, json } from "@sveltejs/kit";
import { db } from "$lib/db";

class Post {
  type: string;
  count: number;
}

function getFromParams(url: URL, key: string): string {
  const value = url.searchParams.get(key);

  if (!value) {
    throw error(422, `Missing ${key}`);
  }

  return value;
}

export async function GET({ url }) {
  const postId = getFromParams(url, 'post_id');
  const call = db.query(`
    SELECT type, COUNT(*) as count 
    FROM post_interactions 
    WHERE post_id = ? 
    GROUP BY type
  `).as(Post);

  return json(call.all(postId))
}

export async function POST({ url }) {
  const postId = getFromParams(url, 'post_id');
  const type = getFromParams(url, 'type');
  if (!['like', 'view'].includes(type)) {
    throw error(422, `Type should be one of 'like', 'view'`);
  }

  return json({ message: "ara-ara~" });
}