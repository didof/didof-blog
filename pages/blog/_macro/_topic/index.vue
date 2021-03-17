<template>
	<div>
		<h1 class="title">Topic: {{ topic }} ({{ macro }})</h1>

		<div
			v-for="(amount, articleSlug) in groupedArticles"
			:key="`topic-${articleSlug}`"
		>
			<button @click="onArticleCardClick(articleSlug)">
				{{ articleSlug }} ({{ amount }})
			</button>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	name: 'page-blog-macro-topic',
	async asyncData({ $content, params }) {
		const { macro, topic } = params

		const rawArticlesPaths = await $content(macro, topic, { deep: true })
			.only('path')
			.fetch()

		const groupedArticles = rawArticlesPaths.reduce((accumulator, { path }) => {
			const topic = path.split('/')[3]

			accumulator[topic] !== undefined
				? (accumulator[topic] += 1)
				: (accumulator[topic] = 1)

			return accumulator
		}, {})

		return { macro, topic, groupedArticles }
	},
	methods: {
		onArticleCardClick(articleSlug) {
			this.$router.push({
				name: 'blog-macro-topic-slug',
				params: {
					macro: this.macro,
					topic: this.topic,
					slug: articleSlug,
					section: 'index',
				},
			})
		},
	},
})
</script>
