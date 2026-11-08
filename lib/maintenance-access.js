import { canAccessFuehrung } from '../app/mitarbeiter/utils/checkPermissions';
import { getMaintenanceState } from './system-state';

export async function isOperationalAccessAllowed(user) {
  const maintenance = await getMaintenanceState();
  return !maintenance || canAccessFuehrung(user);
}
