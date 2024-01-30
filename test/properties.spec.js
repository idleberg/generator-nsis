import { helper } from './__helper.js';
import { suite } from 'uvu';
import { v4 as uuid } from '@lukeed/uuid';
import * as choices from '../generators/lib/choices.js';
import assert from 'yeoman-assert';

const NameTest = suite('with name');
const randomName = uuid();

NameTest.before.each(() =>
	helper({
		name: randomName,
	})
);

NameTest('uses correct name', () => {
	assert.fileContent('installer.nsi', `Name "${randomName}"`);
});

NameTest.run();

const AmpersandNameTest = suite('with ampersand name');
const randomName1 = uuid();
const randomName2 = uuid();

AmpersandNameTest.before.each(() =>
	helper({
		name: `${randomName1} & ${randomName2}`,
	})
);

AmpersandNameTest('uses correct name', () => {
	assert.fileContent('installer.nsi', `Name "${randomName1} & ${randomName2}" "${randomName1} && ${randomName2}"`);
});

AmpersandNameTest.run();

choices.binary.forEach(unicode => {
	const UnicodeTest = suite(`without ${unicode}`);

	UnicodeTest.before.each(() =>
		helper({
			unicode,
		})
	);

	UnicodeTest(`has Unicode set to ${unicode}`, () => {
		assert.fileContent('installer.nsi', `Unicode ${unicode}`);
	});

	UnicodeTest.run();
});

choices.elevation.forEach(elevation => {
	const ElevationTest = suite(`with elevation set to ${elevation}`);

	ElevationTest.before.each(() =>
		helper({
			elevation,
		})
	);

	ElevationTest(`has RequestExecutionLevel set to ${elevation}`, () => {
		assert.fileContent('installer.nsi', `RequestExecutionLevel ${elevation}`);
	});

	ElevationTest.run();
});

choices.compression.forEach(compression => {
	const CompressionTest = suite(`with compression set to ${compression}`);

	CompressionTest.before.each(() =>
		helper({
			compression,
		})
	);

	CompressionTest(`has SetCompressor set to ${compression}`, () => {
		assert.fileContent('installer.nsi', `SetCompressor ${compression}`);
	});

	CompressionTest.run();
});

Object.keys(choices.includes)
	.filter(include => include.value)
	.forEach(page => {
		const PageTest = suite(`with pages including ${page}`);

		PageTest.before.each(() =>
			helper({
				pages: [page],
			})
		);

		PageTest(`has Page set to ${page}`, () => {
			assert.fileContent('installer.nsi', `Page ${page}`);
		});

		PageTest.run();
	});

Object.keys(choices.includes)
	.filter(include => include.value)
	.forEach(page => {
		const PageMUI2Test = suite(`with pages including ${page} (MUI2)`);

		PageMUI2Test.before.each(() =>
			helper({
				includes: ['MUI2'],
				pages: [page],
			})
		);

		PageMUI2Test(`has Page set to ${page}`, () => {
			assert.fileContent('installer.nsi', `!insertmacro MUI_PAGE_${page.toUpperCase()}`);
		});

		PageMUI2Test.run();
	});
