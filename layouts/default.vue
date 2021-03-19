<template>
	<div>
		<nav
			class="navbar header has-shadow is-primary"
			role="navigation"
			aria-label="main navigation"
		>
			<div class="navbar-brand">
				<NuxtLink to="/blog"><h1 class="title">Blog</h1></NuxtLink>
			</div>
		</nav>

		<NuxtLink :to="'/blog'">blog</NuxtLink>

		{{ test }} {{ firstTime }}
		<div class="container is-fluid">
			<nuxt />
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		test() {
			return this.$store.getters['guest/name']
		},
		firstTime() {
			return this.$store.getters['guest/hasRenamed']
		},
	},
	mounted() {
		if (process.server) return

		const hasRenamed = this.$store.getters['guest/hasRenamed']

		if (!hasRenamed) {
			const newName = prompt('gimme new name')
			this.$store.dispatch({ type: 'guest/rename', payload: newName })
			this.$store.dispatch({ type: 'guest/hasRenamed' })
		}
	},
}
</script>
