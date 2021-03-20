export const isInstanceOf = (subject, type) => {
	if (subject instanceof type) return true
	console.warn(
		`[guard/instanceOf] You passed ${subject} but it is not an instaceof ${typeof type}`
	)
}
