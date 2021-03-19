export const setStyles = (element, indications) => {
	Object.entries(indications).forEach(([key, value]) => {
		element.style[key] = value
	})
}
