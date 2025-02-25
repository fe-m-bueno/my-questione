import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Questione AI',
  description: 'Gere questões de forma automática com a IA',
  keywords: 'questões, professores, ensino, educação, gerador de perguntas',
  openGraph: {
    title: 'Gerador de Questões para Professores',
    description:
      'Crie questões personalizadas para Ensino Fundamental, Médio e Superior com inteligência artificial.',
    url: 'https://questione.vercel.app',
    siteName: 'Questione AI',
    images: [
      {
        url: 'https://questione.vercel.app/questione-preview.webp',
        width: 1200,
        height: 630,
        alt: 'Banner do Gerador de Questões',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gerador de Questões para Professores',
    description:
      'Crie questões personalizadas para Ensino Fundamental, Médio e Superior com inteligência artificial.',
    images: ['https://questione.vercel.app/questione-preview.webp'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
