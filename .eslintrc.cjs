module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:json/recommended'
	],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
	}
};
