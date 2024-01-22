import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import { v4 as uuid }	from '@lukeed/uuid';

describe('with name', () => {
	const randomName = uuid();

	before(() => {
		helpers.prepareTemporaryDir();

		return helpers
			.run(path.join(process.cwd(), '/generators/app/index.mjs'))
			.withAnswers({
				name: randomName,
			});

	});

	it ('uses correct name', () => {
		assert.fileContent('installer.nsi', new RegExp(`Name "${randomName}"`));
	});
});

describe('with ampersand name', () => {
	const randomName1 = uuid();
	const randomName2 = uuid();

	before(() => {
		helpers.prepareTemporaryDir();

		return helpers
			.run(path.join(process.cwd(), '/generators/app/index.mjs'))
			.withAnswers({
				name: `${randomName1} & ${randomName2}`,
			});

	});

	it ('uses correct name', () => {
		assert.fileContent('installer.nsi', new RegExp(`Name "${randomName1} & ${randomName2}" "${randomName1} && ${randomName2}"`));
	});
});

[false, true].map(unicode => {
	describe(`without ${unicode}`, () => {
		before(() => {
			helpers.prepareTemporaryDir();

			return helpers
				.run(path.join(process.cwd(), '/generators/app/index.mjs'))
				.withAnswers({
					unicode,
				});

		});

		it(`has Unicode set to ${unicode}`, () => {
			assert.fileContent('installer.nsi', new RegExp(`Unicode ${unicode}`));
		});
	});
});

['user', 'highest', 'admin', 'none'].map(elevation => {
	describe(`with elevation set to ${elevation}`, () => {
		before(() => {
			helpers.prepareTemporaryDir();

			return helpers
				.run(path.join(process.cwd(), '/generators/app/index.mjs'))
				.withAnswers({
					elevation,
				});

		});

		it(`has RequestExecutionLevel set to ${elevation}`, () => {
			assert.fileContent('installer.nsi', new RegExp(`RequestExecutionLevel ${elevation}`));
		});
	});
});
