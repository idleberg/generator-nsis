import { basename, extname, resolve } from 'node:path';
import { meta as languageData } from '@nsis/language-data';
import { glob } from 'glob';
import { nsisDir } from 'makensis';
import spdxLicenseList from 'spdx-license-list/full.js';
import terminalLink from 'terminal-link';
import { includes as bundledLibraries } from './choices.js';

const spdxCodes = Object.getOwnPropertyNames(spdxLicenseList).sort();

export const licenseChoices = spdxCodes.map((obj) => {
	const licenses = {};
	licenses.name = terminalLink(obj, `https://spdx.org/licenses/${obj}.html`, {
		fallback: true,
	});
	licenses.value = obj;

	return licenses;
});

export const getAllLibraries = async () => {
	const nsisPath = await nsisDir();
	const includeDir = resolve(nsisPath, 'Include');

	const headerFiles = await glob([`${includeDir}/*.nsh`, `!${includeDir}/MUI.nsh`], {
		ignore: bundledLibraries.map((excludedFile) => `${includeDir}/${excludedFile.value}.nsh`),
	});

	const customHeaders = headerFiles.map((headerFile) => {
		return {
			name: `${basename(headerFile)} [3rd party]`,
			value: basename(headerFile, extname(headerFile)),
			checked: false,
		};
	});

	const allLibraries = [...bundledLibraries, ...customHeaders];

	return allLibraries.sort((a, z) => a.value.localeCompare(z.value));
};

export function getLanguageChoices(disabled) {
	const languageChoices = Object.entries(languageData).map(([key, value]) => {
		const isDisabled = key === 'English' ? disabled : false;

		// Use long names
		return {
			name: value.english || key,
			value: key,
			disabled: isDisabled,
		};
	});

	// Sort names
	languageChoices.sort((a, z) => {
		if (a.name < z.name) {
			return -1;
		}

		if (a.name > z.name) {
			return 1;
		}

		return 0;
	});

	return languageChoices;
}
