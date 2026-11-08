export function checkUserRole(user, allowedRoles = []) {
  if (!user || !user.roles) return false;
  return allowedRoles.some(roleId => user.roles.includes(roleId));
}

export const ROLES = {
  MITARBEITER: '1490309362365894707',
  FUEHRUNGSEBENE: '1490307659411357716',
  NEUBRUECKEN_LEITUNG: '1522887379030118450',
  PERSONAL_LEITUNG: '1522887100343517286',
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

// Zugriff auf die Führungsseite (Führung, Hauptleitung & Personalleitung)
export function canAccessFuehrung(user) {
  return checkUserRole(user, [
    ROLES.FUEHRUNGSEBENE, 
    ROLES.NEUBRUECKEN_LEITUNG, 
    ROLES.PERSONAL_LEITUNG
  ]);
}

// Volle Notfallrechte (Site offline nehmen, User abmelden etc.) 
// -> Neubrücken Hauptleitung (1522887379030118450) ist hier bewusst ausgeschlossen!
export function isFullManagement(user) {
  return checkUserRole(user, [
    ROLES.FUEHRUNGSEBENE,
    ROLES.PERSONAL_LEITUNG
  ]);
}
