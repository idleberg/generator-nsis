import assert from 'yeoman-assert';
import { helper } from './__helper.mjs';
import { bundledLibraries } from '../generators/lib/helpers.mjs';

const libraries = bundledLibraries.map(({ name }) => name);

libraries.map(library => {
	describe(`includes ${library}`, () => {
		before(() => helper({
			includes: [library],
		}));

		it(`has !include set to ${library}`, () => {
			assert.fileContent('installer.nsi', new RegExp(`!include "${library}"`));
		});
	});
});
