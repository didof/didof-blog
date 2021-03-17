import Vue from 'vue'

import BaseCard from '~/components/card/BaseCard'
import BaseGrid from '~/components/layout/BaseGrid'

const components = { BaseCard, BaseGrid }

Object.entries(components).forEach(([name, component]) => {
	Vue.component(name, component)
})
