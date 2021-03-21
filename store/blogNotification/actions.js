const withCheckAllowedVariant = input => {
	switch (input) {
		case 'primary':
		case 'link':
		case 'info':
		case 'success':
		case 'warning':
		case 'danger':
			return input
		default:
			return 'info'
	}
}

export default {
	setVisibility({ commit }, payload = true) {
		if (payload) commit('show')
		else commit('hide')
	},
	setDismissability({ commit }, payload = true) {
		commit('setDismissability', payload)
	},
	setVariant({ commit }, payload) {
		commit('setVariant', withCheckAllowedVariant(payload))
	},
	reset({ dispatch }) {
		dispatch('setVisibility', false)
		dispatch('setDismissability', true)
		dispatch('setVariant', 'info')
	},
}
