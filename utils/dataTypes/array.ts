export const splitInChunks = (original: any[], chunkLength: number): any[] => {
	const copy = [...original]
	const chunks = []

	while (copy.length) {
		chunks.push(copy.splice(0, chunkLength))
	}

	return chunks
}
