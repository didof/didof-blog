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
import OnlyImageCard from '../card/OnlyImageCard'

export default Vue.extend({
	name: 'topic-card',
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
		this.lowSrc = require(`~/assets/images/topic/lowRes-${slug}.png`)
		this.highSrc = require(`~/assets/images/topic/highRes-${slug}.png`)
	},
})
</script>
