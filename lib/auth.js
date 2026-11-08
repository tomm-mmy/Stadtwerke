import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createHash, randomBytes } from 'node:crypto';
import { ensureSchema, getDb, writeAudit } from './db';

export const SESSION_COOKIE = 'discord_user';
const SESSION_SECONDS = 60 * 60 * 24 * 7;

function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

export async function createUserSession(user) {
  if (!user?.id || !Array.isArray(user.roles)) throw new Error('Ungültige Discord-Benutzerdaten.');
  await ensureSchema();
  const token = randomBytes(32).toString('base64url');
  const sql = getDb();
  await sql`INSERT INTO app_sessions (token_hash, user_id, user_data, expires_at)
    VALUES (${hashToken(token)}, ${String(user.id)}, ${JSON.stringify(user)}::jsonb,
    NOW() + (${SESSION_SECONDS} * INTERVAL '1 second'))`;
  return token;
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token || token.length < 30) return null;
    await ensureSchema();
    const sql = getDb();
    const rows = await sql`
      SELECT s.user_data
      FROM app_sessions s
      LEFT JOIN app_blocked_users b ON b.user_id = s.user_id
      WHERE s.token_hash = ${hashToken(token)}
        AND s.revoked_at IS NULL AND s.expires_at > NOW()
        AND b.user_id IS NULL
      LIMIT 1`;
    if (!rows.length) return null;
    await sql`UPDATE app_sessions SET last_seen_at = NOW() WHERE token_hash = ${hashToken(token)}`;
    return rows[0].user_data;
  } catch (error) {
    console.error('Sitzungsprüfung fehlgeschlagen:', error.message);
    return null;
  }
}

export async function revokeCurrentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return;
  await ensureSchema();
  const sql = getDb();
  await sql`UPDATE app_sessions SET revoked_at = NOW() WHERE token_hash = ${hashToken(token)} AND revoked_at IS NULL`;
}

export async function hasRole(roleId) {
  const user = await getCurrentUser();
  return Boolean(user?.roles?.includes(roleId));
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) return { user: null, response: NextResponse.json({ success: false, error: 'Nicht angemeldet oder Sitzung abgelaufen.' }, { status: 401 }) };
  return { user, response: null };
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_SECONDS,
  };
}

export async function auditSafely(actorId, action, targetId = null, details = {}) {
  try { await writeAudit(actorId, action, targetId, details); }
  catch (error) { console.error('Audit-Protokoll konnte nicht geschrieben werden:', error.message); }
}
