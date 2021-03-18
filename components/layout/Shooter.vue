<template>
	<div class="wrapper" v-observe="shootElements" ref="wrapper">
		<div v-for="(item, index) in items" :key="`shooter-element-${index}`">
			<div class="box element" :style="initPosition()">
				<slot :item="item">default card</slot>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

export default Vue.extend({
	name: 'shooter',
	props: {
		items: {
			type: Array,
			require: true,
		},
		itemHeight: {
			type: Number,
			require: true,
		},
		width: {
			type: Number,
			default: 1400,
		},
	},
	data() {
		return {
			initTranslateY: `translateY(-${this.itemHeight + 10}px)`,
		}
	},
	methods: {
		shootElements() {
			let delay = 0
			this.$vnode.elm.children.forEach((vnode, index) => {
				const element = vnode.children[0]
				setTimeout(() => {
					const randomX = getRandomInt(0, this.width - 300)
					const randomY = getRandomInt(20, 140)
					element.style.transform = `translateY(${randomY}px) translateX(${randomX}px)`
				}, delay)
				delay += 300
			})
		},
		initPosition() {
			return {
				opacity: 1,
				transform: `${this.initTranslateY} translateX(300px)`,
			}
		},
	},
})

/**
 * cambio nome componente: Croupier
 * cambio approccio:
 * al primo run, le carte (già presenti per il SEO ma nascoste dalla vista) vengono sparate da sotto
 * in tre righe e 6 colonne, dall'alto verso destra, sotto, verso sinistra, sotto, verso destra
 *
 * ogni card deve avere una position definita e calcolata ma override all'init con il translate
 * in questo modo dovrebbe essere possibile implementare il drad
 *
 * bottone MORE che lancia con sprezzo altre tre card disordinatamente
 */
</script>

<style scoped>
.wrapper {
	width: 100%;
	height: 600px;
	position: relative;
	background-color: #eee;
	overflow: hidden;
}

.element {
	width: 300px;
	height: 400px;
	position: absolute;
	transition: transform 0.3s ease-in-out;
}
</style>
