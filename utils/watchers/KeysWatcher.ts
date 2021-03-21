export default class KeysWatcher {
	constructor(private watchKeys: String[]) {
		this._register()
	}
	keys: String[] = []

	get pressedKeys() {
		return this.keys
	}

	private _register() {
		window.addEventListener('keydown', this._keydown)
		window.addEventListener('keyup', this._keyup)
	}

	unregister() {
		window.removeEventListener('keydown', this._keydown)
		window.removeEventListener('keyup', this._keyup)
	}

	private _keydown = (event: KeyboardEvent) => {
		const { key } = event
		if (this.watchKeys.includes(key) && !this.keys.includes(key))
			this.keys.push(key)
	}

	private _keyup = (event: KeyboardEvent) => {
		const { key } = event
		const index = this.keys.indexOf(key)
		if (Boolean(~index)) this.keys.splice(index, 1)
	}
}
