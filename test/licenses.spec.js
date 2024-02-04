import { helper } from './__helper.js';
import { suite } from 'uvu';
import assert from 'yeoman-assert';
import spdxLicenseList from 'spdx-license-list/full.js';

let sortedLicenseList = {};

Object.keys(spdxLicenseList)
	.sort()
	.forEach(key => {
		sortedLicenseList[key] = spdxLicenseList[key];
	});

Object.entries(sortedLicenseList).forEach(([licenseName, licenseData]) => {
	const LicenseTest = suite(`with ${licenseName} (Uncode)`);

	LicenseTest.before.each(() =>
		helper({
			spdxLicense: licenseName,
			pages: ['license'],
		})
	);

	LicenseTest(`has ${licenseName} (Unicode)`, () => {
		assert.fileContent('license.txt', licenseData.licenseText);
	});

	LicenseTest.run();
});

Object.entries(sortedLicenseList).forEach(([licenseName, licenseData]) => {
	const LicenseTest = suite(`with ${licenseName} (ANSI)`);

	LicenseTest.before.each(() =>
		helper({
			unicode: false,
			spdxLicense: licenseName,
			pages: ['license'],
		})
	);

	LicenseTest(`has ${licenseName} (ANSI)`, () => {
		assert.fileContent('license.txt', licenseData.licenseText.split('\n').join('\r\n'));
	});

	LicenseTest.run();
});
