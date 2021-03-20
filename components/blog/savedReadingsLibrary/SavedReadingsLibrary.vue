<template>
	<aside>
		<div>
			<Draggable
				v-model="savedReadings"
				@update="onUpdate"
				:move="checkMove"
				v-bind="dragOptions"
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
					/>
				</transition-group>
			</Draggable>
		</div>
	</aside>
</template>

<script>
import Vue from 'vue'
import Draggable from 'vuedraggable'
import SavedReadingShelf from './SavedReadingShelf.vue'

export default Vue.extend({
	name: 'saved-readings-library',
	components: {
		Draggable,
		SavedReadingShelf,
	},
	data() {
		return {
			expandedSlug: null,
		}
	},
	computed: {
		savedReadings: {
			get() {
				return this.$store.getters['guest/savedReadings']
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
	methods: {
		onUpdate(event) {
			// toaster
		},
		checkMove({ draggedContext }) {
			const { index } = draggedContext
			const { slug } = this.savedReadings[index]
			return slug === this.expandedSlug
		},
		onExpand(slug) {
			this.expandedSlug = slug
		},
		onCollapse(slug) {
			this.expandedSlug = null
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
