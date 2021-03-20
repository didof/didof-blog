<template>
	<div>
		<div class="card">
			<header class="card-header">
				<p class="card-header-title">{{ title }}</p>
				<button
					class="card-header-icon"
					:aria-label="chevronAriaLabel"
					@click="onChevronClick"
				>
					<ChevronIcon :direction="chevronDirection" />
				</button>
			</header>
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
	},
	data() {
		return {
			isExtended: false,
		}
	},
	computed: {
		chevronDirection() {
			return this.isExtended ? 'up' : 'down'
		},
		chevronAriaLabel() {
			return this.isExtended ? 'expanded' : 'collapsed'
		},
	},
	methods: {
		onChevronClick() {
			this.isExtended = !this.isExtended
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
