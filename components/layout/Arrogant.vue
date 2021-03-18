<template>
	<section v-observe="drawAttention">arrogant {{ offset }}</section>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	name: 'arrogant',
	data() {
		return {
			offset: null,
		}
	},
	mounted() {
		console.log(this)
		this.offset = this.$el.offsetTop
	},
	methods: {
		drawAttention() {
			if (!this.offset) return

			// var keys = { 37: 1, 38: 1, 39: 1, 40: 1 }

			// function preventDefault(e) {
			// 	e.preventDefault()
			// }

			// function preventDefaultForScrollKeys(e) {
			// 	if (keys[e.keyCode]) {
			// 		preventDefault(e)
			// 		return false
			// 	}
			// }

			// // modern Chrome requires { passive: false } when adding event
			// var supportsPassive = false
			// try {
			// 	window.addEventListener(
			// 		'test',
			// 		null,
			// 		Object.defineProperty({}, 'passive', {
			// 			get: function () {
			// 				supportsPassive = true
			// 			},
			// 		})
			// 	)
			// } catch (e) {}

			// var wheelOpt = supportsPassive ? { passive: false } : false
			// var wheelEvent =
			// 	'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'

			// window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
			// window.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
			// window.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
			// window.addEventListener('keydown', preventDefaultForScrollKeys, false)

			window.scroll({
				top: this.offset,
				behavior: 'smooth',
			})
		},
	},
})
</script>

<style scoped>
section {
	width: 100%;
	height: 600px;
	background-color: red;
}
</style>
