<template>
	<div>
		<h1 class="title is-1">{{ article.title }}</h1>
		<h2 class="subtitle is-2">{{ topic }}</h2>

		<div class="columns">
			<aside class="column section is-3">
				<BaseToc :tocs="article.toc" />
			</aside>
			<article class="column">
				<NuxtContent :document="article" />
			</article>
			<aside class="column section is-3" :class="cockpitBehaviour">
				<BaseCockpit />
			</aside>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { BaseCockpit, BaseToc } from '~/components/blog'

export default Vue.extend({
	name: 'page-post',
	components: {
		BaseCockpit,
		BaseToc,
	},
	layout: 'post',
	async asyncData({ $content, params }) {
		const { topic, slug } = params

		const article = await $content(topic, slug).fetch()

		return {
			article,
			topic,
		}
	},
	data() {
		return {
			alwaysShowCockpit: false,
		}
	},
	computed: {
		cockpitBehaviour() {
			return { shy: !this.alwaysShowCockpit }
		},
	},
})
</script>

<style scoped>
.shy {
	opacity: 0;
	transition: opacity 0.2s ease-out;
}

.shy:hover {
	opacity: 1;
}
</style>
