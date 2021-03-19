export const reverse = original => {
	const output = []
	for (let i = original.length - 1; i >= 0; i--) {
		const element = original[i]
		output.push(element)
	}
	return output
}
