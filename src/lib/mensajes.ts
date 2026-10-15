export function parseMensajes(body: string | undefined): string[] {
	if (!body) return [];
	return body
		.split(/\n\s*\n/)
		.map((mensaje) => mensaje.trim())
		.filter(Boolean);
}

export function whatsappUrl(mensaje: string): string {
	return `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
}

export function ordenar<T extends { data: { orden: number } }>(items: T[]): T[] {
	return [...items].sort((a, b) => a.data.orden - b.data.orden);
}