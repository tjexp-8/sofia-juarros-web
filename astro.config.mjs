// Configuración de Astro.
import { defineConfig } from 'astro/config';

export default defineConfig({
  // La dirección pública de la web. Se usa para crear enlaces completos
  // (la tarjeta de WhatsApp, el mapa del sitio para Google...).
  // ⚠️ Si cambiás el nombre en Netlify o comprás un dominio, actualizalo acá.
  site: 'https://sofiajuarrosstudio.netlify.app',

  build: {
    // Mete el CSS dentro de cada página en vez de en un archivo aparte:
    // el navegador puede pintar la web sin esperar una descarga extra.
    inlineStylesheets: 'always',
  },
});
