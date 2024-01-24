import { helper } from './__helper.mjs';
import assert from 'yeoman-assert';

describe('with license', () => {
	before(() => helper({
		name: 'demo',
		pages: ['license'],
		spdxQuestion: true,
		spdxLicense: 'MIT'
	}));

	it('creates files', () => {
		assert.file([
			'installer.nsi',
			'license.txt',
		]);
	});
});
