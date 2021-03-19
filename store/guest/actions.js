export default {
	rename(context, payload) {
		context.commit('rename', payload)
	},
	hasRenamed(context) {
		context.commit('hasRenamed')
	},
	saveReading({ state, commit }, payload) {
		const index = state.savedReadings.indexOf(payload)
		if (Boolean(~index)) commit('removeReading', index)
		else commit('saveReading', payload)
	},
}
