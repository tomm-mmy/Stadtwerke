
import { sql } from '@vercel/postgres';

export async function getMaintenanceMode() {
  try {
    const rows = await sql`
      SELECT maintenance
      FROM app_system_state
      WHERE id = 1
      LIMIT 1
    `;

    return Boolean(rows[0]?.maintenance);
  } catch (error) {
    console.error(
      'Notfallstatus konnte nicht gelesen werden:',
      error.message
    );


    return true;
  }
}
