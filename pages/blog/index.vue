<template>
	<div>
		<h1>Blog</h1>
		<p>Topics grid</p>

		<hr />
		<BaseGrid :items="articles" :columns="4">
			<template v-slot:default="slotProps">
				<BaseCard
					:title="slotProps.item.title"
					:thumbnail="slotProps.item.thumbnail"
					:description="slotProps.item.description"
					:color="slotProps.item.color"
					:updatedAt="slotProps.item.updatedAt"
					:path="slotProps.item.path"
				/>
			</template>
		</BaseGrid>
	</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	async asyncData({ $content }) {
		const articles = await $content({ deep: true })
			.only(['title', 'short_description', 'thumbnail', 'color', 'updatedAt'])
			.limit(9)
			.sortBy('updatedAt')
			.fetch()
		console.log(articles)
		return { articles }
	},
})
</script>
