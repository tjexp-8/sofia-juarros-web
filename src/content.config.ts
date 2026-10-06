/* =========================================================
   content.config.ts — define qué datos tiene cada OBRA.
   Es como el formulario que hay que rellenar para cada cuadro.
   Si a un archivo de obra le falta un dato obligatorio,
   Astro avisa con un error en lugar de publicar una ficha rota.
   ========================================================= */

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const obras = defineCollection({
  // Cada archivo .md de src/content/obras es una obra
  loader: glob({ pattern: '**/*.md', base: './src/content/obras' }),

  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      serie: z.enum(['Gestos', 'Texturas', 'Oro']),
      tecnica: z.string(),
      imagen: image(),                 // ruta a la foto: Astro la optimiza sola
      alt: z.string(),                 // descripción de la foto (SEO y accesibilidad)
      anio: z.number().optional(),     // optional = puede faltar
      medidas: z.string().optional(),
      estado: z.enum(['por-encargo', 'disponible', 'vendida']).default('por-encargo'),
      orden: z.number().default(99),   // posición en la galería (1 = primera)
    }),
});

export const collections = { obras };
