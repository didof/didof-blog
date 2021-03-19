export default {
	rename(state, { payload }) {
		state.name = payload
	},
	hasRenamed(state) {
		state.hasRenamed = true
	},
	saveReading(state, payload) {
		state.savedReadings.push(payload)
	},
	removeReading(state, payload) {
		state.savedReadings.splice(payload, 1)
	},
}
