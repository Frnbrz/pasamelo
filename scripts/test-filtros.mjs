import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const url = process.argv[2] ?? 'http://localhost:4321/';

// Si no hay servidor levantado, arranca `astro preview` para la duración del test.
let servidor = null;
try {
	await fetch(url, { signal: AbortSignal.timeout(1500) });
} catch {
	servidor = spawn('npx', ['astro', 'preview', '--port', '4321'], { stdio: 'ignore', shell: true });
	await new Promise((r) => setTimeout(r, 4000));
}

function cerrar() {
	if (servidor) servidor.kill();
}
process.on('exit', cerrar);
process.on('SIGINT', () => {
	cerrar();
	process.exit(130);
});

const navegador = await chromium.launch({ executablePath: EDGE });
const pagina = await navegador.newPage({ viewport: { width: 1280, height: 900 } });

const errores = [];
pagina.on('pageerror', (e) => errores.push(String(e)));
pagina.on('console', (m) => {
	if (m.type() === 'error') errores.push(m.text());
});

await pagina.goto(url, { waitUntil: 'networkidle' });

const visibles = () => pagina.$$eval('.card', (n) => n.filter((c) => !c.hasAttribute('hidden')).length);
const total = await pagina.$$eval('.card', (n) => n.length);
const conteo = () => pagina.textContent('[data-conteo]');
const ocultasVisibles = () =>
	pagina.$$eval('.card', (n) =>
		n.filter((c) => !c.hasAttribute('hidden') && getComputedStyle(c).display === 'none').length,
	);

const resultados = [];
function comprobar(nombre, ok, detalle) {
	resultados.push({ nombre, ok, detalle });
	console.log(`${ok ? 'OK   ' : 'FALLO'} ${nombre}${detalle ? ` (${detalle})` : ''}`);
}

// Estado inicial
comprobar('Inicial: 45 tarjetas', total === 45, `total=${total}`);
comprobar('Inicial: contadorVisible', (await conteo()).trim().startsWith('45 mensajes'), (await conteo()).trim());

// Filtro por categoría
await pagina.click('[data-categoria="amor"]');
await pagina.waitForTimeout(150);
const trasAmor = await visibles();
comprobar('Filtro Amor oculta tarjetas', trasAmor === 2, `visibles=${trasAmor}`);
comprobar('Filtro Amor: contador', (await conteo()).includes('de San Valentín'), (await conteo()).trim());
comprobar(
	'Filtro Amor: aria-pressed',
	(await pagina.getAttribute('[data-categoria="amor"]', 'aria-pressed')) === 'true' &&
		(await pagina.getAttribute('[data-categoria=""]', 'aria-pressed')) === 'false',
	'',
);
comprobar('Filtro Amor: visible de verdad', (await ocultasVisibles()) === 0, 'ninguna debe quedar oculta por CSS');

// Búsqueda
await pagina.click('[data-categoria=""]');
await pagina.fill('[data-buscar]', 'navidad');
await pagina.waitForTimeout(150);
const trasBusqueda = await visibles();
comprobar('Búsqueda filtra', trasBusqueda > 0 && trasBusqueda < 45, `visibles=${trasBusqueda}`);

// Búsqueda sin acentos
await pagina.fill('[data-buscar]', 'ANIMO');
await pagina.waitForTimeout(150);
const sinAcentos = await visibles();
comprobar('Búsqueda ignora acentos y mayúsculas', sinAcentos === 3, `visibles=${sinAcentos}`);

// Búsqueda sin resultados
await pagina.fill('[data-buscar]', 'zzzz');
await pagina.waitForTimeout(150);
comprobar('Sin resultados muestra estado vacío', await pagina.isVisible('[data-vacio]'), '');
comprobar('Sin resultados oculta tarjetas', (await visibles()) === 0, '');

// Unir categoría + búsqueda
await pagina.fill('[data-buscar]', '');
await pagina.click('[data-categoria="nuevo"]');
await pagina.waitForTimeout(150);
comprobar('Año Nuevo tiene 3 mensajes', (await visibles()) === 3, `visibles=${await visibles()}`);

// Sorpréndeme
await pagina.click('[data-categoria=""]');
await pagina.waitForTimeout(100);
await pagina.click('[data-sorprendeme]');
await pagina.waitForTimeout(300);
comprobar('Sorpréndeme resalta una tarjeta', (await pagina.$$('[data-destacada]')).length === 1, '');
comprobar(
	'Sorpréndeme no oculta nada',
	(await visibles()) === 45,
	`visibles=${await visibles()}`,
);

// Copiar
await pagina.context().grantPermissions(['clipboard-read', 'clipboard-write']);
await pagina.click('[data-copy]');
await pagina.waitForTimeout(200);
comprobar(
	'Copiar cambia la etiqueta',
	(await pagina.textContent('[data-copy] [data-copy-label]')).trim() === 'Copiado',
	await pagina.textContent('[data-copy] [data-copy-label]'),
);

// Accesibilidad de targets
const targetsChicos = await pagina.$$eval(
	'.actions__copy, .actions__share, .chip, .surprise, .header__nav a',
	(n) =>
		n.filter((el) => {
			const r = el.getBoundingClientRect();
			return r.height > 0 && r.height < 44;
		}).length,
);
comprobar('Todos los controles miden 44px o más', targetsChicos === 0, `pequeños=${targetsChicos}`);

// Desbordamiento horizontal en móvil
await pagina.setViewportSize({ width: 320, height: 800 });
await pagina.waitForTimeout(200);
const desborde = await pagina.evaluate(
	() => document.documentElement.scrollWidth - document.documentElement.clientWidth,
);
comprobar('Sin desbordamiento horizontal a 320px', desborde <= 0, `desborde=${desborde}px`);

comprobar('Sin errores de consola', errores.length === 0, errores.join(' | '));

await navegador.close();

let fallos = 0;
for (const r of resultados) {
	if (!r.ok) fallos += 1;
}
console.log(`\n${resultados.length - fallos}/${resultados.length} comprobaciones correctas`);
process.exit(fallos === 0 ? 0 : 1);