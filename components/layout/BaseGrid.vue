<template>
	<div>
		<div
			class="columns"
			v-for="(chunk, index) in chunks"
			:key="`chunk-${index}`"
		>
			<div class="column" v-for="(item, index) in chunk" :key="`item-${index}`">
				<slot :item="item">default card</slot>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	props: {
		items: {
			type: Array,
			default: [],
		},
		columns: {
			type: Number,
			default: 3,
		},
	},
	computed: {
		chunks() {
			const copy = [...this.items]
			const chunks = []

			while (copy.length) {
				chunks.push(copy.splice(0, this.columns))
			}

			return chunks
		},
	},
})
</script>

<style scoped>
.column {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
