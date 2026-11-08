import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { canAccessFuehrung, isFullManagement } from '../mitarbeiter/utils/checkPermissions';
import ClientFuehrung from './ClientFuehrung';

export default async function FuehrungsebenePage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('discord_user');

  if (!userCookie) {
    redirect('/unauthorized');
  }

  let user;
  try {
    user = JSON.parse(userCookie.value);
  } catch (err) {
    redirect('/unauthorized');
  }

  // Strenger Check: Prüfen, ob der User in der globalen Blacklist (Blockiert) ist
  const blockedList = global.blockedUsers || [];
  if (blockedList.includes(user.id)) {
    redirect('/unauthorized');
  }

  if (!canAccessFuehrung(user)) {
    redirect('/unauthorized');
  }

  const hasFullRights = isFullManagement(user);

  return <ClientFuehrung user={user} hasFullRights={hasFullRights} />;
}
