module.exports = {
	env: {
		node: true,
		es6: true
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 7,
		sourceType: 'module'
	},
	extends: 'eslint:recommended',
	rules: {
		indent: [
			'error',
			4
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		quotes: [
			'error',
			'single'
		],
		semi: [
			'error',
			'always'
		]
	}
}
