import { getRandomInt } from '~/utils/randomInt'
import Vue from 'vue'

const states = {}

const getIdAndElement = path => {
	let elementId
	const element = path.find(parentElement => {
		const { dataset } = parentElement
		if (!dataset) return false
		const { directive } = dataset
		if (!directive) return false
		const [name, id] = directive.split(':')
		if (name === 'localized-hover') {
			elementId = id
			return true
		} else return false
	})
	return [elementId, element]
}

const getGridPosition = (offset, set) => {
	switch (true) {
		case offset < set[0]:
			return 0
		case offset < set[1]:
			return 1
		case offset < set[2]:
			return 2
	}
}

const localizedHover = event => {
	const { offsetX, offsetY } = event

	const [id, element] = getIdAndElement(event.path)

	const { columns, rows } = states[id]

	const gridPosition = []

	gridPosition[0] = getGridPosition(offsetX, columns)
	gridPosition[1] = getGridPosition(offsetY, rows)

	const rotation = {
		0: 15,
		1: 0,
		2: -15,
	}

	const rotateX = `rotateX(${rotation[gridPosition[1]]}deg)`
	const rotateY = `rotateY(${rotation[gridPosition[0]]}deg)`

	element.style.transform = `${rotateX} ${rotateY}`
}

const reset = event => {
	const [_, element] = getIdAndElement(event.path)
	element.style.transform = 'rotateX(0) rotateY(0)'
}

Vue.directive('localized-hover', {
	bind(el, _, vnode) {
		if (vnode.elm && vnode.elm.parentNode)
			vnode.elm.parentNode.style.perspective = 800

		const id = getRandomInt(0, 100)
		const { width, height } = el.getBoundingClientRect()
		el.setAttribute('data-directive', `localized-hover:${id}`)
		el.style.transition = 'all 0.3s ease-in-out 0.1s'
		el.style.transformStyle = 'preserve-3d'
		states[id] = {
			columns: [width / 3, (width / 3) * 2, width],
			rows: [height / 3, (height / 3) * 2, height],
		}

		el.addEventListener('mousemove', localizedHover)
		el.addEventListener('mouseleave', reset)
	},
	unbind(el) {
		el.removeAttribute('data-directive')
		el.removeEventListener('mousemove', localizedHover)
		el.addEventListener('mouseleave', reset)
	},
})
