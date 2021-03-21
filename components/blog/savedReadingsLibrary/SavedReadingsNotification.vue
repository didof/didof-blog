<template>
	<div class="notification is-light" :class="variant">
		<span class="tag"> Ctrl </span>
		+
		<span class="tag"> Click </span>
		= delete
	</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	name: 'saved-readings-notification',
	computed: {
		variant() {
			return this.$store.getters['notification/variant']
		},
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
