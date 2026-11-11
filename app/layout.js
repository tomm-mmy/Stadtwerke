import { cookies } from 'next/headers';
import Navbar from './components/Navbar';
import { getUserFromSession } from '@/lib/auth'; // oder wie deine Session-Funktion heißt

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('discord_user');
  
  let user = null;
  if (sessionCookie) {
    // Hier wird der User aus der Session geholt
    user = await getUserFromSession(sessionCookie.value).catch(() => null);
  }

  return (
    <html lang="de">
      <body>
        <Navbar user={user} />
        {children}
      </body>
    </html>
  );
}
