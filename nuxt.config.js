export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Didof',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'~/assets/css/main',
		'~/assets/css/transitions',
		'~/assets/css/animations/animate-enter.css',
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~plugins/registerBaseComponents.js',
		'~/plugins/directives/animateEnter.client.js',
		'~/plugins/directives/cursor.client.js',
		'~/plugins/directives/observe.client.js',
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/buefy
		'nuxt-buefy',
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		// https://go.nuxtjs.dev/content
		'@nuxt/content',
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: 'en',
		},
	},

	// Content module configuration: https://go.nuxtjs.dev/config-content
	content: {},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},
}
