export function checkUserRole(user, allowedRoles = []) {
  if (!user || !user.roles) return false;
  return allowedRoles.some(roleId => user.roles.includes(roleId));
}

export const ROLES = {
  MITARBEITER: '1490309362365894707',
  FUEHRUNGSEBENE: '1490307659411357716',
  NEUBRUECKEN_LEITUNG: '1522887379030118450',
  PERSONAL_LEITUNG: '1490308727797059625',
  // Entstörungsdienst Rollen
  ENTSTOERUNG_HAUPT: '1523752429353701639',
  ENTSTOERUNG_LEITUNG_1: '1523751594087415848',
  ENTSTOERUNG_LEITUNG_2: '1523752119222403152',
  ENTSTOERUNG_EINSATZLEITER: '1523752308813598820',
};

export function canAccessMitarbeiter(user) {
  return checkUserRole(user, [
    ROLES.MITARBEITER, 
    ROLES.FUEHRUNGSEBENE, 
    ROLES.NEUBRUECKEN_LEITUNG, 
    ROLES.PERSONAL_LEITUNG,
    ROLES.ENTSTOERUNG_HAUPT
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

// Spezifische Checks für den Entstörungsdienst
export function canAccessEntstoerung(user) {
  return checkUserRole(user, [
    ROLES.FUEHRUNGSEBENE,
    ROLES.NEUBRUECKEN_LEITUNG,
    ROLES.ENTSTOERUNG_HAUPT,
    ROLES.ENTSTOERUNG_LEITUNG_1,
    ROLES.ENTSTOERUNG_LEITUNG_2,
    ROLES.ENTSTOERUNG_EINSATZLEITER
  ]);
}

export function canManageEntstoerung(user) {
  return checkUserRole(user, [
    ROLES.FUEHRUNGSEBENE,
    ROLES.NEUBRUECKEN_LEITUNG,
    ROLES.ENTSTOERUNG_LEITUNG_1,
    ROLES.ENTSTOERUNG_LEITUNG_2,
    ROLES.ENTSTOERUNG_EINSATZLEITER
  ]);
}
