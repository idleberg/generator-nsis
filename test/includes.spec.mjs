import { suite } from 'uvu';
import assert from 'yeoman-assert';
import { helper } from './__helper.mjs';
import { includes } from '../generators/lib/choices.mjs';

const includesNames = includes.map(({ name }) => name);

includesNames.forEach(include => {
	const IncludeTest = suite(`includes built-in ${include}`);

	IncludeTest.before.each(() => helper({
		includes: [include],
	}));

	IncludeTest(`has !include set to ${include}`, () => {
		assert.fileContent('installer.nsi', `!include "${include}"`);
	});

	IncludeTest.run();
});
