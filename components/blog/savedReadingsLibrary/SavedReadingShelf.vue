<template>
	<div>
		<div class="card setted-width">
			<header class="card-header" @click="onChevronClick" v-cursor:move>
				<p class="card-header-title">{{ title }}</p>
				<button class="card-header-icon" :aria-label="chevronAriaLabel">
					<ChevronIcon :direction="chevronDirection" />
				</button>
			</header>
			<transition name="content">
				<div
					v-if="isExpanded"
					@mouseenter="onContentEnter"
					@mouseleave="onContentLeave"
				>
					<div class="card-content">
						<div class="content">
							Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at
							eros.
						</div>
					</div>
					<transition name="footer">
						<footer class="card-footer" v-if="isContentHovered">
							<a href="#" class="card-footer-item">Read</a>
							<span class="card-footer-item" @click="onRemoveClick" v-cursor
								>Remove</span
							>
						</footer>
					</transition>
				</div>
			</transition>
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
	data() {
		return {
			isContentHovered: false,
		}
	},
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
		onContentEnter() {
			this.isContentHovered = true
		},
		onContentLeave() {
			this.isContentHovered = false
		},
		onRemoveClick() {
			this.$store.dispatch('guest/removeReading', this.slug)
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

.setted-width {
	width: 250px;
}

.content-enter-active,
.content-leave-active {
	transition: opacity 0.5s, max-height 0.5s;
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
	transition: opacity 0.5s, max-height 0.5s;
	opacity: 1;
	max-height: 50px;
}
.footer-enter,
.footer-leave-to {
	opacity: 0;
	max-height: 0px;
}
</style>
