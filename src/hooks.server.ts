import { db } from '$lib/db.js';
import type { ServerInit } from '@sveltejs/kit';

export const init: ServerInit = async () => {
	db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE interactions (
      created_at DATETIME NOT NULL,
      post_id TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('like', 'view')),
      ip_hash TEXT,
      PRIMARY KEY (created_at, post_id, type)
    ) WITHOUT ROWID;
  `);
  console.log('Database initialized');
};
