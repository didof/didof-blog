<template>
	<div>
		<TheTopicCarousel :items="topics" />

		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />

		<div class="columns">
			<div class="column is-10">
				<TheCroupier
					:cards="shots"
					:rowHeight="400"
					:isJaunty="true"
					:mode="'snake'"
				>
					<template v-slot:default="slotProps">
						<ShotCard
							:width="slotProps.cardWidth"
							:height="400"
							:title="slotProps.item.title"
							:description="slotProps.item.shortDescription"
							:lowRes="slotProps.item.thumbnailLowRes"
							:highRes="slotProps.item.thumbnailHighRes"
							:path="slotProps.item.path"
						/>
					</template>
				</TheCroupier>
			</div>
			<section class="colum">
				<SavedReadingsLibrary />
			</section>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { TheArrogant, TheCroupier } from '~/components/layout'
import { TopicCard, ShotCard } from '~/components/blog/card'
import { SavedReadingsLibrary } from '~/components/blog/savedReadings'

import { capitalize } from '~/utils/dataTypes/string'
import { groupWithAmount } from '~/utils/contentHandlers/group'

import { TheTopicCarousel } from '~/components/blog/topicsCarousel'

export default Vue.extend({
	name: 'page-blog-macro',
	layout: 'blog',
	components: {
		TheCroupier,
		TheArrogant,
		TopicCard,
		ShotCard,
		SavedReadingsLibrary,
		TheTopicCarousel,
	},
	async asyncData({ $content, params }) {
		const { macro } = params

		const articlesPaths = await $content(macro, { deep: true })
			.where({ dir: { $ne: `/${macro}/_shots` } })
			.only('path')
			.fetch()

		const topics = groupWithAmount(articlesPaths, 'topic')

		const shots = await $content(macro, { deep: true })
			.where({
				dir: { $eq: `/${macro}/_shots` },
			})
			.only([
				'title',
				'shortDescription',
				'color',
				'thumbnailLowRes',
				'thumbnailHighRes',
				'slug',
				'path'
			])
			.fetch()

		return {
			macro,
			topics,
			shots,
		}
	},
	computed: {
		capitalizedMacro() {
			return capitalize(this.macro)
		},
		hasShots() {
			return Boolean(this.shots.length)
		},
		savedReadings() {
			return this.$store.getters['guest/savedReadings']
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

<style scoped>
section {
	margin: 20px;
}
</style>
