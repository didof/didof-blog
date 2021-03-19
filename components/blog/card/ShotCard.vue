<template>
	<div class="card" :style="cardStyle">
		<div class="card-image">
			<DeferredImage
				:width="width"
				class="image is-4by3"
				:lowSrc="lowSrc"
				:highSrc="highSrc"
			/>
		</div>
		<header class="card-header">
			<p class="card-header-title">{{ title }}</p>
		</header>

		<div class="card-content">
			<div class="content">
				{{ description }}
			</div>
		</div>

		<footer class="card-footer">
			<a href="#" class="card-footer-item">Save</a>
			<a href="#" class="card-footer-item">Edit</a>
			<a href="#" class="card-footer-item">Delete</a>
		</footer>
	</div>
</template>

<script>
import Vue from 'vue'
import DeferredImage from '~/components/image/DeferredImage'

export default Vue.extend({
	name: 'shot-card',
	components: {
		DeferredImage,
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
})
</script>
