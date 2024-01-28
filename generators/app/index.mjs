
import { meta as languageData } from '@nsis/language-data';

import { getAllLibraries, getLanguageChoices, licenseChoices } from '../lib/helpers.mjs';
import * as choices from '../lib/choices.mjs';
import Generator from 'yeoman-generator';
import semver from 'semver';
import slugify from '@sindresorhus/slugify';
import spdxLicenseList from 'spdx-license-list/full.js';
import terminalLink from 'terminal-link';

export default class extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.option('first-party', { desc: 'Limits library inclusion to first-party', default: false });
		this.option('loose-version', { desc: `Doesn't enforce semantic versioning`, default: false });
		this.option('unlock-all', { desc: 'Unlocks all disabled features', default: false });

		this.looseVersion = (this.options.looseVersion ? true : false);
		this.disabled = (this.options.unlockAll ? false : true);
		this.firstParty = (this.options.firstParty ? true : false);
	}

	// languageDialog(isUnicode) {
	// 	const languageDialog = Object.entries(languageData).map(([key, value]) => {
	// 		if (key === 'English') return;

	// 		return {
	// 			constant: `$\{LANG_${key.toUpperCase()}}`,
	// 			string: (isUnicode) ? value.native : (value.long || key)
	// 		};
	// 	});

	// 	return languageDialog;
	// }

	inquirer() {
		return this.prompt([
			{
				name: 'name',
				message: `Application name`,
				default: slugify(this.appname),
				store: true
			},
			{
				name: 'version',
				message: `Application version`,
				default: '0.0.0',
				store: true,
				validate: version => (this.looseVersion === true || semver.valid(version) !== null) ? true : `Not a valid ${terminalLink('semantic version', 'https://semver.org', {
					fallback() {
						return 'semantic version';
					}
				})}`
			},
			{
				name: 'unicode',
				message: 'Unicode installer',
				type: 'confirm',
				default: 'true',
				store: true
			},
			{
				name: 'elevation',
				message: 'Requested execution level',
				type: 'list',
				default: 'user',
				store: true,
				choices: choices.elevation
			},
		{
				name: 'compression',
				message: 'Set compression',
				type: 'list',
				default: 'lzma',
				store: true,
				choices: choices.compression
			},
			{
				name: 'pages',
				message: 'Installer pages',
				type: 'checkbox',
				store: true,
				default: [ 'instfiles' ],
				choices: choices.pages
			},
			{
				name: 'spdxQuestion',
				message: `Choose a license from ${terminalLink('SPDX License List', 'https://spdx.org/licenses/', {
					fallback() {
						return 'SPDX License List'
					}
				})}`,
				type: 'confirm',
				default: true,
				store: true,
				when: answers => answers.pages?.includes('license') ? true : false
			},
			{
				name: 'spdxLicense',
				message: 'Choose a license',
				type: 'list',
				default: 'MIT',
				choices: licenseChoices,
				store: true,
				when: answers => answers.pages?.includes('license') && answers.spdxQuestion ? true : false
			},
			{
				name: 'sections',
				message: 'Number of sections',
				default: 1,
				store: true,
				validate: number => (Number.isInteger(parseInt(number)) && parseInt(number) > 0) ? true : 'Not a valid integer'
			},
			{
				name: 'callbacks',
				message: 'Add callback functions',
				type: 'checkbox',
				store: true,
				default: [],
				choices: [
					{
						name: terminalLink('.onInit', 'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onInit.md', {
							fallback() {
								return '.onInit';
							}
						}),
						value: '.onInit'
					},
					{
						name: terminalLink('.onGUIInit', 'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onGUIInit.md', {
							fallback() {
								return '.onGUIInit';
							}
						}),
						value: '.onGUIInit'
					},
					{
						name: terminalLink('.onGUIEnd', 'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onGUIEnd.md', {
							fallback() {
								return '.onGUIEnd';
							}
						}),
						value: '.onGUIEnd'
					},
					{
						name: terminalLink('.onInstSuccess', 'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onInstSuccess.md', {
							fallback() {
								return '.onInstSuccess';
							}
						}),
						value: '.onInstSuccess'
					},
					{
						name: terminalLink('.onInstFailed', 'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onInstFailed.md', {
							fallback() {
								return '.onInstFailed';
							}
						}),
						value: '.onInstFailed'
					},
					{
						name: terminalLink('.onUserAbort', 'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onUserAbort.md', {
							fallback() {
								return '.onUserAbort';
							}
						}),
						value: '.onUserAbort'
					},
					{
						name: terminalLink('.onVerifyInstDir', 'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onVerifyInstDir.md', {
							fallback() {
								return '.onVerifyInstDir';
							}
						}),
						value: '.onVerifyInstDir'
					},
					{
						name: terminalLink('.onRebootFailed', 'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onRebootFailed.md', {
							fallback() {
								return '.onRebootFailed';
							}
						}),
						value: '.onRebootFailed'
					},
					{
						name: terminalLink('.onSelChange', 'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onSelChange.md', {
							fallback() {
								return '.onSelChange';
							}
						}),
						value: '.onSelChange'
					},
					{
						name: terminalLink('.onMouseOverSection', 'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onMouseOverSection.md', {
							fallback() {
								return '.onMouseOverSection';
							}
						}),
						value: '.onMouseOverSection'
					},
				] },
			{
				name: 'includes',
				message: 'Add libraries',
				type: 'checkbox',
				store: true,
				default: [],
				choices: async () => this.firstParty ? choices.includes : await getAllLibraries()
			},
			{
				name: 'languages',
				message: (this.disabled === true) ? 'Add languages other than English' : 'Add languages',
				type: 'checkbox',
				store: true,
				default: [],
				choices: getLanguageChoices(this.disabled)
			},
			{
				name: 'languageDialog',
				message: 'Add language dialog',
				type: 'confirm',
				default: 'true',
				store: true,
				when: answers => {
					switch (true) {
						case (this.options['unlock-all'] === true && answers.languages?.length > 1):
						case (this.options['unlock-all'] === false && answers.languages?.length > 0):
							return true;

						default:
							return false;
					}
				}
			},
			{
				name: 'editInstallerScript',
				message: 'Edit installer script',
				type: 'confirm',
				default: 'true',
				store: true,
				when: () => {
					return (process.env.EDITOR) ? true : false;
				}
			},
		]).then(props => {

			if (typeof props.spdxLicense !== 'undefined') {
				props.licenseText = spdxLicenseList[props.spdxLicense].licenseText.replace(/\n{3,}/g, '\n\n');
			}

			if (props.name.includes('&')) {
				props.ampersand_name = props.name.replace('&', '&&');
			}

			props.outfile = props.version ? `${slugify(props.name)}-${props.version}-setup` : `${slugify(props.name)}-setup`;

			if (props.languageDialog) {
				if (!props.callbacks.includes('.onInit')) {
					props.callbacks.unshift('.onInit');
				}
			}

			if (props.includes?.includes('MUI2')) {
				const includesOnGUIInit = props.callbacks.includes('.onGUIInit');

				if (includesOnGUIInit !== -1) {
					props.callbacks.splice(includesOnGUIInit, 1, '"MUI.onGUIInit"');
				}

				const includesOnUserAbort = props.callbacks.includes('.onUserAbort');

				if (includesOnUserAbort !== -1) {
					props.callbacks.splice(includesOnUserAbort, 1, '"MUI.onUserAbort"');
				}
			}

			this.fs.copyTpl(
				this.templatePath('installer.nsi.ejs'),
				this.destinationPath('installer.nsi'),
				{
					languageData: languageData,
					pkg: props,
					unlockAll: this.options['unlock-all']
				}
			);

			if (typeof props.spdxLicense !== 'undefined') {
				this.fs.copyTpl(
					this.templatePath('license.txt.ejs'),
					this.destinationPath('license.txt'),
					{
						licenseText: props.licenseText
					}
				);
			}

			if (props.editInstallerScript === true) {
				this.spawnCommand(process.env.EDITOR, [ 'installer.nsi' ]);
			}
		});
	}
}
