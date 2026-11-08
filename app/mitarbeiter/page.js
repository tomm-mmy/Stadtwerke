import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { canAccessMitarbeiter } from './utils/checkPermissions';
import ClientMitarbeiter from './ClientMitarbeiter';

export default async function MitarbeiterPage() {
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

  if (!canAccessMitarbeiter(user)) {
    redirect('/unauthorized');
  }


  return <ClientMitarbeiter user={user} />;
}
