import { Store } from 'vuex'

import guest from '~/store/guest'

const createStore = () =>
	new Store({
		modules: { guest },
	})

export default createStore
