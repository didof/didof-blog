<template>
	<aside>
		<Draggable v-model="savedReadings">
			<div v-for="reading in savedReadings" :key="reading.slug">
				<pre>{{ reading }}</pre>
			</div>
		</Draggable>
	</aside>
</template>

<script>
import Vue from 'vue'
import Draggable from 'vuedraggable'

export default Vue.extend({
	name: 'saved-readings-library',
	components: {
		Draggable,
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
