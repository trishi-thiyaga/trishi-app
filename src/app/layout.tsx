import './globals.css';
import { AppProvider } from '@/lib/context/AppContext';

export const metadata = {
  title: 'Young Dream Innovators — Student Maker & Innovation Platform',
  description:
    'A platform connecting young scientists and student makers for physical prototype building, idea grooming, sponsorship escrow, and creator skill growth.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
