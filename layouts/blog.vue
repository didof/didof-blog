<template>
	<div class="layout">
		<BlogHeader />

		<Nuxt />

		<TheNotification />
	</div>
</template>

<script>
import Vue from 'vue'
import BlogHeader from '~/components/layout/headers/BlogHeader.vue'
import TheNotification from '~/components/layout/TheNotification.vue'

export default Vue.extend({
	name: 'layout-blog',
	components: {
		BlogHeader,
		TheNotification,
	},
})
</script>

<style scoped>
.layout {
	width: 100vw;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;
}
</style>
