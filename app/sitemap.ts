import { NextResponse } from 'next/server';

export async function GET() {
  const pages = ['/'];
  const urls = pages.map(
    (page) => `<url><loc>https://questione.vercel.app/</loc></url>`
  );

  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join('\n')}
    </urlset>`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
}
