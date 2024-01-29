import { helper } from './__helper.mjs';
import { includes } from '../generators/lib/choices.mjs';
import { suite } from 'uvu';
import assert from 'yeoman-assert';

const includesNames = includes.map(({ name }) => name);

/**
 * alls built-ins
 */
const IncludeTest = suite(`includes all built-ins`);

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
	const IncludeTest = suite(`includes built-in ${include}`);

	IncludeTest.before.each(() => helper({
		includes: [include],
	}));

	IncludeTest(`has !include set to ${include}`, () => {
		assert.fileContent('installer.nsi', `!include "${include}"`);
	});

	IncludeTest.run();
});
