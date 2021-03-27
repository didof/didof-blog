<template>
	<b-carousel :indicator-inside="false">
		<b-carousel-item
			v-for="(item, index) in items"
			:key="`the-topic-carousel-${index}`"
			:autoPlay="true"
			:pauseHover="true"
			:interval="2000"
			:repeat="true"
			pauseType="is-primary"
			:drag="true"
		>
			<span class="image relative" @click="onClick(item.topic)" v-cursor>
				<DeferredImage
					class="absolute"
					:width="width"
					:height="height * 0.7"
					:lowSrc="getSrc('low', item.topic)"
					:highSrc="getSrc('high', item.topic)"
				/>
				<span class="absolute title">{{ item.topic }}</span>
			</span>
		</b-carousel-item>
		<template #indicators="props">
			<span class="al image">
				<DeferredImage
					:width="300"
					:height="200"
					:lowSrc="getSrc('low', items[props.i].topic)"
					:highSrc="getSrc('high', items[props.i].topic)"
				/>
			</span>
		</template>
	</b-carousel>
</template>

<script>
import Vue from 'vue'
import DeferredImage from '~/components/image/DeferredImage'
import { windowHeight, windowWidth } from '~/mixins'
import { useRoute, useRouter } from '@nuxtjs/composition-api'

export default Vue.extend({
	name: 'the-macro-carousel',
	mixins: [windowHeight, windowWidth],
	components: {
		DeferredImage,
	},
	props: {
		items: {
			type: Array,
			require: true,
		},
	},
	setup() {
		const route = useRoute()
		const router = useRouter()

		function getSrc(resolution, topic) {
			return require(`~/assets/images/topic/${resolution}Res-${topic}.png`)
		}

		function onClick(topic) {
			const { macro } = route.value.params
			router.push({
				name: 'blog-macro-topic',
				params: { macro, topic },
			})
		}

		return {
			getSrc,
			onClick,
		}
	},
})
</script>

<style>
.is-active .al img {
	filter: grayscale(0%);
}
.al img {
	filter: grayscale(100%);
}

.relative {
	position: relative;
}

.absolute.title {
	position: absolute;
	top: 30px;
	left: 50px;
	font-size: 72px;
}
</style>
