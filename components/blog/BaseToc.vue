<template>
	<nav>
		<ul>
			<li v-for="(toc, index) in tocs" :key="`toc-${index}`">
				<NuxtLink :to="`#${toc.id}`">{{ toc.text }}</NuxtLink>
			</li>
		</ul>
	</nav>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	props: {
		tocs: {
			type: Array,
			require: true,
		},
	},
})
</script>
