import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { canAccessFuehrung, isFullManagement } from '../mitarbeiter/utils/checkPermissions';
import { getUserFromSession } from '../../lib/auth';
import ClientFuehrung from './ClientFuehrung';

export default async function FuehrungsebenePage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('discord_user');

  if (!sessionCookie) {
    redirect('/unauthorized');
  }

  let user = null;
  try {
    user = await getUserFromSession(sessionCookie.value);
  } catch (err) {
    user = null;
  }

  if (!user) {
    redirect('/unauthorized');
  }

  // Strenger Server-Check für die Führungsebene
  if (!canAccessFuehrung(user)) {
    redirect('/unauthorized');
  }

  const hasFullRights = isFullManagement(user);

  return <ClientFuehrung user={user} hasFullRights={hasFullRights} />;
}
