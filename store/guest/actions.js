import SavedReading from '~/entities/blog/SavedReading'
import { isInstanceOf } from '~/utils/guards'

export default {
	rename(context, payload) {
		context.commit('rename', payload)
	},
	hasRenamed(context) {
		context.commit('hasRenamed')
	},
	saveReading({ state, commit }, payload) {
		if (!isInstanceOf(payload, SavedReading)) return

		const foundIndex = state.savedReadings.findIndex(savedReading => {
			return savedReading.slug === payload.slug
		})

		if (Boolean(~foundIndex)) commit('removeReading', foundIndex)
		else commit('saveReading', payload)
	},
	updateSavedReadingsOrder({ commit }, payload) {
		commit('updateSavedReadingsOrder', payload)
	},
}
