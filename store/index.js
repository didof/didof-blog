import { Store } from 'vuex'
import guest from '~/store/guest'
import blogNotification from '~/store/blogNotification'

const createStore = () =>
	new Store({
		modules: { guest, blogNotification },
	})

export default createStore
