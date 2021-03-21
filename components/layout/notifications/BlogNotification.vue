<template>
	<div
		v-if="isVisible"
		class="notification is-light"
		:class="variant"
		v-animate-enter:slice.right
	>
		<button
			v-if="isDismissable"
			class="delete"
			@click="onDismissClick"
		></button>
		Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum
		dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut,
		porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida
		purus diam, et dictum <a>felis venenatis</a> efficitur.
	</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	name: 'blog-notification',
	computed: {
		isVisible() {
			return this.$store.getters['blogNotification/isVisible']
		},
		isDismissable() {
			return this.$store.getters['blogNotification/isDismissable']
		},
		variant() {
			return this.$store.getters['blogNotification/variant']
		},
	},
	methods: {
		onDismissClick() {
			this.$store.dispatch('blogNotification/changeVisibility', false)
		},
	},
})
</script>

<style scoped>
div {
	position: fixed;
	bottom: 0;
	right: 0;
	margin: 30px 20px;
	max-width: 30%;
}
</style>
