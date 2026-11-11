import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { canAccessEntstoerung, canManageEntstoerung } from '../mitarbeiter/utils/checkPermissions';
import { getUserFromSession } from '../../lib/auth';
import ClientEntstoerung from './ClientEntstoerung';

export default async function EntstoerungsdienstPage() {
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


  if (!canAccessEntstoerung(user)) {
    redirect('/unauthorized');
  }

  const isManagementOrLeader = canManageEntstoerung(user);

  return <ClientEntstoerung user={user} isManagementOrLeader={isManagementOrLeader} />;
}
