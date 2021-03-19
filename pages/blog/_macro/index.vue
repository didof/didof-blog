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

		<section>
			<Croupier
				:cards="mockItems"
				:columnsAmount="6"
				:rowHeight="200"
				:isJaunty="true"
				:mode="'snake'"
			>
				<template v-slot:default="slotProps">
					<div class="card for-croupier">
						<header class="card-header-title">
							{{ slotProps.item.title }}
						</header>
					</div>
				</template>
			</Croupier>
		</section>
	</div>
</template>

<script>
import Vue from 'vue'
import TopicCard from '~/components/blog/card/TopicCard.vue'
import Arrogant from '~/components/layout/Arrogant.vue'
import Croupier from '~/components/layout/Croupier/Croupier'

import { capitalize } from '~/utils/dataTypes/string'
import { groupWithAmount } from '~/utils/contentHandlers/group'

export default Vue.extend({
	name: 'page-blog-macro',
	components: {
		TopicCard,
		Arrogant,
		Croupier,
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
	data() {
		return {
			mockItems: new Array(13).fill({ title: 'test' }),
		}
	},
	computed: {
		capitalizedMacro() {
			return capitalize(this.macro)
		},
		hasShots() {
			return Boolean(this.shots.length)
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
	width: 80%;
}

.card.for-croupier {
	width: 90%;
	height: 90%;
	border: 1px solid #ccc;
	box-shadow: none !important;
	-webkit-box-shadow: none !important;
}
</style>
