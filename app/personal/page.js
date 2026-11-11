import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserFromSession } from '../../lib/auth';
import ClientPersonal from './ClientPersonal';

export default async function PersonalPage() {
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

  if (!user || !user.roles) {
    redirect('/unauthorized');
  }


  const allowedRoles = [
    '1490308727797059625', 
    '1490309261878624450', 
    '1490307659411357716',
    '1522887379030118450'  
  ];

  const hasAccess = allowedRoles.some(roleId => user.roles.includes(roleId));
  if (!hasAccess) {
    redirect('/unauthorized');
  }


  const fullManagementRoles = ['1490308727797059625', '1490307659411357716', '1522887379030118450'];
  const hasFullRights = fullManagementRoles.some(roleId => user.roles.includes(roleId));

  return <ClientPersonal user={user} hasFullRights={hasFullRights} />;
}
