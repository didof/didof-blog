<template>
	<section class="panel">
		<p class="panel-heading">Cockpit</p>
		<p class="panel-tabs">
			<a
				v-for="(tab, index) in tabs"
				:key="`panel-tab-${index}`"
				:class="getTabClass(index)"
				@click="setActiveTabIndex(index)"
				>{{ tab.label }}</a
			>
		</p>
		<a class="panel-block">
			<span class="panel-icon">
				<i class="fas fa-book" aria-hidden="true"></i>
			</span>
			{{ panelContent }}
		</a>
	</section>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	data() {
		return {
			activeTabIndex: 0,
			tabs: [
				{
					label: 'layout',
				},
				{
					label: 'config',
				},
			],
		}
	},
	methods: {
		getTabClass(index) {
			return { 'is-active': index === this.activeTabIndex }
		},
		setActiveTabIndex(index) {
			this.activeTabIndex = index
		},
	},
	computed: {
		panelContent() {
			return this.tabs[this.activeTabIndex].label
		},
	},
})
</script>
