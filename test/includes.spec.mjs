import assert from 'yeoman-assert';
import { helper } from './__helper.mjs';
import { includes } from '../generators/lib/choices.mjs';

const includesNames = includes.map(({ name }) => name);

includesNames.map(include => {
	describe(`includes built-in ${include}`, () => {
		before(() => helper({
			includes: [include],
		}));

		it(`has !include set to ${include}`, () => {
			assert.fileContent('installer.nsi', new RegExp(`!include "${include}"`));
		});
	});
});
