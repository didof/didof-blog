import Vue from 'vue'

const animateObserver = (type, modifier) => {
	return new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.remove('will-animate-enter')
				entry.target.classList.add(`animate-${type}-${modifier}`)

				observer.unobserve(entry.target)
			}
		})
	})
}

Vue.directive('animate-enter', {
	bind: (el, binding) => {
		el.classList.add('will-animate-enter')
		const observer = animateObserver(
			binding.arg,
			Object.keys(binding.modifiers)[0]
		)
		observer.observe(el)
	},
})
