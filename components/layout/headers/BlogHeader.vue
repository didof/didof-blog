<template>
	<nav
		class="navbar header has-shadow is-primary"
		role="navigation"
		aria-label="main navigation"
	>
		<div class="navbar-brand">
			<NuxtLink to="/blog"><h1 class="title">Blog</h1></NuxtLink>
		</div>
	</nav>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	name: 'blog-header',
})
</script>

<style scoped>
nav {
	width: 100%;
}
</style>
