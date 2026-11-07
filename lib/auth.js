import { cookies } from 'next/headers';

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('discord_user');
  
  if (!userCookie) return null;

  try {
    const rawValue = userCookie.value;
    const decodedValue = rawValue.includes('%') ? decodeURIComponent(rawValue) : rawValue;
    return JSON.parse(decodedValue);
  } catch (e) {
    console.error('Fehler beim Auslesen des User-Cookies:', e);
    return null;
  }
}

export async function hasRole(roleId) {
  const user = await getCurrentUser();
  if (!user || !user.roles) return false;
  return user.roles.includes(roleId);
}
