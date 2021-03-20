export default class SavedReading {
	macro: string
	topic: string
	slug: string

	constructor(path: string, public title: string, public description: string) {
		const [_, macro, topic, slug] = path.split('/')
		this.macro = macro
		this.topic = topic
		this.slug = slug
	}
}
