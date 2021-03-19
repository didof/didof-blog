<template>
	<div class="card" :style="cardStyle" @click="onCardClick" v-cursor>
		<header class="card-header">
			<h6 class="card-header-title">
				{{ title }}
			</h6>
			<div
				class="card-header-icon"
				aria-label="save"
				@click.stop="onHeartIconClick"
			>
				<HeartIcon />
			</div>
		</header>
		<DeferredImage
			:width="width"
			class="card-image image is-4by3"
			:lowSrc="lowSrc"
			:highSrc="highSrc"
		/>

		<div class="card-content">
			<div class="content">
				{{ description }}
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import DeferredImage from '~/components/image/DeferredImage'
import { HeartIcon } from '~/components/icons'

export default Vue.extend({
	name: 'shot-card',
	components: {
		DeferredImage,
		HeartIcon,
	},
	props: {
		width: {
			type: Number,
			require: true,
		},
		height: {
			type: Number,
			require: true,
		},
		lowRes: {
			type: String,
			require: true,
		},
		highRes: {
			type: String,
			require: true,
		},
		title: {
			type: String,
			require: true,
		},
		description: {
			type: String,
			require: true,
		},
		path: {
			type: String,
			require: true,
		},
	},
	computed: {
		lowSrc() {
			return require(`~/assets/images/${this.lowRes}`)
		},
		highSrc() {
			return require(`~/assets/images/${this.highRes}`)
		},
		cardStyle() {
			return {
				height: this.height,
				width: this.width,
			}
		},
	},
	methods: {
		onCardClick() {
			const [_, macro, topic, slug] = this.path.split('/')
			this.$router.push({
				name: 'blog-macro-topic-slug',
				params: {
					macro,
					topic,
					slug,
				},
			})
		},
		onHeartIconClick() {
			this.$store.dispatch('guest/saveReading', this.path)
		},
	},
})
</script>
