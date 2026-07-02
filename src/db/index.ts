import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type Database = NeonHttpDatabase<typeof schema>;

let db: Database | undefined;

// Lazy so the app can build before DATABASE_URL is configured.
export function getDb(): Database {
  db ??= drizzle(neon(process.env.DATABASE_URL!), { schema });
  return db;
}
