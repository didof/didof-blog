<template>
	<div>
		<h1 class="title" v-animate-enter:slide.left>Blog</h1>

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

export default Vue.extend({
	name: 'page-blog',
	components: {
		MacroCard,
	},
	async asyncData({ $content }) {
		const articlesPaths = await $content({ deep: true }).only(['path']).fetch()

		const groupedMacros = articlesPaths.reduce((groups, { path }) => {
			const macro = path.split('/')[1]

			const foundIndex = groups.findIndex(el => el.macro === macro)

			if (Boolean(~foundIndex)) {
				const incrementedAmount = groups[foundIndex].amount + 1
				groups.splice(foundIndex, 1, { macro, amount: incrementedAmount })
			} else {
				groups = [...groups, { macro, amount: 1 }]
			}

			return groups
		}, [])

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
