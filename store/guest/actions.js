import SavedReading from '~/entities/blog/SavedReading'
import { isInstanceOf } from '~/utils/guards'

const findReadingIndexBySlug = (savedReadings, slug) => {
	return savedReadings.findIndex(savedReading => {
		return savedReading.slug === slug
	})
}

export default {
	rename(context, payload) {
		context.commit('rename', payload)
	},
	hasRenamed(context) {
		context.commit('hasRenamed')
	},
	saveReading({ state, commit }, payload) {
		if (!isInstanceOf(payload, SavedReading)) return

		const foundIndex = findReadingIndexBySlug(state.savedReadings, payload.slug)

		if (Boolean(~foundIndex)) commit('removeReading', foundIndex)
		else commit('saveReading', payload)
	},
	updateSavedReadingsOrder({ commit }, payload) {
		commit('updateSavedReadingsOrder', payload)
	},
	removeReading({ state, commit }, payload) {
		const foundIndex = findReadingIndexBySlug(state.savedReadings, payload)
		if (Boolean(~foundIndex)) commit('removeReading', foundIndex)
	},
}
