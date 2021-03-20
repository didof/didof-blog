<template>
	<div class="container is-fluid">
		<h1 class="title">Test area</h1>

		<Draggable v-model="mock">
			<transition-group>
				<div
					v-for="(element, index) in mock"
					:key="`test-${index}`"
					class="box"
				>
					{{ element }}
				</div>
			</transition-group>
		</Draggable>
	</div>
</template>

<script>
import Vue from 'vue'
import Draggable from 'vuedraggable'

export default Vue.extend({
	components: {
		Draggable,
	},
	data() {
		return {
			mock: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		}
	},
})
</script>
