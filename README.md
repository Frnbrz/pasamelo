# pasamelo.es

Rediseño estático de [pasamelo.es](https://pasamelo.es): mensajes cortos para copiar y compartir por WhatsApp.

## Stack

- [Astro](https://astro.build) con salida estática
- CSS plano; los tokens viven en `src/styles/global.css`
- Contenido en Markdown mediante content collections (`src/content/mensajes/`)

El sistema de diseño está en [`DESIGN.md`](./DESIGN.md) y el código original de v0 en `rediseno-de-pasamelo/`. Ambos son referencias de solo lectura.

## Comandos

| Comando           | Qué hace                                       |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321`     |
| `npm run build`   | Genera el sitio estático en `dist/`            |
| `npm run preview` | Sirve `dist/` localmente para revisar el build |
| `npm run check`   | Typecheck (`astro check`)                      |
| `npm test`        | Tests en navegador de filtros, buscador, copiar y targets táctiles |

Los tests usan el Edge ya instalado en el sistema (`playwright-core`), sin descargar navegadores. `npm test` levanta `astro preview` automáticamente y lo cierra al terminar.

## Añadir o editar mensajes

Cada categoría es un archivo Markdown en `src/content/mensajes/`. El nombre del archivo es el
identificador de la categoría. Cada bloque separado por una línea en blanco es un mensaje.

```md
---
titulo: Navidad
grupo: navidad
grupoTitulo: Navidad, Año Nuevo y Reyes
orden: 102
---

Esta Navidad no te deseo cosas, te deseo momentos: de los que se quedan para siempre.

Que la mesa esté llena, la casa caliente y el corazón tranquilo.
```

`grupo` y `grupoTitulo` definen en qué bloque aparece la categoría en la barra lateral. `orden`
controla el orden de aparición.

Para regenerar todos los archivos desde el export de v0:

```sh
node scripts/convert-messages.mjs
```