import './globals.css';

export const metadata = {
  title: 'Virtual Hug',
  description: 'A soft place to land',
  icons: {
    icon: '/hug-icon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}