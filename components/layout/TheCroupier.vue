<template>
	<div ref="wrapper" v-observe:500="distributeMode">
		<div
			v-for="(chunk, index) in chunks"
			:key="`croupier-chunk-${index}`"
			class="flex"
		>
			<div
				v-for="(item, index) in chunk"
				:key="`croupier-item-${index}`"
				:style="itemStyle"
				class="item"
			>
				<slot :item="item" :cardWidth="columnWidth"></slot>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { reverse } from '~/utils/HTMLcollection'
import { isEven } from '~/utils/bitwise'
import { splitInChunks } from '~/utils/dataTypes/array'
import { getRandomInt } from '~/utils/randomInt'

export default Vue.extend({
	name: 'the-croupier',
	props: {
		cards: {
			type: Array,
			require: true,
		},
		columnsAmount: {
			type: Number,
			require: true,
		},
		rowHeight: {
			type: Number,
			require: true,
		},
		cardVelocity: {
			type: Number,
			default: 500,
		},
		cardDelay: {
			type: Number,
			default: 100,
		},
		mode: {
			type: String,
			default: 'row',
		},
		isJaunty: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			hasMounted: false,
			chunks: [],
			columnWidth: null,
			cardsElements: [],
		}
	},
	created() {
		this.chunks = splitInChunks(this.cards, this.columnsAmount)
	},
	mounted() {
		const { wrapper } = this.$refs
		const { width } = wrapper.getBoundingClientRect()
		this.columnWidth = width / this.columnsAmount

		this.stackDeck()

		this.hasMounted = true
	},
	computed: {
		itemStyle() {
			return {
				opacity: this.hasMounted ? 1 : 0,
				boxShadow: 'none',
				width: `${this.columnWidth}px`,
			}
		},
		distributeMode() {
			switch (this.mode) {
				case 'rows':
				case 'default':
				default:
					return this.distributeCardsInRows
				case 'snake':
					return this.distributeCardsAsSnake
			}
		},
	},
	methods: {
		stackDeck() {
			const chunks = this.$vnode.elm.children

			let cardNumber = 0
			chunks.forEach((row, ir) => {
				const column = row.children
				column.forEach((element, ic) => {
					const x = ic * this.columnWidth
					const y = ir * this.rowHeight + cardNumber

					let transformation = `translateX(-${x}px) translateY(-${y}px)`

					transformation = this._addTilt(transformation)

					element.style.transform = transformation
					cardNumber++
					this.cardsElements.push(element)
				})
			})
		},
		distributeCardsInRows() {
			this.cardsElements.forEach((element, index) => {
				let elementDelay = index * this.cardDelay
				element.style.transition = `transform ${this.cardVelocity}ms ease-in-out ${elementDelay}ms`

				let transformation = 'translateX(0px) translateY(0px)'

				transformation = this._addTilt(transformation)

				element.style.transform = transformation
			})

			if (this.isJaunty) {
			}
		},
		distributeCardsAsSnake() {
			const rows = this.$vnode.elm.children

			rows.forEach((row, ir) => {
				const rowDelay = ir * this.columnsAmount
				let rowContent = row.children

				if (isEven(ir)) rowContent = reverse(rowContent)

				this._distributeRowContent(rowContent, rowDelay)
			})
		},
		_distributeRowContent(rowContent, rowDelay) {
			let transformation = `translateX(0px) translateY(0px)`

			rowContent.forEach((element, ic) => {
				let elementDelay = (rowDelay + ic) * this.cardDelay

				element.style.transition = `transform ${this.cardVelocity}ms ease-in-out ${elementDelay}ms`

				transformation = this._addTilt(transformation)

				element.style.transform = transformation
			})
		},
		_addTilt(transformation) {
			if (this.isJaunty) {
				const useJaunty = Math.random()
				if (useJaunty > 0.7) {
					let tilt = getRandomInt(0, 1)
					if (useJaunty > Math.random()) tilt = -tilt
					transformation += ` rotateZ(${tilt}deg)`
				}
			}
			return transformation
		},
	},
})
</script>

<style scoped>
.flex {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.item {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
}
</style>
