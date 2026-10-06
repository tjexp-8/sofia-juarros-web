/* =========================================================
   menu.js — abre y cierra el menú en el móvil
   Se usa en TODAS las páginas (por eso está separado de main.js).
   ========================================================= */

(function () {
  const boton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu-movil');
  if (!boton || !menu) return;   // si la página no tiene menú, no hacemos nada

  // Una sola función para abrir (true) o cerrar (false)
  function cambiarMenu(abrir) {
    document.body.classList.toggle('menu-abierto', abrir);
    // aria-expanded le dice a los lectores de pantalla si el menú está abierto
    boton.setAttribute('aria-expanded', abrir);
    boton.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
  }

  // Clic en el botón ☰: si está abierto lo cierra, y al revés
  boton.addEventListener('click', () => {
    const estaAbierto = document.body.classList.contains('menu-abierto');
    cambiarMenu(!estaAbierto);
  });

  // Al elegir una opción, el menú se cierra
  menu.querySelectorAll('a').forEach((enlace) => {
    enlace.addEventListener('click', () => cambiarMenu(false));
  });

  // La tecla Escape también lo cierra
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cambiarMenu(false);
  });
})();

/* Cabecera con fondo al hacer scroll, para que se lea sobre fotos y textos */
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function revisarScroll() {
    header.classList.toggle('header-con-fondo', window.scrollY > 40);
  }

  window.addEventListener('scroll', revisarScroll, { passive: true });
  revisarScroll();
})();
