<template>
	<menu class="menu">
		<p class="menu-label">Menù {{ currentIndex }}</p>
		<ul class="menu-list">
			<li v-for="section in sections" :key="`blog-menu-${section.slug}`">
				<NuxtLink :to="calculateSectionURL(section)">{{
					section.section_label
				}}</NuxtLink>
				<span v-if="section.toc.length">
					<ul
						class="menu"
						v-for="toc in section.toc"
						:key="`blog-menu-${section}-${toc.id}`"
					>
						<li>
							<NuxtLink :to="calculateSectionURL(section, toc.id)">{{
								toc.text
							}}</NuxtLink>
						</li>
					</ul>
				</span>
			</li>
		</ul>
	</menu>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	props: {
		sections: {
			type: Array,
			require: true,
		},
	},
	data() {
		return {
			currentIndex: null,
		}
	},
	created() {
		const { section } = this.$route.params
		this.currentIndex = this.$props.sections.find(
			({ slug }) => slug === section
		).index
	},
	methods: {
		calculateSectionURL({ slug, index }, tocId) {
			const output = {
				name: 'blog-macro-topic-slug-section',
				params: {
					...this.$route.params,
					section: slug,
				},
				query: {
					direction: 'down',
				},
			}

			if (index >= this.currentIndex) output.query.direction = 'top'

			if (tocId) output.hash = `/#${tocId}`

			return output
		},
	},
})
</script>
