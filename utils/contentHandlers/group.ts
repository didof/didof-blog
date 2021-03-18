import { IContentDocument } from '@nuxt/content/types/content'

interface groupObject {
	macro?: string
	topic?: string
	amount: number
}

export function groupWithAmount(
	articles: IContentDocument | IContentDocument[],
	level: 'macro' | 'topic'
) {
	const levelIndex = {
		macro: 1,
		topic: 2,
	}

	return articles.reduce(
		(groups: Array<groupObject>, article: IContentDocument) => {
			const target = article.path.split('/')[levelIndex[level]]

			const foundIndex = groups.findIndex(el => el[level] === target)

			if (Boolean(~foundIndex)) {
				const incrementedAmount = groups[foundIndex].amount + 1
				groups.splice(foundIndex, 1, {
					[level]: target,
					amount: incrementedAmount,
				})
			} else {
				groups = [...groups, { [level]: target, amount: 1 }]
			}

			return groups
		},
		[]
	)
}
