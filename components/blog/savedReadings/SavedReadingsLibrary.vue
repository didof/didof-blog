<template>
	<aside @mouseenter="onLibraryEnter" @mouseleave="onLibraryLeave">
		<Draggable
			v-model="savedReadings"
			:move="checkMove"
			v-bind="dragOptions"
			tag="div"
		>
			<transition-group name="shelfs">
				<SavedReadingShelf
					v-for="reading in savedReadings"
					:key="reading.slug"
					:title="reading.title"
					:description="reading.description"
					:macro="reading.macro"
					:topic="reading.topic"
					:slug="reading.slug"
					:is-expanded="expandedSlug === reading.slug"
					@expand="onExpand"
					@collapse="onCollapse"
					@removed="onRemoved"
				/>
			</transition-group>
		</Draggable>
	</aside>
</template>

<script>
import Vue from 'vue'
import Draggable from 'vuedraggable'
import { SavedReading } from '~/entities'
import SavedReadingShelf from './SavedReadingShelf.vue'
import SavedReadingsNotification from './SavedReadingsNotification.vue'

export default Vue.extend({
	name: 'saved-readings-library',
	components: {
		Draggable,
		SavedReadingShelf,
		SavedReadingsNotification,
	},
	data() {
		return {
			listLength: 0,
			expandedSlug: null,
		}
	},
	beforeDestroy() {
		this.$store.dispatch('notification/reset')
	},
	computed: {
		savedReadings: {
			get() {
				const savedReadings = this.$store.getters['guest/savedReadings']
				this.listLength = savedReadings ? savedReadings.length : 0
				return savedReadings
			},
			set(value) {
				this.$store.dispatch('guest/updateSavedReadingsOrder', value)
			},
		},
		dragOptions() {
			return {
				animation: 300,
				disabled: false,
				ghostClass: 'ghost',
			}
		},
	},
	watch: {
		listLength(current, previous) {
			if (!current.length)
				this.$store.dispatch('notification/setVisibility', false)
			if (current < previous) {
			}
		},
	},
	methods: {
		checkMove({ draggedContext }) {
			const { index } = draggedContext
			const { slug } = this.savedReadings[index]
			return slug === this.expandedSlug
		},
		onExpand(slug) {
			this.expandedSlug = slug
		},
		onCollapse() {
			this.expandedSlug = null
		},
		onLibraryEnter() {
			this.$store.dispatch('notification/setVisibility')
			this.$store.dispatch('notification/setDismissability', false)
			this.$store.dispatch('notification/setContent', SavedReadingsNotification)
		},
		onLibraryLeave() {
			this.$store.dispatch('notification/setVisibility', false)
		},
		onRemoved({ macro, topic, slug, title, description }) {
			this.$store.dispatch('guest/removeReading', slug)
			this.$buefy.snackbar.open({
				duration: 3000,
				message: `Post ${title} removed`,
				type: 'is-info',
				position: 'is-bottom-left',
				actionText: 'Undo',
				queue: false,
				onAction: () => {
					const path = `/blog/${macro}/${topic}/${slug}`
					const savedReading = new SavedReading(path, title, description)
					this.$store.dispatch('guest/saveReading', savedReading)

					this.$buefy.toast.open({
						duration: 1000,
						message: `${title} restored`,
						queue: false,
					})
				},
			})
		},
	},
})
</script>

<style scoped>
.shelfs-enter-active,
.shelfs-leave-active {
	transition: transform 0.5s ease-in-out, opacity 0.7s ease-in-out;
	transform: translateX(0);
	opacity: 1;
}
.shelfs-enter,
.shelfs-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

aside {
	perspective: 800px;
}

div {
	transition: 0.8s ease-in-out;
	transform-style: preserve-3d;
	transform: rotateY(-5deg);
}

div:hover {
	transform: rotateY(0);
}

.ghost {
	transform: translateZ(50px) rotateY(2deg);
}

.sortable-chosen {
	transform: translateZ(10px);
}
</style>
