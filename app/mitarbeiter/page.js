import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { canAccessMitarbeiter } from '@/utils/checkPermissions';
import ClientMitarbeiter from './ClientMitarbeiter';

export default async function MitarbeiterPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('discord_user');

  // 1. Prüfen, ob überhaupt ein Login-Cookie existiert
  if (!userCookie) {
    redirect('/unauthorized');
  }

  let user;
  try {
    user = JSON.parse(userCookie.value);
  } catch (err) {
    redirect('/unauthorized');
  }

  // 2. Prüfen, ob der Nutzer die nötigen Mitarbeiter-Rollen besitzt
  if (!canAccessMitarbeiter(user)) {
    redirect('/unauthorized');
  }

  // 3. Wenn alles passt, die Client-Komponente mit den User-Daten rendern
  return <ClientMitarbeiter user={user} />;
}
