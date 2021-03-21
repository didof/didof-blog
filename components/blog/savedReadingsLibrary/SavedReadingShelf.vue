<template>
	<div class="card specific" @click.ctrl="onCtrlClick">
		<header
			class="card-header"
			v-cursor:move.pointer="isExpanded"
			@click.exact="onExactClick"
		>
			<p class="card-header-title">{{ title }}</p>
			<button class="card-header-icon" :aria-label="chevronAriaLabel">
				<ChevronIcon :direction="chevronDirection" />
			</button>
		</header>
		<transition name="content">
			<div v-if="isExpanded">
				<div class="card-content">
					<div class="content">
						{{ description }}
					</div>
				</div>
			</div>
		</transition>
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
		description: {
			type: String,
			require: true,
		},
		macro: {
			type: String,
			require: true,
		},
		topic: {
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
		onExactClick() {
			this.$emit(this.isExpanded ? 'collapse' : 'expand', this.slug)
		},
		onCtrlClick() {
			this.$store.dispatch('guest/removeReading', this.slug)
		},
	},
	// se il mouse va sopra la library appare sotto un toaster con il control in outline e scritto accanto delete. Se lo tieni premuto si illumina
	// v-breakpoint="test" > .test-mobile .test-tablet .test-desktop
	// v-localized-hover -> perspective sul parent
})
</script>

<style scoped>
button {
	border: none;
	background-color: transparent;
	outline: none;
}

.specific {
	width: 250px;
	margin: 10px 0;
}

.content-enter-active,
.content-leave-active {
	transition: opacity 0.5s ease-in-out, max-height 0.5s ease-in-out;
	opacity: 1;
	max-height: 200px;
}
.content-enter,
.content-leave-to {
	opacity: 0;
	max-height: 0px;
}

.footer-enter-active,
.footer-leave-active {
	transition: opacity 0.5s ease-in-out, max-height 0.5s ease-in-out;
	opacity: 1;
	max-height: 50px;
}
.footer-enter,
.footer-leave-to {
	opacity: 0;
	max-height: 0px;
}
</style>
