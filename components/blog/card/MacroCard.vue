<template>
	<OnlyImageCard
		:title="slug"
		:lowSrc="lowSrc"
		:highSrc="highSrc"
		@card-click="$emit('card-click')"
	/>
</template>

<script>
import Vue from 'vue'
import OnlyImageCard from '~/components/card/OnlyImageCard'

export default Vue.extend({
	name: 'macro-card',
	emits: ['card-click'],
	components: {
		OnlyImageCard,
	},
	props: {
		slug: {
			type: String,
			require: true,
		},
	},
	data() {
		return {
			lowSrc: null,
			highSrc: null,
		}
	},
	created() {
		const { slug } = this.$props
		this.lowSrc = require(`~/assets/images/macro/lowRes-${slug}.png`)
		this.highSrc = require(`~/assets/images/macro/highRes-${slug}.png`)
	},
})
</script>
