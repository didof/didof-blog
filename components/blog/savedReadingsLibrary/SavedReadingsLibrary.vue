<template>
	<aside>
		<Draggable v-model="savedReadings">
			<transition-group>
				<SavedReadingShelf
					v-for="reading in savedReadings"
					:key="reading.slug"
					:title="reading.title"
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
	computed: {
		savedReadings: {
			get() {
				return this.$store.getters['guest/savedReadings']
			},
			set(value) {
				this.$store.dispatch('guest/updateSavedReadingsOrder', value)
			},
		},
	},
})
</script>
