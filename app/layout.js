import './globals.css'; // WICHTIG: Ganz oben importieren!

export const metadata = {
  title: 'Stadtwerke Neubrücken',
  description: 'Verifizierungs- & Antragsportal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        {children}
      </body>
    </html>
  );
}
