<template>
	<div v-if="isVisible" v-animate-enter:slice.right>
		<button
			v-if="isDismissable"
			class="delete"
			@click="onDismissClick"
		></button>
		<span v-if="!content">Just passing by...</span>
		<component v-else :is="content" />
	</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	name: 'blog-notification',
	computed: {
		isVisible() {
			return this.$store.getters['notification/isVisible']
		},
		isDismissable() {
			return this.$store.getters['notification/isDismissable']
		},
		content() {
			const test = this.$store.getters['notification/content']
			console.log(test)
			return test
		},
	},
	methods: {
		onDismissClick() {
			this.$store.dispatch('notification/changeVisibility', false)
		},
	},
})
</script>

<style scoped>
div {
	position: fixed;
	bottom: 0;
	right: 0;
	max-height: 8%;
	max-width: 30%;
	margin: 30px 20px;
}
</style>
