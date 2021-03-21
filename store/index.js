import { Store } from 'vuex'
import guest from '~/store/guest'
import notification from '~/store/notification'

const createStore = () =>
	new Store({
		modules: { guest, notification },
	})

export default createStore
