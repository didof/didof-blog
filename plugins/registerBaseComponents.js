import Vue from 'vue'

import BaseCard from '~/components/card/BaseCard'
import BaseGrid from '~/components/layout/BaseGrid'
import LowHighImage from '~/components/image/LowHighImage'
import DeferredImage from '~/components/image/DeferredImage'

const components = { BaseCard, BaseGrid, LowHighImage, DeferredImage }

Object.entries(components).forEach(([name, component]) => {
	Vue.component(name, component)
})
