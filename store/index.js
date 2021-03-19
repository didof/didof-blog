import { Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import guest from '~/store/guest'

const createStore = () =>
	new Store({
		modules: { guest },
	})

export default createStore
