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

export default Vue.extend({
	name: 'the-macro-carousel',
	mixins: [windowHeight, windowWidth],
	props: {
		items: {
			type: Array,
			require: true,
		},
	},
	components: {
		DeferredImage,
	},
	methods: {
		getSrc(res, topic) {
			return require(`~/assets/images/topic/${res}Res-${topic}.png`)
		},
		onClick(topic) {
			this.$router.push({
				name: 'blog-macro-topic',
				params: { macro: this.$route.params.macro, topic },
			})
		},
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
