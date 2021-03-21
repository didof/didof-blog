<template>
	<div v-if="isVisible">
		<div v-if="content">
			<component class="notification is-light" :class="variant" :is="content">
				<template v-slot:delete>
					<button v-if="isDismissable" class="delete"></button>
				</template>
			</component>
		</div>
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
		variant() {
			return this.$store.getters['notification/variant']
		},
		content() {
			return this.$store.getters['notification/content']
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
