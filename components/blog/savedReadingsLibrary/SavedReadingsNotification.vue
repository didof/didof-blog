<template>
	<div>
		<slot name="delete"></slot>
		<span class="tag is-medium is-dark"> Ctrl </span>
		+
		<span class="tag is-medium is-dark"> Click </span>
		= delete
	</div>
</template>

<script>
import Vue from 'vue'

// todo class WatchKey

export default Vue.extend({
	name: 'saved-readings-notification',
	computed: {
		isDismissable() {
			return this.$store.getters['notification/isDismissable']
		},
	},
	created() {
		console.log('created')
	},
	beforeDestroy() {
		console.log('destroy')
	},
})
</script>

<style scoped>
.center {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
</style>
