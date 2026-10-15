/**
 * Convierte los datos de rediseno-de-pasamelo/lib/messages.ts a archivos
 * Markdown en src/content/mensajes/. Ejecutar con: node scripts/convert-messages.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const { groups } = await import('../rediseno-de-pasamelo/lib/messages.ts');

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const destino = join(raiz, 'src/content/mensajes');

const ORDEN_GRUPO = {
	navidad: 1,
	pesame: 2,
	pareja: 3,
	felicitaciones: 4,
	amistad: 5,
};

await mkdir(destino, { recursive: true });

let archivos = 0;
let mensajes = 0;

for (const grupo of groups) {
	for (const [indice, categoria] of grupo.categories.entries()) {
		const frontmatter = [
			'---',
			`titulo: ${categoria.name}`,
			`grupo: ${grupo.id}`,
			`grupoTitulo: ${grupo.name}`,
			`orden: ${ORDEN_GRUPO[grupo.id] * 100 + indice + 1}`,
			'---',
			'',
		].join('\n');

		const cuerpo = categoria.messages.join('\n\n');
		await writeFile(join(destino, `${categoria.id}.md`), `${frontmatter}${cuerpo}\n`, 'utf8');
		archivos += 1;
		mensajes += categoria.messages.length;
	}
}

console.log(`${archivos} categorías y ${mensajes} mensajes escritos en ${destino}`);