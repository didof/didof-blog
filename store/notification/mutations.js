export default {
	show(state) {
		state.isVisible = true
	},
	hide(state) {
		state.isVisible = false
	},
	setDismissability(state, payload) {
		state.isDismissable = payload
	},
	setVariant(state, payload) {
		state.variant = payload
	},
	setContent(state, payload) {
		state.content = payload
	},
}
