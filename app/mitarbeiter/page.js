import { getCurrentUser } from '../../lib/auth';
import { redirect } from 'next/navigation';
import { canAccessMitarbeiter } from './utils/checkPermissions';
import ClientMitarbeiter from './ClientMitarbeiter';
import { getMaintenanceState } from '../../lib/system-state';
import NotfallLockout from '../components/NotfallLockout';
import { canAccessFuehrung } from './utils/checkPermissions';

export default async function MitarbeiterPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/unauthorized');

  if (await getMaintenanceState() && !canAccessFuehrung(user)) return <NotfallLockout />;

  if (!canAccessMitarbeiter(user)) {
    redirect('/unauthorized');
  }


  return <ClientMitarbeiter user={user} />;
}
