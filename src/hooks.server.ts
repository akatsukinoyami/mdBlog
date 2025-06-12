import { sql } from "$lib/db";
import type { ServerInit } from "@sveltejs/kit";

export const init: ServerInit = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS public.interactions (
      post_id TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      type TEXT NOT NULL CHECK (type IN ('like', 'view', 'share')),
      ip_addr TEXT,
      PRIMARY KEY (created_at, post_id, type)
    );
  `;
};
