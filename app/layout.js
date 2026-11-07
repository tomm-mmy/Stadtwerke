import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Stadtwerke Neubrücken',
  description: 'Das Dashbaord  der Stadtwerke Neubrücken',
  icons: {
    icon: '/stadtwerkeneubrücken.webp',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
