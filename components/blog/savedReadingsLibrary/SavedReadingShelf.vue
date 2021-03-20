<template>
	<div>
		<div class="card">
			<header class="card-header">
				<p class="card-header-title">{{ title }} {{ isExpanded }}</p>
				<button
					class="card-header-icon"
					:aria-label="chevronAriaLabel"
					@click="onChevronClick"
				>
					<ChevronIcon :direction="chevronDirection" />
				</button>
			</header>
			<div v-if="isExpanded">
				<div class="card-content">
					<div class="content">
						Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros.
					</div>
				</div>
				<footer class="card-footer">
					<a href="#" class="card-footer-item">Read</a>
					<a href="#" class="card-footer-item">Remove</a>
				</footer>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { ChevronIcon } from '~/components/icons'

export default Vue.extend({
	name: 'saved-reading-shelf',
	components: {
		ChevronIcon,
	},
	props: {
		title: {
			type: String,
			require: true,
		},
		slug: {
			type: String,
			require: true,
		},
		isExpanded: {
			type: Boolean,
			require: true,
		},
	},
	emits: ['expanded', 'collapsed'],
	computed: {
		chevronDirection() {
			return this.isExpanded ? 'up' : 'down'
		},
		chevronAriaLabel() {
			return this.isExpanded ? 'expanded' : 'collapsed'
		},
	},
	methods: {
		onChevronClick() {
			this.$emit(this.isExpanded ? 'collapse' : 'expand', this.slug)
		},
	},
})
</script>

<style scoped>
button {
	border: none;
	background-color: transparent;
	outline: none;
}
</style>
