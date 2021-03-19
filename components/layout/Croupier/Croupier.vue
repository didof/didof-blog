<template>
	<div ref="wrapper">
		<div
			v-for="(chunk, index) in chunks"
			:key="`croupier-chunk-${index}`"
			class="flex"
		>
			<div
				v-for="(item, index) in chunk"
				:key="`croupier-item-${index}`"
				:style="itemStyle"
			>
				<slot :item="item"></slot>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'

const splitArrayInChunks = (array, chunkLength) => {
	const copy = [...array]
	const chunks = []

	while (copy.length) {
		chunks.push(copy.splice(0, chunkLength))
	}

	return chunks
}

export default Vue.extend({
	name: 'croupier',
	props: {
		items: {
			type: Array,
			require: true,
		},
		columnsAmount: {
			type: Number,
			default: 9,
		},
		rowHeight: {
			type: Number,
			require: true,
		},
	},
	data() {
		return {
			chunks: [],
			columnWidth: null,
		}
	},
	mounted() {
		const { wrapper } = this.$refs
		const { width } = wrapper.getBoundingClientRect()
		this.columnWidth = width / this.columnsAmount

		this.stackDeck()
	},
	computed: {
		itemStyle() {
			return {
				width: `${this.columnWidth}px`,
				height: `${this.rowHeight}px`,
			}
		},
	},
	methods: {
		stackDeck() {
			const chunksElements = this.$vnode.elm.children

			chunksElements.forEach((chunk, ir) => {
				const column = chunk.children
				let cardNumber = 0
				column.forEach((element, ic) => {
					const x = ic * this.columnWidth
					const y = ir * this.rowHeight + cardNumber
					element.style.transform = `translateX(-${x}px) translateY(-${y}px)`
					cardNumber++
				})
			})
		},
	},
	created() {
		this.chunks = splitArrayInChunks(this.items, this.columnsAmount)
	},
})
</script>

<style scoped>
.flex {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
</style>
