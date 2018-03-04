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
	extends: 'airbnb-base',
	rules: {
		'linebreak-style': [
			'error',
			'unix'
		]
	}
};
