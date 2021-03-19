export default {
	rename(state, { payload }) {
		state.name = payload
	},
	hasRenamed(state) {
		state.hasRenamed = true
	},
}
