import { basename, extname, resolve } from 'node:path';
import { glob } from 'glob';
import { meta as languageData } from '@nsis/language-data';
import { nsisDir } from 'makensis';
import spdxLicenseList from 'spdx-license-list/full.js';
import terminalLink from 'terminal-link';

const docsURL = 'https://github.com/NSIS-Dev/Documentation/tree/master';
const spdxCodes = Object.getOwnPropertyNames(spdxLicenseList).sort();

export const licenseChoices = spdxCodes.map(obj => {
	const licenses = {};
	licenses['name'] = terminalLink(obj, `https://spdx.org/licenses/${obj}.html`, {
		fallback() {
			return obj;
		}
	});
	licenses['value'] = obj;

	return licenses;
});

export const getAllLibraries = async () => {
	const nsisPath = await nsisDir();
	const includeDir = resolve(nsisPath, 'Include')

	const headerFiles = await glob([`${includeDir}/*.nsh`, `!${includeDir}/MUI.nsh`], {
		ignore: bundledLibraries.map(excludedFile => `${includeDir}/${excludedFile.value}.nsh`)
	});

	const customHeaders = headerFiles.map(headerFile => {
		return {
			name: `${basename(headerFile)} [3rd party]`,
			value: basename(headerFile, extname(headerFile)),
			checked: false
		}
	});

	const allLibraries = [...bundledLibraries, ...customHeaders];

	return allLibraries.sort((a, z) => a.value.localeCompare(z.value));
};

export function getLanguageChoices(disabled) {
	const languageChoices = Object.entries(languageData).map(([key, value]) => {
		const isDisabled = (key === 'English') ? disabled : false;

		// Use long names
		return {
			name: value.english || key,
			value: key,
			disabled: isDisabled
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

export const bundledLibraries = [
	{
		name: 'Colors.nsh',
		value: 'Colors',
		checked: false
	},
	{
		name: terminalLink('FileFunc.nsh', `${docsURL}/Includes/FileFunc`, {
			fallback() {
				return 'FileFunc.nsh';
			}
		}),
		value: 'FileFunc',
		checked: false
	},
	{
		name: 'InstallOptions.nsh',
		value: 'InstallOptions',
		checked: false
	},
	{
		name: 'Integration.nsh',
		value: 'Integration',
		checked: false
	},
	{
		name: 'LangFile.nsh',
		value: 'LangFile',
		checked: false
	},
	{
		name: 'Library.nsh',
		value: 'Library',
		checked: false
	},
	{
		name: terminalLink('LogicLib.nsh', `${docsURL}/Includes/LogicLib`, {
			fallback() {
				return 'LogicLib.nsh';
			}
		}),
		value: 'LogicLib',
		checked: false
	},
	{
		name: terminalLink('Memento.nsh', `${docsURL}/Includes/Memento`, {
			fallback() {
				return 'Memento.nsh';
			}
		}),
		value: 'Memento',
		checked: false
	},
	{
		name: 'MUI2.nsh',
		value: 'MUI2',
		checked: false
	},
	{
		name: 'MultiUser.nsh',
		value: 'MultiUser',
		checked: false
	},
	{
		name: 'nsDialogs.nsh',
		value: 'nsDialogs',
		checked: false
	},
	{
		name: 'Sections.nsh',
		value: 'Sections',
		checked: false
	},
	{
		name: terminalLink('StrFunc.nsh', `${docsURL}/Includes/StrFunc`, {
			fallback() {
				return 'StrFunc.nsh';
			}
		}),
		value: 'StrFunc',
		checked: false
	},
	{
		name: terminalLink('TextFunc.nsh', `${docsURL}/Includes/TextFunc`, {
			fallback() {
				return 'TextFunc.nsh';
			}
		}),
		value: 'TextFunc',
		checked: false
	},
	{
		name: 'UpgradeDLL.nsh',
		value: 'UpgradeDLL',
		checked: false
	},
	{
		name: 'Util.nsh',
		value: 'Util',
		checked: false
	},
	{
		name: 'VB6RunTime.nsh',
		value: 'VB6RunTime',
		checked: false
	},
	{
		name: 'VPatchLib.nsh',
		value: 'VPatchLib',
		checked: false
	},
	{
		name: 'WinCore.nsh',
		value: 'WinCore',
		checked: false
	},
	{
		name: 'WinMessages.nsh',
		value: 'WinMessages',
		checked: false
	},
	{
		name: terminalLink('WinVer.nsh', `${docsURL}/Includes/WinVer`, {
			fallback() {
				return 'WinVer.nsh';
			}
		}),
		value: 'WinVer',
		checked: false
	},
	{
		name: terminalLink('WordFunc.nsh', `${docsURL}/Includes/WordFunc`, {
			fallback() {
				return 'WordFunc.nsh';
			}
		}),
		value: 'WordFunc',
		checked: false
	},
	{
		name: terminalLink('x64.nsh', `${docsURL}/Includes/x64`, {
			fallback() {
				return 'x64.nsh';
			}
		}),
		value: 'x64',
		checked: false
	}
];
