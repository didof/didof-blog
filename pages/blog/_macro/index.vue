<template>
	<div>
		<h1>Macrotopic: {{ macro }}</h1>

		<p>
			Far apparire uno stack di cards per ogni topic, tante più card per ogni
			sotto parte
		</p>
		<pre>{{ topics }}</pre>
		<div v-for="(amount, topicSlug) in topics" :key="`topic-${topicSlug}`">
			<button @click="onTopicCardClick(topicSlug)">
				{{ topicSlug }} ({{ amount }})
			</button>
		</div>

		<p>Far apparrire i miscellaneous in modo disordinato</p>
		<pre>{{ shots }}</pre>
	</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	name: 'page-blog-macro',
	async asyncData({ $content, params }) {
		const { macro } = params

		const articlesPaths = await $content(macro, { deep: true })
			.where({ dir: { $ne: `/${macro}/_shots` } })
			.only('path')
			.fetch()

		const macroContentCount = articlesPaths.reduce((accumulator, { path }) => {
			const topic = path.split('/')[2]

			accumulator[topic] !== undefined
				? (accumulator[topic] += 1)
				: (accumulator[topic] = 1)

			return accumulator
		}, {})

		const shotsThumbnailContent = await $content(macro, { deep: true })
			.where({
				dir: { $eq: `/${macro}/_shots` },
			})
			.only(['title', 'description', 'color', 'thumbnail', 'slug'])
			.fetch()

		return { macro, topics: macroContentCount, shots: shotsThumbnailContent }
	},
	methods: {
		onTopicCardClick(topicSlug) {
			this.$router.push({
				name: 'blog-macro-topic',
				params: { macro: this.macro, topic: topicSlug },
			})
		},
	},
})
</script>
