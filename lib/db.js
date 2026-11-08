import { neon } from '@neondatabase/serverless';

let sqlClient;
let schemaPromise;

export function getDb() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL fehlt in den Vercel Environment Variables.');
  if (!sqlClient) sqlClient = neon(process.env.DATABASE_URL);
  return sqlClient;
}

export async function ensureSchema() {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const sql = getDb();
      await sql`CREATE TABLE IF NOT EXISTS app_sessions (
        token_hash TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        user_data JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        expires_at TIMESTAMPTZ NOT NULL,
        revoked_at TIMESTAMPTZ
      )`;
      await sql`CREATE INDEX IF NOT EXISTS app_sessions_user_idx ON app_sessions(user_id)`;
      await sql`CREATE TABLE IF NOT EXISTS app_blocked_users (
        user_id TEXT PRIMARY KEY,
        blocked_by TEXT NOT NULL,
        reason TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`;
      await sql`CREATE TABLE IF NOT EXISTS app_system_state (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        maintenance BOOLEAN NOT NULL DEFAULT FALSE,
        updated_by TEXT,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`;
      await sql`INSERT INTO app_system_state (id, maintenance) VALUES (1, FALSE) ON CONFLICT (id) DO NOTHING`;
      await sql`CREATE TABLE IF NOT EXISTS app_reports (
        id BIGSERIAL PRIMARY KEY,
        ort TEXT NOT NULL,
        details TEXT NOT NULL,
        verfasser TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`;
      await sql`CREATE TABLE IF NOT EXISTS app_orders (
        id BIGSERIAL PRIMARY KEY,
        titel TEXT NOT NULL,
        details TEXT NOT NULL,
        erstellt_von TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`;
      await sql`CREATE TABLE IF NOT EXISTS app_security_audit (
        id BIGSERIAL PRIMARY KEY,
        actor_id TEXT NOT NULL,
        action TEXT NOT NULL,
        target_id TEXT,
        details JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`;
    })().catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }
  return schemaPromise;
}

export async function writeAudit(actorId, action, targetId = null, details = {}) {
  await ensureSchema();
  const sql = getDb();
  await sql`INSERT INTO app_security_audit (actor_id, action, target_id, details)
    VALUES (${String(actorId)}, ${action}, ${targetId ? String(targetId) : null}, ${JSON.stringify(details)}::jsonb)`;
}
