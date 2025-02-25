import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Questione AI',
  description: 'Gere questões de forma automática com a IA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
