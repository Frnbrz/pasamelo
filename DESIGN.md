# Design system — pásamelo.es

## Dirección visual

pásamelo.es es una herramienta cercana para encontrar, copiar y compartir mensajes. La interfaz debe sentirse clara, rápida y ligera: personalidad expresiva sin ruido visual.

- **Estilo:** moderno, limpio, humano y práctico.
- **Composición:** mobile-first, contenido centrado y jerarquía vertical clara.
- **Densidad:** generosa; priorizar lectura, descubrimiento y acciones.
- **Personalidad:** titulares llamativos, detalles amarillos y azul eléctrico como acentos.

## Paleta

| Token | Uso | Valor |
| --- | --- | --- |
| `--navy` | Texto principal, cabecera, bloques de alto contraste | `#101c3d` |
| `--electric-blue` | CTA principal, enlaces y foco | `#2457ff` |
| `--yellow` | Acentos, etiquetas destacadas y detalles de marca | `#ffd84d` |
| `--surface` | Fondo general | `#f7f9fc` |
| `--card` | Tarjetas y controles | `#ffffff` |
| `--muted` | Texto secundario y bordes suaves | `#64708a` |

Usar azul oscuro para contraste y estructura, azul eléctrico para acciones principales y amarillo con moderación. El amarillo no debe utilizarse como color de texto sobre blanco.

## Tipografía

- **Titulares:** tipografía expresiva de la marca, con peso alto y ritmo compacto.
- **Interfaz y cuerpo:** tipografía sans-serif legible, con tamaño base de `16px`.
- **Tarjetas:** `15–16px` en escritorio y móvil, `line-height: 1.55` como mínimo.
- **Etiquetas:** nunca menores de `12px`; preferir `13–14px` cuando aporten contexto.
- Mantener como máximo dos familias tipográficas.

## Layout y espaciado

- Contenedor principal fluido con `padding-inline` de `16px` en móvil y hasta `32px` en escritorio.
- Ancho de lectura recomendado: `720–820px`.
- Usar Flexbox para agrupaciones y Grid para la cuadrícula de mensajes.
- Escala de espacio basada en múltiplos de `4px`: `8`, `12`, `16`, `24`, `32`, `48`.
- Las tarjetas tienen altura flexible; nunca truncar mensajes importantes.
- En móvil, las categorías deben poder desplazarse horizontalmente sin romper el viewport.

## Componentes

### Cabecera

La marca tiene prioridad visual. La navegación debe ser breve y el CTA «Ver mensajes» debe ser la acción más evidente. En móvil, ocultar lo secundario antes que reducir el tamaño táctil.

### Hero

- Titular expresivo y fácil de escanear.
- Una explicación breve, no más de dos líneas en móvil.
- Buscador como control protagonista, con altura mínima de `48px`.
- Foco visible y etiqueta accesible para lectores de pantalla.

### Categorías

Las categorías funcionan como filtros, no como decoración. Deben tener estados `default`, `hover`, `focus-visible` y `active`, con áreas táctiles de al menos `44px` de alto.

### Tarjetas de mensajes

- Fondo claro, borde sutil y radio consistente.
- Mensaje como contenido principal; categoría y metadata como apoyo.
- Padding mínimo de `20px` en escritorio y `16px` en móvil.
- Separación suficiente entre tarjetas para evitar que parezcan un bloque único.
- Acciones agrupadas al final, siempre visibles y fáciles de alcanzar.

### Acciones

- **Primaria:** «Copiar» o «Ver mensajes», azul eléctrico con texto blanco.
- **Compartir:** «Pásalo por WhatsApp», con icono reconocible de conversación y destino claro.
- **Secundarias:** borde o superficie neutra, sin competir con la acción primaria.
- Altura mínima de botones: `44px`.
- Confirmaciones breves y no invasivas para copiar y compartir.

## Accesibilidad

- Contraste WCAG AA como mínimo para texto y controles.
- No comunicar estados únicamente mediante color.
- `:focus-visible` claro, con anillo azul eléctrico y suficiente separación.
- Iconos acompañados por texto en acciones importantes.
- Targets táctiles de al menos `44 × 44px`.
- Respetar `prefers-reduced-motion`; las microinteracciones deben ser sutiles.
- Mantener orden de lectura lógico en el DOM y etiquetas accesibles en controles.

## Motion

Usar transiciones cortas de `150–200ms` para hover, foco, filtros y confirmaciones. Preferir cambios de color, sombra y escala mínima; evitar desplazamientos grandes, rebotes o animaciones que distraigan de los mensajes.

## Responsive

### Móvil

Una columna, controles apilados, tarjetas cómodas de leer y categorías desplazables. El buscador ocupa todo el ancho disponible. Las acciones pueden ocupar el ancho completo cuando sea necesario.

### Escritorio

Cuadrícula de mensajes de dos o más columnas según el ancho disponible. Mantener una medida de lectura cómoda dentro de cada tarjeta y preservar espacios generosos alrededor del contenido.

## Principios de producto

1. Encontrar un mensaje debe ser inmediato.
2. Leer debe resultar cómodo incluso en móvil.
3. Copiar y compartir deben estar a un toque.
4. Cada pantalla debe tener una acción principal evidente.
5. Añadir personalidad no debe reducir claridad ni accesibilidad.

## No hacer

- No introducir gradientes, ilustraciones o adornos que compitan con los mensajes.
- No reducir el texto de las tarjetas para ganar densidad.
- No usar demasiados estilos de botón o colores de acento.
- No ocultar acciones esenciales tras menús secundarios.
- No cambiar la identidad visual azul, amarilla y clara de la marca.

## Checklist de revisión

- [ ] El CTA principal se identifica en menos de un segundo.
- [ ] El buscador tiene foco y tamaño táctil adecuados.
- [ ] El texto de las tarjetas se lee cómodamente a 15–16px.
- [ ] Las categorías son claras y accesibles en móvil.
- [ ] Copiar y WhatsApp tienen etiquetas e iconos comprensibles.
- [ ] Los estados hover y focus son visibles.
- [ ] No hay desbordamiento horizontal.
- [ ] El contraste cumple WCAG AA.
- [ ] La interfaz conserva una sensación ligera y profesional.
<!-- v0#design-system -->
<!-- Last updated: 2026-10-15 -->
<!-- Remove this comment if you want v0 to regenerate the design system -->
<!-- v0-design-system-version: 2 -->
<!-- v0-design-system-rules: Keep the visual identity, prioritize readability, accessible actions, and mobile-first layouts. -->
<!-- v0-design-system-references: Existing app components and globals.css -->
<!-- v0-design-system-end -->
