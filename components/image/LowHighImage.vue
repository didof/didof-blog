<template>
	<figure :style="wrapperStyle">
		<img :src="lowSrc" class="lowRes" :style="lowResStyle" :alt="alt" />
		<img
			:src="highSrc"
			class="highRes"
			:style="highResStyle"
			@load="highResolutionLoaded"
			:alt="alt"
		/>
	</figure>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	props: {
		width: {
			type: Number,
			require: true,
		},
		height: {
			type: Number,
			require: true,
		},
		lowSrc: {
			type: String,
			require: true,
		},
		highSrc: {
			type: String,
			require: true,
		},
		alt: {
			type: String,
		},
	},
	data() {
		return {
			highResolutionIsReady: 0,
		}
	},
	computed: {
		wrapperStyle() {
			return { width: `${this.width}px`, height: `${this.height}px` }
		},
		lowResStyle() {
			return { opacity: !this.highResolutionIsReady }
		},
		highResStyle() {
			return { opacity: this.highResolutionIsReady }
		},
	},
	methods: {
		highResolutionLoaded() {
			this.highResolutionIsReady = 1
		},
	},
})
</script>

<style scoped>
figure {
	position: relative;
}
img {
	position: absolute;
	width: 100%;
	height: 100%;
	object-position: center center;
	object-fit: cover;
}

.lowRes {
	filter: blur(2px);
	transition: opacity 500ms ease-out 50ms;
}

.highRes {
	transition: opacity 500ms ease-out 50ms;
}
</style>
