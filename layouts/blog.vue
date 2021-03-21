<template>
	<div class="layout">
		<BlogHeader />

		<Nuxt />

		<BlogNotification />
	</div>
</template>

<script>
import Vue from 'vue'
import { BlogHeader } from '~/components/layout/headers'
import { BlogNotification } from '~/components/layout/notifications'

export default Vue.extend({
	name: 'layout-blog',
	components: {
		BlogHeader,
		BlogNotification,
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
	align-items: center;
}
</style>
