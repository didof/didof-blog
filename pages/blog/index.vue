<template>
	<div>
		<section class="hero is-link is-medium">
			<div class="hero-body">
				<h1 class="title" v-animate-enter:slide.top>didof / blog</h1>
				<h2 class="subtitle" v-animate-enter:slide.bottom>Love it!</h2>
			</div>
		</section>
		<h1 class="title">Blog</h1>

		<BaseGrid :items="macros">
			<template v-slot:default="slotProps">
				<MacroCard
					:slug="slotProps.item.macro"
					@card-click="onMacroCardClick(slotProps.item.macro)"
					v-animate-enter:slide.bottom
					v-cursor
				/>
			</template>
		</BaseGrid>
	</div>
</template>

<script>
import Vue from 'vue'
import MacroCard from '~/components/blog/card/MacroCard'
import { groupWithAmount } from '~/utils/contentHandlers/group'

export default Vue.extend({
	name: 'page-blog',
	components: {
		MacroCard,
	},
	async asyncData({ $content }) {
		const articlesPaths = await $content({ deep: true }).only(['path']).fetch()

		const groupedMacros = groupWithAmount(articlesPaths, 'macro')

		return { macros: groupedMacros }
	},
	methods: {
		onMacroCardClick(macroSlug) {
			this.$router.push({
				name: 'blog-macro',
				params: { macro: macroSlug },
			})
		},
	},
})
</script>

<style scoped>
.test {
	height: 200px;
}
</style>
