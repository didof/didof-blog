export default {
	rename(context, payload) {
		context.commit('rename', payload)
	},
	hasRenamed(context) {
		context.commit('hasRenamed')
	},
}
