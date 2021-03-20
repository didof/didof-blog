<template>
	<div class="container is-fluid">
		<h1 class="title" v-animate-enter:slide.left>{{ capitalizedMacro }}</h1>

		<BaseGrid :items="topics">
			<template v-slot:default="slotProps">
				<TopicCard
					:slug="slotProps.item.topic"
					@card-click="onTopicCardClick(slotProps.item.topic)"
					v-animate-enter:slide.bottom
					v-cursor
					v-localized-hover
				/>
			</template>
		</BaseGrid>

		<div class="columns">
			<section class="column">
				<Croupier
					:cards="shots"
					:columnsAmount="5"
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
				</Croupier>
			</section>
			<SavedReadingsLibrary />
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import TopicCard from '~/components/blog/card/TopicCard.vue'
import Croupier from '~/components/layout/Croupier'
import ShotCard from '~/components/blog/card/ShotCard'
import { SavedReadingsLibrary } from '~/components/blog/savedReadingsLibrary'

import { capitalize } from '~/utils/dataTypes/string'
import { groupWithAmount } from '~/utils/contentHandlers/group'

export default Vue.extend({
	name: 'page-blog-macro',
	components: {
		TopicCard,
		Croupier,
		ShotCard,
		SavedReadingsLibrary,
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

article {
	width: 50px;
	height: 50px;
	background-color: red;
}
</style>
