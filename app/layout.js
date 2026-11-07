export const metadata = {
  title: 'Stadtwerke Neubrücken',
  description: 'Verifizierungs- & Antragsportal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body style={{ margin: 0, padding: 0, background: '#0f172a', color: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
