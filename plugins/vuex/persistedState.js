import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
	createPersistedState({
		paths: ['guest.hasRenamed', 'guest.name'],
		getState: key => localStorage.getItem(key),
		setState: (key, state) => localStorage.setItem(key, state),
	})(store)
}
