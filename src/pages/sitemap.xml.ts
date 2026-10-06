/* =========================================================
   sitemap.xml.ts — el "mapa del sitio" para Google.
   No es una página para personas: es una lista de todas las
   direcciones de la web, para que Google las encuentre todas.
   Se genera solo, así que cada obra nueva aparece automáticamente.
   ========================================================= */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const obras = await getCollection('obras');

  // Con barra final, igual que la dirección "oficial" (canonical) de cada página
  const paginas = [
    '/',
    '/encargos/',
    '/sobre-mi/',
    '/contacto/',
    ...obras.map((obra) => `/obras/${obra.id}/`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginas.map((ruta) => `  <url><loc>${new URL(ruta, site)}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
