<template>
	<div>
		<h1>Macrotopic: {{ macro }}</h1>

		<p>
			Far apparire uno stack di cards per ogni topic, tante più card per ogni
			sotto parte
		</p>
		<pre>{{ macroContentCount }}</pre>

		<p>Far apparrire i miscellaneous in modo disordinato</p>
		<pre>{{ miscellaneous }}</pre>
	</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	name: 'page-blog-macro',
	async asyncData({ $content, params }) {
		const { macro } = params

		const articlesPaths = await $content(macro, { deep: true })
			.only('path')
			.fetch()

		const macroContentCount = articlesPaths.reduce((accumulator, { path }) => {
			const topic = path.split('/')[2]

			accumulator[topic] !== undefined
				? (accumulator[topic] += 1)
				: (accumulator[topic] = 1)

			return accumulator
		}, {})

		const { miscellaneous } = macroContentCount
		delete macroContentCount.miscellaneous

		return { macro, macroContentCount, miscellaneous }
	},
})
</script>
