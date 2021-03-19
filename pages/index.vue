<template>
	<section class="container has-text-centered">
		<h1 class="title">didof</h1>
	</section>
</template>

<script>
import monke from '~/easter-eggs/monke'

export default {
	name: 'home-page',
	layout: 'home-page',
	beforeMount() {
		monke.register()
	},
	beforeDestroy() {
		monke.unregister()
	},
}
</script>
