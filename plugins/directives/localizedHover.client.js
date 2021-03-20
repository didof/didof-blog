import Vue from 'vue'

const DATA_DIRECTIVE_LABEL = 'localized-hover'

Vue.directive(
	'localized-hover',
	(() => {
		const state = {}

		const getMousePositionOnGrid = () => {}

		// 0 -> +15
		// 1 -> 0
		// 2 -> -15

		const localizedHover = event => {
			const { offsetX, offsetY } = event

			const gridPosition = []

			switch (true) {
				case offsetX < state.columns[0]:
					gridPosition.push(0)
					break
				case offsetX < state.columns[1]:
					gridPosition.push(1)
					break
				case offsetX < state.columns[2]:
					gridPosition.push(2)
					break
			}

			switch (true) {
				case offsetY < state.rows[0]:
					gridPosition.push(0)
					break
				case offsetY < state.rows[1]:
					gridPosition.push(1)
					break
				case offsetY < state.rows[2]:
					gridPosition.push(2)
					break
			}

			const rotation = {
				0: -15,
				1: 0,
				2: 15,
			}

			console.log(
				'x',
				rotation[gridPosition[0]],
				'y',
				rotation[gridPosition[1]]
			)

			state.element.style.transform = `rotateX(${
				rotation[gridPosition[1]]
			}deg) rotateY(${rotation[gridPosition[0]]}deg)`
		}

		return {
			bind(el) {
				const { width, height } = el.getBoundingClientRect()
				state.columns = [width / 3, (width / 3) * 2, width]
				state.rows = [height / 3, (height / 3) * 2, height]
				el.style.transition = 'all 1s ease-in-out'
				state.element = el

				el.addEventListener('mousemove', localizedHover)
			},
			unbind(el) {
				el.removeEventListener('mousemove', localizedHover)
			},
		}
	})()
)
