import { ensureSchema, getDb } from './db';

export async function getMaintenanceState() {
  try {
    await ensureSchema();
    const sql = getDb();
    const rows = await sql`SELECT maintenance FROM app_system_state WHERE id = 1 LIMIT 1`;
    return Boolean(rows[0]?.maintenance);
  } catch (error) {
 .
    console.error('Notfallstatus konnte nicht gelesen werden:', error.message);
    return true;
  }
}
