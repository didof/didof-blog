<template>
	<section class="card" style="width: 300px" @click="onCardClick">
		<header class="card-header">
			<p class="card-header-title">{{ title }}</p>
		</header>
		<figure class="card-image">
			<DeferredImage
				v-if="useDeferredImageComponent"
				:width="300"
				:height="300"
				:lowSrc="lowSrc"
				:highSrc="highSrc"
			/>
			<img v-else :src="src" />
		</figure>
	</section>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	name: 'only-image-card',
	emits: ['card-click'],
	props: {
		src: {
			type: String,
		},
		lowSrc: {
			type: String,
		},
		highSrc: {
			type: String,
		},
		title: {
			type: String,
			require: true,
		},
	},
	data() {
		return {
			useDeferredImageComponent: false,
		}
	},
	created() {
		if (this.$props.lowSrc && this.$props.highSrc) {
			this.useDeferredImageComponent = true
		}
	},
	methods: {
		onCardClick() {
			this.$emit('card-click')
		},
	},
})
</script>

<style scoped>
section {
	width: ;
}
</style>
