<template>
	<menu class="menu">
		<p class="menu-label">Menu</p>
		<ul class="menu-list">
			<li v-for="section in sections" :key="`blog-menu-${section.slug}`">
				<NuxtLink v-if="section.slug === 'index'" :to="'/sex'">index</NuxtLink>
				<NuxtLink v-else :to="calculateSectionURL(section.slug)">{{
					section.section_label
				}}</NuxtLink>
				<span v-if="section.toc.length">
					<ul
						class="menu"
						v-for="toc in section.toc"
						:key="`blog-menu-${section}-${toc.id}`"
					>
						<li>
							<NuxtLink :to="calculateSectionURL(section.slug, toc.id)">{{
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
	methods: {
		calculateSectionURL(sectionSlug, tocId) {
			const output = {
				name: 'blog-macro-topic-slug-section',
				params: {
					...this.$route.params,
					section: sectionSlug,
				},
			}

			if (tocId) output.hash = `#${tocId}`

			return output
		},
	},
})
</script>
