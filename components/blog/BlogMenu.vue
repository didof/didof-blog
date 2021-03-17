<template>
	<nav>
		<h1>Menu</h1>
		<ul>
			<li v-for="section in sections" :key="`blog-menu-${section.slug}`">
				<NuxtLink :to="calculateSectionURL(section.slug)">{{
					section.section_label
				}}</NuxtLink>
				<span v-if="section.toc.length">
					<ul
						v-for="toc in section.toc"
						:key="`blog-menu-${section}-${toc.id}`"
					>
						<NuxtLink :to="calculateSectionURL(section.slug, toc.id)">{{
							toc.text
						}}</NuxtLink>
					</ul>
				</span>
			</li>
		</ul>
	</nav>
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
			return `${this.$route.path}/${sectionSlug}${tocId ? `#${tocId}` : ''}`
		},
	},
})
</script>
