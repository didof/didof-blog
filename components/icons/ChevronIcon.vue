<template>
	<span class="icon">
		<FontAwesomeIcon fas :icon="`chevron-${this.direction}`" />
	</span>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	name: 'chevron-icon',
	props: {
		direction: {
			type: String,
			default: 'down',
		},
	},
})
</script>
