import { cookies } from 'next/headers';
import Navbar from './components/Navbar';
import { getUserFromSession } from '../lib/auth';
import './globals.css';

export const metadata = {
  title: 'Stadtwerke Neubrücken',
  description: '24/7 Infrastruktur- & Versorgungsnetz Neubrücken',
  icons: {
    icon: '/iconn.png',
  },
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('discord_user');
  
  let user = null;
  if (sessionCookie) {
    try {
      user = await getUserFromSession(sessionCookie.value);
    } catch (e) {
      user = null;
    }
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
