import Vue from 'vue'

const emit = (vnode, name, data) => {
	console.log(vnode, name, data)
}

const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			emit()

			observer.unobserve(entry.target)
		}
	})
})

Vue.directive('observe', {
	bind: (el, binding) => {
		const delay = binding.arg || 0
		const cb = binding.value

		if (!(cb instanceof Function)) {
			console.warn(
				`[v-observe] The value passed ${binding.expression} is not a function`
			)
			return
		}

		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					setTimeout(cb, parseInt(delay))

					observer.unobserve(entry.target)
				}
			})
		})

		observer.observe(el)
	},
})
