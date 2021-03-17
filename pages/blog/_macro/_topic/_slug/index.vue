<template>
	<div>
		<h1>Article: {{ slug }}</h1>
		<h2>{{ macro }}/{{ topic }}</h2>

		<BlogMenu :sections="menuSections" />

		<pre>{{ menuSections }}</pre>
	</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	name: 'page-blog-macro-topic-slug',
	async asyncData({ $content, params }) {
		const { macro, topic, slug } = params

		const articleIndex = await $content(macro, topic, slug, 'index').fetch()

		const articlesSections = await $content(macro, topic, slug)
			.where({
				path: { $ne: `/${macro}/${topic}/${slug}/index` },
			})
			.only(['slug', 'section_label', 'toc'])
			.sortBy('index')
			.fetch()

		// delete unuseful data
		articlesSections.forEach(section => {
			delete section.path
			delete section.extension
		})

		// insert index
		articlesSections.unshift({
			slug: articleIndex.slug,
			section_label: 'index',
			toc: articleIndex.toc,
		})

		// format to minimal
		const menuSections = articlesSections.map(section => ({
			...section,
			toc: section.toc.map(({ id, text }) => ({ id, text })),
		}))

		return { macro, topic, slug, index: articleIndex, menuSections }
	},
})
</script>
