import type {DB} from "./db";

// Creation of tables - using SQL syntax
export const createTables = (db: DB) => {
   db.exec(`
CREATE TABLE IF NOT EXISTS students (
   id TEXT PRIMARY KEY,
   name TEXT NOT NULL,
   created_at TEXT NOT NULL,
   updated_at TEXT NOT NULL
);
`)
}