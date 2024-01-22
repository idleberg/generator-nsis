import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

describe('with license', () => {
	before(() => {
		helpers.prepareTemporaryDir();

		return helpers
			.run(path.join(process.cwd(), '/generators/app/index.mjs'))
			.withAnswers({
				name: 'demo',
				pages: ['license'],
				spdxQuestion: true,
				spdxLicense: 'MIT'
			});

	});

	it('creates files', () => {
		assert.file([
			'installer.nsi',
			'license.txt',
		]);
	});
});
