import './globals.css';

export const metadata = {
  title: 'Young Dream Innovators — Official YouTube STEM & Maker Channel',
  description:
    'Official website for @YoungDreamInnovators. Watch hands-on STEM experiments, DIY electric drones, boats, and youth innovation projects.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
