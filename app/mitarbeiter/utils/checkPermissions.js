export function checkUserRole(user, allowedRoles = []) {
  if (!user || !user.roles) return false;
  return allowedRoles.some(roleId => user.roles.includes(roleId));
}

export const ROLES = {
  MITARBEITER: '1490309362365894707',
  FUEHRUNGSEBENE: '1490307659411357716',
  NEUBRUECKEN_LEITUNG: '1522887379030118450',
  PERSONAL_LEITUNG: '1490308727797059625',
};

export function canAccessMitarbeiter(user) {
  return checkUserRole(user, [
    ROLES.MITARBEITER, 
    ROLES.FUEHRUNGSEBENE, 
    ROLES.NEUBRUECKEN_LEITUNG, 
    ROLES.PERSONAL_LEITUNG
  ]);
}

export function canManageOperations(user) {
  return checkUserRole(user, [
    ROLES.FUEHRUNGSEBENE, 
    ROLES.NEUBRUECKEN_LEITUNG, 
    ROLES.PERSONAL_LEITUNG
  ]);
}


export function canAccessFuehrung(user) {
  return checkUserRole(user, [
    ROLES.FUEHRUNGSEBENE, 
    ROLES.NEUBRUECKEN_LEITUNG, 
    ROLES.PERSONAL_LEITUNG
  ]);
}


export function isFullManagement(user) {
  return checkUserRole(user, [
    ROLES.FUEHRUNGSEBENE,
    ROLES.PERSONAL_LEITUNG
  ]);
}
