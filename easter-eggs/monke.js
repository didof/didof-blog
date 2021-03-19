import { setStyles } from '~/utils/vanilla'

const monke = (() => {
	const letters = ['m', 'o', 'n', 'k', 'e']
	const record = []

	const addKey = ({ key }) => {
		if (!letters.includes(key)) return
		record.push(key)
		if (key === 'e') checkIfMonke()
	}

	const checkIfMonke = () => {
		const isMonke = record.splice(record.length - 5).join('')
		if (isMonke === 'monke') {
			const img = document.createElement('img')
			img.src =
				'https://external-preview.redd.it/vxPXEGgL4v8mCGw06IFGsmJNtqWQg-z60xQQ79dHKPY.jpg?auto=webp&s=db7685262e9b352a4888e547f52a244e2ea2cb9f'
			setStyles(img, {
				position: 'fixed',
				height: '100%',
				zIndex: '100',
			})
			document.body.prepend(img)
			setTimeout(() => {
				document.body.removeChild(img)
			}, 100)
			unregister()
		}
	}

	const register = () => {
		document.addEventListener('keydown', addKey)
	}

	const unregister = () => {
		document.removeEventListener('keydown', addKey)
	}

	return { register, unregister }
})()

export default monke
