import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const mensajes = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/mensajes' }),
	schema: z.object({
		titulo: z.string(),
		grupo: z.string(),
		grupoTitulo: z.string(),
		orden: z.number().int().default(0),
	}),
});

export const collections = { mensajes };