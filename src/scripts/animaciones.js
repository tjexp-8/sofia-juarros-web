/* =========================================================
   animaciones.js — las animaciones de la web de Sofía
   Usamos tres herramientas, instaladas con npm:
   - GSAP: mueve, agranda y hace aparecer elementos.
   - ScrollTrigger (plugin de GSAP): conecta esas animaciones con el scroll.
   - Lenis: hace que el scroll se sienta suave, "de seda".
   ========================================================= */

// "import" trae el código de las librerías desde node_modules.
// Astro las empaqueta junto con nuestra web: ya no dependemos de otro servidor.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

(function () {
  // 1. ¿PODEMOS ANIMAR?
  // Si alguien tiene activado "reducir movimiento" en su dispositivo,
  // no animamos nada. La página se ve igual de bien, solo que quieta.
  const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducirMovimiento) return;

  // Avisamos al CSS de que hay animaciones (activa las reglas ".anim ...")
  document.documentElement.classList.add('anim');
  gsap.registerPlugin(ScrollTrigger);

  // 2. SCROLL SUAVE (Lenis)
  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);        // ScrollTrigger se entera de cada movimiento
  gsap.ticker.add((tiempo) => lenis.raf(tiempo * 1000));
  gsap.ticker.lagSmoothing(0);

  // "Volver arriba" con el mismo deslizamiento suave
  document.querySelectorAll('.footer-arriba').forEach((enlace) => {
    enlace.addEventListener('click', (e) => {
      e.preventDefault();               // evita el salto brusco normal del enlace "#"
      lenis.scrollTo(0, { duration: 2 });
    });
  });

  // 3. CABECERA CLARA SOBRE FONDOS OSCUROS
  const header = document.querySelector('.site-header');
  let portadaOscura = Boolean(document.querySelector('.hero')); // solo la portada empieza oscura
  let texturasVisibles = false;

  function actualizarCabecera() {
    header.classList.toggle('header-claro', portadaOscura || texturasVisibles);
  }

  // 4. PORTADA: del primer plano de la textura a la obra completa
  const hero = document.querySelector('.hero');
  const heroImg = document.querySelector('.hero-img');

  if (hero && heroImg) {
    // Punto de la obra donde está la grieta dorada (70% a la derecha, 45% hacia abajo).
    // Desde ahí hacemos el "zoom".
    const origenX = 0.70;
    const origenY = 0.45;

    // Calculamos cuánto hay que agrandar la imagen para que llene la pantalla.
    // (Limitado a 4.5 para que no se pixele demasiado.)
    // La medimos SIN agrandar (el CSS ya la muestra ampliada): quitamos la escala un instante.
    // Como todo pasa en el mismo momento, el navegador no llega a pintar ese cambio.
    heroImg.style.transform = 'none';
    const r = heroImg.getBoundingClientRect();
    const puntoX = r.left + r.width * origenX;
    const puntoY = r.top + r.height * origenY;
    const escalaInicial = Math.min(4.5, 1.05 * Math.max(
      puntoX / (r.width * origenX),
      (window.innerWidth - puntoX) / (r.width * (1 - origenX)),
      puntoY / (r.height * origenY),
      (window.innerHeight - puntoY) / (r.height * (1 - origenY))
    ));

    // Estado INICIAL: imagen enorme, fondo negro, texto final escondido
    gsap.set(heroImg, { transformOrigin: `${origenX * 100}% ${origenY * 100}%`, scale: escalaInicial, visibility: 'visible' });
    gsap.set('.hero-bg', { opacity: 1 });
    gsap.set('.hero-content', { autoAlpha: 0, y: 30 });
    actualizarCabecera();

    // Entrada al cargar: el nombre sube y aparece, la obra se "asienta"
    gsap.from('.hero-line', { yPercent: 60, autoAlpha: 0, duration: 1.4, ease: 'power3.out', stagger: 0.15, delay: 0.2 });
    gsap.from('.hero-frame', { scale: 1.15, duration: 2.4, ease: 'power2.out' });
    gsap.from('.hero-hint', { autoAlpha: 0, duration: 1, delay: 1.2 });

    // La animación ligada al scroll. Una "timeline" es una secuencia de animaciones;
    // el número del final de cada línea dice en qué momento empieza (0 = al principio).
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',     // empieza cuando la portada toca el borde superior
        end: '+=150%',        // dura 1,5 pantallas de scroll
        pin: true,            // la portada se queda "clavada" mientras se anima
        scrub: 1,             // la animación sigue al scroll (con 1s de suavidad)
        onUpdate: (self) => {
          portadaOscura = self.progress < 0.6;
          actualizarCabecera();
        }
      }
    });

    tl.to('.hero-title', { autoAlpha: 0, scale: 0.85, duration: 0.4 }, 0)
      .to('.hero-hint', { autoAlpha: 0, duration: 0.1 }, 0)
      .to(heroImg, { scale: 1, ease: 'none', duration: 1 }, 0)
      .to('.hero-bg', { opacity: 0, duration: 0.5 }, 0.4)
      .to('.hero-content', { autoAlpha: 1, y: 0, duration: 0.3 }, 0.75);
  }

  // 5. SERIE TEXTURAS: el scroll vertical mueve la fila de obras hacia la izquierda
  const horizontal = document.querySelector('.horizontal');
  const track = document.querySelector('.horizontal-track');

  if (horizontal && track) {
    // Distancia a recorrer = ancho total de la fila − ancho de la pantalla
    const distancia = () => track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: () => -distancia(),
      ease: 'none',
      scrollTrigger: {
        trigger: horizontal,
        start: 'top top',
        end: () => '+=' + distancia(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,   // recalcula si cambia el tamaño de la ventana
        onToggle: (self) => {
          texturasVisibles = self.isActive;
          actualizarCabecera();
        }
      }
    });
  }

  // 6. GALERÍA: cada obra sube y aparece cuando entra en pantalla...
  gsap.utils.toArray('.obra').forEach((obra) => {
    gsap.from(obra, {
      y: 80,
      autoAlpha: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: obra, start: 'top 92%' }
    });

    // ...y además se mueve a SU propia velocidad mientras hacés scroll (parallax).
    // data-velocidad positivo = sube más rápido; negativo = más lento.
    const velocidad = Number(obra.dataset.velocidad || 0);
    if (velocidad) {
      gsap.to(obra, {
        yPercent: -velocidad * 2,
        ease: 'none',
        scrollTrigger: { trigger: obra, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }
  });

  // 6-bis. MANIFIESTO: las palabras se "encienden" una a una con el scroll
  document.querySelectorAll('[data-palabras]').forEach((texto) => {
    // Partimos el texto en palabras y envolvemos cada una en un <span>
    const palabras = texto.textContent.trim().split(/\s+/);
    texto.innerHTML = palabras.map((p) => `<span class="palabra">${p}</span>`).join(' ');

    gsap.fromTo(
      texto.querySelectorAll('.palabra'),
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.1,          // cada palabra empieza un poquito después que la anterior
        ease: 'none',
        scrollTrigger: { trigger: texto, start: 'top 80%', end: 'bottom 45%', scrub: true }
      }
    );
  });

  // 6-ter. PIE: las letras del nombre gigante suben una a una
  const letras = document.querySelectorAll('.footer-letra');
  if (letras.length) {
    gsap.from(letras, {
      yPercent: 110,
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.04,
      scrollTrigger: { trigger: '.footer-nombre', start: 'top 95%' }
    });
  }

  // 6b. APARICIONES GENÉRICAS: sirven en cualquier página.
  // En el HTML basta con poner data-reveal (textos) o data-reveal="imagen" (fotos).
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    const disparador = { trigger: el, start: 'top 88%' };

    if (el.dataset.reveal === 'imagen') {
      // Efecto "telón": la foto se descubre de abajo hacia arriba
      gsap.from(el, {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.4,
        ease: 'power4.inOut',
        scrollTrigger: disparador
      });
      // ...y a la vez la imagen se "asienta" (empieza un poco agrandada)
      gsap.from(el.querySelector('img'), {
        scale: 1.25,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: disparador
      });
    } else {
      gsap.from(el, {
        y: 40,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: disparador
      });
    }
  });

  // 7. Cuando terminan de cargar todas las imágenes, recalculamos las medidas
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
