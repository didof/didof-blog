<template>
	<section class="card" @click="redirectToPost">
		<header class="card-header">
			<h6 class="card-header-title">
				{{ title }}
			</h6>
		</header>

		<div class="card-image">
			<figure class="image is-16by9">
				<img :src="thumbnailSrc" :alt="thumbnail.alt" />
			</figure>
		</div>

		<div class="card-content">
			<div class="content">
				categorie tag
				<br />
				<time :datetime="datetime">{{ formattedDate }}</time>
			</div>
		</div>
	</section>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	props: {
		title: {
			type: String,
			require: true,
		},
		description: {
			type: String,
			require: true,
		},
		thumbnail: {
			type: Object,
			require: true,
		},
		color: {
			type: String,
			require: true,
		},
		updatedAt: {
			type: String,
			require: true,
		},
		path: {
			type: String,
			require: true,
		},
	},
	computed: {
		thumbnailSrc() {
			return require(`~/static/articles/${this.thumbnail.img}`)
		},
		formattedDate() {
			const options = { year: 'numeric', month: 'long', day: 'numeric' }
			return new Date(this.updatedAt).toLocaleDateString('en', options)
		},
		datetime() {
			const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
			return new Date(this.updatedAt)
				.toLocaleDateString('en', options)
				.replaceAll('/', '-')
		},
	},
	methods: {
		redirectToPost() {
			this.$router.push({ path: `/blog${this.path}` })
		},
	},
})
</script>
