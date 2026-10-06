/* =========================================================
   lupa.js — un círculo de aumento sobre la obra en cada ficha.
   Idea: la lupa es un círculo cuyo FONDO es la misma foto,
   pero mucho más grande. Movemos ese fondo para que, dentro
   del círculo, se vea ampliada justo la zona bajo el ratón.
   ========================================================= */

(function () {
  const contenedor = document.querySelector('.ficha-imagen[data-zoom]');
  // Solo en dispositivos con ratón (en el móvil no hay "pasar por encima")
  if (!contenedor || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const imagen = contenedor.querySelector('img');
  const lupa = contenedor.querySelector('.lupa');
  const AUMENTO = 2.5;                         // cuántas veces se amplía

  contenedor.classList.add('con-lupa');        // el CSS muestra la ayuda y oculta el cursor
  lupa.style.backgroundImage = `url("${contenedor.dataset.zoom}")`;

  contenedor.addEventListener('mousemove', (e) => {
    const r = imagen.getBoundingClientRect();
    // Posición del ratón DENTRO de la imagen (en píxeles)
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    // Si el ratón sale de la imagen, escondemos la lupa
    const dentro = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
    lupa.classList.toggle('visible', dentro);
    if (!dentro) return;

    const radio = lupa.offsetWidth / 2;

    // La lupa se centra en el ratón
    lupa.style.left = `${x}px`;
    lupa.style.top = `${y}px`;

    // El fondo: la foto agrandada, desplazada para mostrar la zona del ratón
    lupa.style.backgroundSize = `${r.width * AUMENTO}px ${r.height * AUMENTO}px`;
    lupa.style.backgroundPosition = `${-(x * AUMENTO - radio)}px ${-(y * AUMENTO - radio)}px`;
  });

  contenedor.addEventListener('mouseleave', () => lupa.classList.remove('visible'));
})();
