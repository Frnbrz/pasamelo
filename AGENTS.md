# AGENTS.md

## Project

Estática en Astro: rediseño de https://pasamelo.es. Mensajes cortos para copiar y compartir por WhatsApp, con buscador y filtros por categoría.

- `DESIGN.md` — design system exportado de v0. **Fuente de verdad visual.** Todo token, radio, espaciado y breakpoint sale de ahí.
- `rediseno-de-pasamelo/` — export de v0 (Next + Tailwind + shadcn) que originó el diseño. Es **solo referencia de lectura**: no se instala, no se compila y está excluido en `tsconfig.json`. La paleta, `.marker` y `.ruled-paper` están portadas a CSS plano en `src/styles/global.css`.

## Comandos

| Comando | Para qué |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build estático en `dist/` |
| `npm run preview` | Sirve `dist/` para revisar el build |
| `npm run check` | Typecheck (`astro check`) |
| `npm test` | Tests de navegador (filtros, búsqueda, copiar, targets) con Edge local |

`npm test` arranca `astro preview` si no hay servidor en el 4321, ejecuta `scripts/test-filtros.mjs` y lo cierra. Usa `playwright-core` con el Edge ya instalado en el sistema, sin descargar navegadores.

`node scripts/convert-messages.mjs` regenera `src/content/mensajes/*.md` desde `rediseno-de-pasamelo/lib/messages.ts`. Si editas mensajes, edita el `.md`, no el `.ts` de v0.

## Stack (elegido por el usuario)

Astro estático, CSS plano, sin frameworks de UI ni Tailwind. Dos familias tipográficas máximo (Bricolage Grotesque display, Figtree cuerpo) auto-alojadas con `@fontsource-variable`. JavaScript solo con `<script>` de Astro y manipulación del DOM; no hay isomorphic/hidratación.

## Contenido

- Colección `mensajes` definida en `src/content.config.ts` con loader `glob`. En Astro 7 el import es `astro/zod`, no `z` de `astro:content`.
- Un `.md` por categoría; el nombre del archivo es el slug (`aniversario.md` → `/mensajes/aniversario/`).
- Frontmatter: `titulo`, `grupo`, `grupoTitulo`, `orden`. El cuerpo son los mensajes separados por líneas en blanco (`parseMensajes` en `src/lib/mensajes.ts`).
- Toda la UI y el contenido están en español.

## Alcance de la v1

Solo mensajes. **No** están las calculadoras de salud de v0 (`health-section`, `bmi-calculator`): quedan enlazadas al sitio antiguo. No hay git ni despliegue configurado todavía.

## Gotchas

- `DESIGN.md` de v0 y lo que dice este archivo pueden entrar en conflicto: al visualizar, manda el código de `rediseno-de-pasamelo/`, que es lo que implementamos.
- En scripts de componente, TypeScript no estrecha `querySelector` dentro de closures: captura el elemento en una `const` local antes de usarlo.
- `global.css` fuerza `[hidden] { display: none !important; }`: los componentes fijan `display` en sus clases, lo que anula el `display: none` que el navegador aplica a `[hidden]`. Sin eso, filtrar por `hidden` no oculta nada.
- Al filtrar por texto, busca solo en `.card__label` y `.card__text`; usar `textContent` haría que "copiar" coincidiera con todos los mensajes.
- Al cambiar tokens, editar `src/styles/global.css`; los componentes de v0 usan clases utilitarias de Tailwind que aquí están traducidas a CSS con scope de Astro.