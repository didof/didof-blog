<template>
	<section class="container has-text-centered">
		<h1 class="title">didof</h1>
	</section>
</template>

<script>
import monke from '~/easter-eggs/monke'

export default {
	name: 'homepage',
	layout: 'homepage',
	beforeMount() {
		monke.register()
	},
	beforeDestroy() {
		monke.unregister()
	},
}
</script>
