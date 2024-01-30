module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:json/recommended'
	],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
};
