export function checkUserRole(user, allowedRoles = []) {
  if (!user || !user.roles) return false;

  return allowedRoles.some(roleId => user.roles.includes(roleId));
}


export const ROLES = {
  FUEHRUNGSEBENE: '1490307659411357716', 
  PERSONAL: '1522887100343517286',
  MITARBEITER: '1490309362365894707',
};
