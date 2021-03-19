<template>
	<div class="card">
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
		lowSrc: {
			type: String,
			require: true,
		},
		highSrc: {
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
})
</script>
