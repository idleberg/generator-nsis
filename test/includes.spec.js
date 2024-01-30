import { helper } from './__helper.js';
import { includes } from '../generators/lib/choices.js';
import { suite } from 'uvu';
import assert from 'yeoman-assert';

const includesNames = includes.map(({ value }) => `${value}.nsh`);

/**
 * alls built-ins
 */
const IncludeTest = suite(`with all built-ins`);

IncludeTest.before.each(() => helper({
	includes: includesNames,
}));

includesNames.forEach(include => {
	IncludeTest(`has !include set to ${include}`, () => {
		assert.fileContent('installer.nsi', `!include "${include}"`);
	});
});

IncludeTest.run();

/**
 * single built-ins
 */
includesNames.forEach(include => {
	const IncludeTest = suite(`with ${include}`);

	IncludeTest.before.each(() => helper({
		includes: [include],
	}));

	IncludeTest(`has !include set to ${include}`, () => {
		assert.fileContent('installer.nsi', `!include "${include}"`);
	});

	IncludeTest.run();
});
