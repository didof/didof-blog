<template>
	<aside>
		<Draggable v-model="savedReadings" @update="onUpdate" v-bind="dragOptions">
			<transition-group name="shelfs">
				<SavedReadingShelf
					v-for="reading in savedReadings"
					:key="reading.slug"
					:title="reading.title"
					:slug="reading.slug"
					:is-expanded="expandedSlug === reading.slug"
					@expand="onExpand"
					@collapse="onCollapse"
				/>
			</transition-group>
		</Draggable>
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
				animation: 200,
				group: 'description',
				disabled: false,
				ghostClass: 'ghost',
			}
		},
	},
	methods: {
		onUpdate(event) {
			console.log(event)
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
	transition: transform 0.5s, opacity 0.5s;
	transform: translateX(0);
	opacity: 1;
}
.shelfs-enter,
.shelfs-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
</style>
