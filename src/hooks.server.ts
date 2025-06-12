import { db } from '$lib/db.js';
import type { ServerInit } from '@sveltejs/kit';

export const init: ServerInit = async () => {
	db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS interactions (
      post_id TEXT NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      type TEXT NOT NULL CHECK (type IN ('like', 'view', 'share')),
      ip_addr TEXT,
      PRIMARY KEY (created_at, post_id, type)
    ) WITHOUT ROWID;
  `);
  console.log('Database initialized');
};
