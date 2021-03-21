export default {
	isVisible(state) {
		return state.isVisible
	},
	isDismissable(state) {
		return state.isDismissable
	},
	variant(state) {
		return 'is-' + state.variant
	},
	content(state) {
		return state.content
	},
}
