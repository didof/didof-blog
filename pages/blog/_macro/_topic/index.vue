<template>
	<div>
		<h1>Topic: {{ topic }} ({{ macro }})</h1>
	</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	name: 'page-blog-macro-topic',
	async asyncData(context) {
		const { macro, topic } = context.params
		return { macro, topic }
	},
})
</script>
