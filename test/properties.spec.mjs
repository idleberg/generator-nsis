// import path from 'path';
import assert from 'yeoman-assert';
import { helper } from './__helper.mjs';
import { v4 as uuid } from '@lukeed/uuid';

describe('with name', () => {
	const randomName = uuid();

	before(() => helper({
		name: randomName,
	}));

	it('uses correct name', () => {
		assert.fileContent('installer.nsi', new RegExp(`Name "${randomName}"`));
	});
});

describe('with ampersand name', () => {
	const randomName1 = uuid();
	const randomName2 = uuid();

	before(() => helper({
		name: `${randomName1} & ${randomName2}`,
	}));

	it('uses correct name', () => {
		assert.fileContent('installer.nsi', new RegExp(`Name "${randomName1} & ${randomName2}" "${randomName1} && ${randomName2}"`));
	});
});

[false, true].map(unicode => {
	describe(`without ${unicode}`, () => {
		before(() => helper({
			unicode,
		}));

		it(`has Unicode set to ${unicode}`, () => {
			assert.fileContent('installer.nsi', new RegExp(`Unicode ${unicode}`));
		});
	});
});

['user', 'highest', 'admin', 'none'].map(elevation => {
	describe(`with elevation set to ${elevation}`, () => {
		before(() => helper({
			elevation,
		}));

		it(`has RequestExecutionLevel set to ${elevation}`, () => {
			assert.fileContent('installer.nsi', new RegExp(`RequestExecutionLevel ${elevation}`));
		});
	});
});
