/* =========================================================
   config.ts — los datos de Sofía en UN SOLO LUGAR.
   Si cambia su WhatsApp o su Instagram, se cambia aquí y
   se actualiza en toda la web.
   ========================================================= */

export const SITE = {
  nombre: 'Sofía Juarros',
  descripcion: 'Obras abstractas por encargo de Sofía Juarros, artista visual en Buenos Aires.',
  ciudad: 'Buenos Aires, Argentina',
  whatsapp: '5491138207312',            // formato para enlaces: sin +, espacios ni guiones
  whatsappVisible: '+54 9 11 3820-7312', // formato para mostrar
  instagram: 'sofiartstudio__',
};

// Crea un enlace de WhatsApp con un mensaje ya escrito.
// encodeURIComponent convierte espacios y tildes en %20, %C3%AD... automáticamente.
export function enlaceWhatsApp(mensaje: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
