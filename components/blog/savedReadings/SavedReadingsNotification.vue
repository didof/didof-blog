<template>
	<div v-animate-enter:slide.right>
		<slot name="delete"></slot>
		<span class="tag is-medium" :class="alternateTagColor"> Ctrl </span>
		+
		<span class="tag is-medium is-dark"> Click </span>
		= delete
	</div>
</template>

<script>
import Vue from 'vue'
import { KeysWatcher } from '~/utils/watchers'
const keyToWatch = 'Control'

export default Vue.extend({
	name: 'saved-readings-notification',
	data() {
		return {
			keysWatcher: null,
		}
	},
	computed: {
		alternateTagColor() {
			const isCtrlPressed = this.keysWatcher.pressedKeys.includes(keyToWatch)
			return {
				'is-dark': !isCtrlPressed,
				'is-primary': isCtrlPressed,
			}
		},
	},
	created() {
		this.keysWatcher = new KeysWatcher([keyToWatch])
	},
	beforeDestroy() {
		this.keysWatcher.unregister()
	},
})
</script>
