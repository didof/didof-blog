<template>
	<div>
		<h1 class="title" v-animate-enter:slide.left>{{ capitalizedMacro }}</h1>

		<BaseGrid :items="topics">
			<template v-slot:default="slotProps">
				<TopicCard
					:slug="slotProps.item.topic"
					@card-click="onTopicCardClick(slotProps.item.topic)"
					v-animate-enter:slide.bottom
					v-cursor
				/>
			</template>
		</BaseGrid>

		<p>Some ideas for the shots</p>
		<ul>
			<li>
				Cards shattered in disorder and draggable from the user. A bucket on the
				right where to save readings for later (localStorage)
			</li>
			<li>Slot machine that presents any time 3 different ones</li>
		</ul>
		<pre>{{ shots }}</pre>
	</div>
</template>

<script>
import Vue from 'vue'
import TopicCard from '~/components/blog/card/TopicCard.vue'
import { capitalize } from '~/utils/dataTypes/string'
import { groupWithAmount } from '~/utils/contentHandlers/group'

export default Vue.extend({
	name: 'page-blog-macro',
	components: {
		TopicCard,
	},
	async asyncData({ $content, params }) {
		const { macro } = params

		const articlesPaths = await $content(macro, { deep: true })
			.where({ dir: { $ne: `/${macro}/_shots` } })
			.only('path')
			.fetch()

		const groupedTopics = groupWithAmount(articlesPaths, 'topic')

		const shotsThumbnailContent = await $content(macro, { deep: true })
			.where({
				dir: { $eq: `/${macro}/_shots` },
			})
			.only(['title', 'description', 'color', 'thumbnail', 'slug'])
			.fetch()

		return {
			macro: macro,
			topics: groupedTopics,
			shots: shotsThumbnailContent,
		}
	},
	computed: {
		capitalizedMacro() {
			return capitalize(this.macro)
		},
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
