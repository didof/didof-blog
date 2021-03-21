<template>
	<section v-observe="drawAttention">
		<slot></slot>
	</section>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	name: 'the-arrogant',
	data() {
		return {
			offset: null,
		}
	},
	mounted() {
		this.offset = this.$el.offsetTop
	},
	methods: {
		drawAttention() {
			if (!this.offset) return

			window.scroll({
				top: this.offset,
				behavior: 'smooth',
			})
		},
	},
})
</script>

<style scoped>
section {
	width: 100%;
	height: 600px;
}
</style>
