# Web de Sofía Juarros — cómo funciona

Guía de estudio del proyecto. Léela con el proyecto abierto en VS Code.

## Cómo ver la web en tu ordenador

1. Abre la terminal de VS Code: **Terminal → New Terminal**
2. Escribe `npm run dev` y pulsa Enter
3. Abre en el navegador: **http://localhost:4321**
4. Mientras esté en marcha, cada cambio que guardes aparece solo en el navegador
5. Para apagarlo: haz clic en la terminal y pulsa **Ctrl + C**

## El mapa del proyecto

```
src/
├── config.ts             ← datos de Sofía (WhatsApp, Instagram...) en UN lugar
├── content.config.ts     ← qué datos tiene que tener cada obra
├── content/obras/        ← UNA obra = UN archivo .md   ★ lo que más vas a tocar
├── assets/               ← fotos (Astro las optimiza solas)
│   ├── obras/
│   └── sofia/
├── components/           ← piezas reutilizables
│   ├── Header.astro      ← cabecera + menú del móvil
│   ├── Footer.astro      ← pie de página
│   └── CtaFinal.astro    ← bloque negro de cierre
├── layouts/
│   └── Base.astro        ← el molde de todas las páginas (<head>, cabecera, pie, scripts)
├── pages/                ← cada archivo es una página de la web
│   ├── index.astro       → /
│   ├── encargos.astro    → /encargos
│   ├── contacto.astro    → /contacto
│   ├── sobre-mi.astro    → /sobre-mi
│   └── obras/[id].astro  → /obras/grieta-oro, /obras/circulo... (UNA plantilla para TODAS)
├── scripts/
│   ├── animaciones.js    ← GSAP, ScrollTrigger, Lenis
│   └── menu.js           ← menú del móvil y cabecera con fondo
└── styles/
    └── global.css        ← todo el diseño

prototipo/                ← la versión en HTML puro (para estudiar y comparar)
fotos-originales/         ← fotos tal como llegaron (no se publican)
```

## Cómo añadir una obra nueva (3 pasos)

1. Copia la foto en `src/assets/obras/` con nombre limpio: `nombre-de-la-obra.jpg`
2. Crea `src/content/obras/nombre-de-la-obra.md` copiando otro y cambiando los datos:

```md
---
titulo: Nombre de la obra
serie: Texturas            # Gestos, Texturas u Oro
tecnica: Textura en relieve
imagen: ../../assets/obras/nombre-de-la-obra.jpg
alt: Descripción de lo que se ve en la foto
anio: 2026                 # opcional
medidas: 100 × 140 cm      # opcional
estado: por-encargo        # por-encargo, disponible o vendida
orden: 10                  # posición en la galería
---

Texto sobre la obra.
```

3. Guarda. La obra aparece sola en la galería, en su serie, y con su propia ficha.

## Ideas clave para entender

- **Componente**: un trozo de web escrito una vez y usado en muchas páginas (`<Header />`).
- **Props**: los datos que se le pasan a un componente, como los atributos de una etiqueta HTML.
- **Layout**: el molde común; cada página pone su contenido donde está `<slot />`.
- **Colección**: una lista de contenidos del mismo tipo (las obras), con datos validados.
- **`{obras.map(...)}`**: "por cada obra de la lista, genera este HTML".
- **`[id].astro`**: los corchetes significan "esta parte cambia"; Astro crea una página por obra.
- **`npm run build`**: fabrica la web final en la carpeta `dist/`, que es lo que se publica.

## Pendiente con Sofía

- Títulos, técnicas, años y medidas reales de cada obra
- Bio y frase de "Sobre mí" (los textos actuales son provisionales)
- Precios, seña, plazos y tamaños de "Encargos"
- Fotos profesionales en alta calidad, retrato y primer plano de textura
- Email (si quiere mostrarlo)
