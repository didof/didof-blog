<template>
	<article>
		<h1 class="title">{{ slug }} - {{ section }}</h1>
		<h3 class="subtitle">{{ macro }}/{{ topic }}</h3>

		<div class="columns">
			<aside class="column is-3">
				<BlogMenu :sections="menuSections" />
			</aside>
			<main class="column">
				<NuxtContent :document="articleSection" />
			</main>
		</div>
	</article>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	name: 'page-blog-macro-topic-slug-section',
	layout: 'post',
	async asyncData({ $content, params }) {
		const { macro, topic, slug, section } = params

		const article = await $content(macro, topic, slug)
			.only(['slug', 'section_label', 'toc'])
			.sortBy('index')
			.fetch()

		// delete unuseful data
		article.forEach(section => {
			delete section.path
			delete section.extension
		})

		const menuSections = article.map(section => ({
			...section,
			toc: section.toc.map(({ id, text }) => ({ id, text })),
		}))

		menuSections[0].section_label = 'index'

		const articleSection = await $content(macro, topic, slug, section).fetch()

		return { macro, topic, slug, section, articleSection, menuSections }
	},
})
</script>
