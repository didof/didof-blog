<template>
	<figure :style="wrapperStyle" ref="imgRef">
		<img class="lowRes" :src="lowSrc" :style="lowResStyle" :alt="alt" />
		<img
			v-if="isIntersecting"
			class="highRes"
			:src="highSrc"
			:style="highResStyle"
			:alt="alt"
			@load="highResolutionLoaded"
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
			observer: null,
			isIntersecting: false,
		}
	},
	computed: {
		wrapperStyle() {
			console.log('test', this.height)
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
	mounted() {
		if (!IntersectionObserver) return

		this.observer = new IntersectionObserver(
			entries => {
				this.isIntersecting = entries[0].isIntersecting
			},
			{
				threshold: 0.1,
				root: null,
				rootMargin: '0%',
			}
		)

		this.observer.observe(this.$refs.imgRef)
	},
	destroyed() {
		this.observer.disconnect()
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
