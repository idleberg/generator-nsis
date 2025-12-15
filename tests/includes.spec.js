import { suite } from 'uvu';
import assert from 'yeoman-assert';
import { includes } from '../lib/choices.js';
import { helper } from './__helper.js';

const includesNames = includes.map(({ value }) => value);

/**
 * alls built-ins
 */
const IncludeTest = suite('with all built-ins');

IncludeTest.before(() =>
	helper({
		includes: includesNames,
	}),
);

includesNames.forEach((include) => {
	IncludeTest(`has !include set to ${include}.nsh`, () => {
		assert.fileContent('installer.nsi', `!include "${include}.nsh"`);
	});
});

IncludeTest.run();

/**
 * single built-ins
 */
includesNames.forEach((include) => {
	const IncludeTest = suite(`with ${include}`);

	IncludeTest.before(() =>
		helper({
			includes: [include],
		}),
	);

	IncludeTest(`has !include set to ${include}.nsh`, () => {
		assert.fileContent('installer.nsi', `!include "${include}.nsh"`);
	});

	IncludeTest.run();
});
