// Seed player profiles: pnpm seed "Name One" "Name Two" ...
// Existing names are skipped, so it's safe to rerun when adding a player.
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config({ path: ".env.local", quiet: true });

const names = process.argv.slice(2).map((n) => n.trim()).filter(Boolean);
if (names.length === 0) {
  console.error('Usage: pnpm seed "Name One" "Name Two" ...');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

for (const name of names) {
  const inserted = await sql`
    insert into profiles (name) values (${name})
    on conflict (name) do nothing
    returning id, name
  `;
  console.log(inserted.length ? `added: ${name}` : `already exists: ${name}`);
}

const all = await sql`select name from profiles order by id`;
console.log("players:", all.map((p) => p.name).join(", "));
