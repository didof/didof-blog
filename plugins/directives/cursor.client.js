import Vue from 'vue'

const VALID_CURSOR_TYPES = [
	'auto',
	'default',
	'none',
	'context-menu',
	'help',
	'pointer',
	'progress',
	'wait',
	'cell',
	'crosshair',
	'text',
	'vertical-text',
	'alias',
	'copy',
	'move',
	'no-drop',
	'not-allowed',
	'grab',
	'grabbing',
	'all-scroll',
	'col-resize',
	'row-resize',
	'n-resize',
	'e-resize',
	's-resize',
	'w-resize',
	'ne-resize',
	'nw-resize',
	'se-resize',
	'sw-resize',
	'ew-resize',
	'ns-resize',
	'nesw-resize',
	'nwse-resize',
	'zoom-in',
	'zoom-out',
]

Vue.directive('cursor', {
	bind: (el, binding) => {
		const cursorType = binding.arg || 'pointer'
		if (VALID_CURSOR_TYPES.includes(cursorType)) el.style.cursor = cursorType
		else console.warn(`[v-cursor] The value ${cursorType} is not recognized`)
	},
})
