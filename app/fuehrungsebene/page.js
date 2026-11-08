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

  if (!canAccessFuehrung(user)) {
    redirect('/unauthorized');
  }


  const hasFullRights = isFullManagement(user);

  return <ClientFuehrung user={user} hasFullRights={hasFullRights} />;
}
