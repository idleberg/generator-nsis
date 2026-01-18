import { GeneratorCompat as Generator } from '@idleberg/yeoman-generator';
import { meta as languageData } from '@nsis/language-data';
import slugify from '@sindresorhus/slugify';
import { inverse } from 'kleur/colors';
import semver from 'semver';
import spdxLicenseList from 'spdx-license-list/full.js';
import terminalLink from 'terminal-link';
import * as choices from '../../lib/choices.js';
import { getAllLibraries, getLanguageChoices, licenseChoices } from '../../lib/helpers.js';

export default class extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.option('first-party', { desc: 'Limits library inclusion to first-party', default: false });
		this.option('loose-version', { desc: `Doesn't enforce semantic versioning`, default: false });
		this.option('unlock-all', { desc: 'Unlocks all disabled features', default: false });
		this.option('debug', { desc: 'Prints debug messages', default: false });

		this.disabled = !this.options.unlockAll;

		globalThis.console.log(/* let it breathe */);
	}

	async prompting() {
		this.clack.intro(inverse(` ${this.appname} `));
		// Pre-load async choices for proper storage support
		const includeChoices = this.options.firstParty ? choices.includes : await getAllLibraries();

		this.props = await this.prompt([
			{
				name: 'name',
				message: 'Application name',
				default: slugify(this.appname),
				store: true,
				validate: (name) => (name.trim().length > 0 ? true : 'Not a valid name'),
			},
			{
				name: 'version',
				message: 'Application version',
				default: '0.0.0',
				store: true,
				validate: (version) =>
					this.options.looseVersion || semver.valid(version) !== null
						? true
						: `Not a valid ${terminalLink('semantic version', 'https://semver.org', {
								fallback: false,
							})}`,
			},
			{
				name: 'unicode',
				message: 'Unicode installer',
				type: 'confirm',
				default: 'true',
				store: true,
			},
			{
				name: 'elevation',
				message: 'Requested execution level',
				type: 'list',
				default: 'user',
				store: true,
				choices: choices.elevation,
			},
			{
				name: 'compression',
				message: 'Set compression',
				type: 'list',
				default: 'lzma',
				store: true,
				choices: choices.compression,
			},
			{
				name: 'pages',
				message: 'Installer pages',
				type: 'checkbox',
				store: true,
				default: ['instfiles'],
				choices: choices.pages,
			},
			{
				name: 'spdxQuestion',
				message: `Choose a license from ${terminalLink('SPDX License List', 'https://spdx.org/licenses/', {
					fallback: false,
				})}`,
				type: 'confirm',
				default: true,
				store: true,
				when: (answers) => !!answers.pages?.includes('license'),
			},
			{
				name: 'spdxLicense',
				message: 'Choose a license',
				type: 'list',
				default: 'MIT',
				choices: licenseChoices,
				store: true,
				when: (answers) => !!(answers.pages?.includes('license') && answers.spdxQuestion),
			},
			{
				name: 'sections',
				message: 'Number of sections',
				default: 1,
				store: true,
				validate: (number) =>
					Number.isInteger(Number.parseInt(number, 10)) && Number.parseInt(number, 10) > 0
						? true
						: 'Not a valid integer',
			},
			{
				name: 'lifecycles',
				message: 'Add lifecycle functions',
				type: 'checkbox',
				store: true,
				default: [],
				choices: choices.lifecycles,
			},
			{
				name: 'includes',
				message: 'Add libraries',
				type: 'checkbox',
				store: true,
				default: [],
				choices: includeChoices,
				validate: (lifecycles) =>
					lifecycles.includes('MUI') && lifecycles.includes('MUI2') ? "Don't mix MUI versions" : true,
			},
			{
				name: 'languages',
				message: this.disabled === true ? 'Add languages other than English' : 'Add languages',
				type: 'checkbox',
				store: true,
				default: [],
				choices: getLanguageChoices(this.disabled),
			},
			{
				name: 'languageDialog',
				message: 'Add language dialog',
				type: 'confirm',
				default: 'true',
				store: true,
				when: (answers) => {
					switch (true) {
						case this.options['unlock-all'] === true && answers.languages?.length > 1:
						case this.options['unlock-all'] === false && answers.languages?.length > 0:
							return true;

						default:
							return false;
					}
				},
			},
		]);
	}

	async writing() {
		if (this.options.debug) {
			globalThis.console.log(this.props);
		}

		if (typeof this.props.spdxLicense !== 'undefined') {
			this.props.licenseText = spdxLicenseList[this.props.spdxLicense].licenseText
				// normalize line endings
				.split('\n')

				// .map(line => line.trim())
				.join(this.props.unicode ? '\n' : '\r\n');
		}

		if (this.props.name.includes('&')) {
			this.props.ampersand_name = this.props.name.replace('&', '&&');
		}

		this.props.outfile = this.props.version
			? `${slugify(this.props.name)}-${this.props.version}-setup`
			: `${slugify(this.props.name)}-setup`;

		if (this.props.languageDialog) {
			if (!this.props.lifecycles.includes('.onInit')) {
				this.props.lifecycles.unshift('.onInit');
			}
		}

		if (this.props.includes?.includes('MUI2')) {
			const includesOnGUIInit = this.props.lifecycles.indexOf('.onGUIInit');

			if (includesOnGUIInit !== -1) {
				this.props.lifecycles.splice(includesOnGUIInit, 1, 'MUI.onGUIInit');
			}

			const includesOnUserAbort = this.props.lifecycles.indexOf('.onUserAbort');

			if (includesOnUserAbort !== -1) {
				this.props.lifecycles.splice(includesOnUserAbort, 1, 'MUI.onUserAbort');
			}
		}

		await this.fs.copyTplAsync(this.templatePath('installer.nsi.eta'), this.destinationPath('installer.nsi'), {
			...this.props,
			languageData: languageData,
			unlockAll: this.options['unlock-all'],
			debug: this.options.debug,
		});

		if (typeof this.props.spdxLicense === 'string') {
			await this.fs.copyTplAsync(this.templatePath('license.txt.eta'), this.destinationPath('license.txt'), {
				licenseText: this.props.licenseText,
			});
		}
	}
}
