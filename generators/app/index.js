import { Generator } from '@idleberg/yeoman-generator';
import { meta as languageData } from '@nsis/language-data';
import slugify from '@sindresorhus/slugify';
import { inverse } from 'kleur/colors';
import semver from 'semver';
import spdxLicenseList from 'spdx-license-list/full.js';
import terminalLink from 'terminal-link';
import * as choices from '../../lib/choices.js';
import { getAllLibraries, getLanguageChoices, licenseChoices } from '../../lib/helpers.js';
import $ from '../../package.json' with { type: 'json' };

export default class extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.option('first-party', { desc: 'Limits library inclusion to first-party', default: false });
		this.option('loose-version', { desc: `Doesn't enforce semantic versioning`, default: false });
		this.option('unlock-all', { desc: 'Unlocks all disabled features', default: false });
		this.option('debug', { desc: 'Prints debug messages', default: false });

		this.outdir = this.options.debug ? '.debug' : '';
	}

	async prompting() {
		globalThis.console.log(/* let it breathe */);
		this.clack.intro(inverse(` ${$.name} `));

		// Pre-load async choices for proper storage support
		const includeChoices = this.options.firstParty ? choices.includes : await getAllLibraries();

		this.props = await this.prompt([
			{
				type: 'text',
				name: 'name',
				message: 'Application name',
				default: slugify(this.appname),
				store: true,
				validate: (name) => (name.trim().length > 0 ? undefined : 'Not a valid name'),
			},
			{
				type: 'text',
				name: 'version',
				message: 'Application version',
				default: '0.0.0',
				store: true,
				validate: (version) =>
					this.options.looseVersion || semver.valid(version) !== null
						? undefined
						: `Not a valid ${terminalLink('semantic version', 'https://semver.org', {
								fallback: false,
							})}`,
			},
			{
				type: 'confirm',
				name: 'unicode',
				message: 'Unicode installer',
				default: true,
				store: true,
			},
			{
				type: 'select',
				name: 'elevation',
				message: 'Requested execution level',
				default: 'user',
				store: true,
				options: choices.elevation,
			},
			{
				type: 'select',
				name: 'compression',
				message: 'Set compression',
				default: 'lzma',
				store: true,
				options: choices.compression,
			},
			{
				type: 'multiselect',
				name: 'pages',
				message: 'Installer pages',
				store: true,
				default: ['instfiles'],
				options: choices.pages,
			},
			{
				type: 'confirm',
				name: 'spdxQuestion',
				message: `Choose a license from ${terminalLink('SPDX License List', 'https://spdx.org/licenses/', {
					fallback: false,
				})}`,
				default: true,
				store: true,
				when: (answers) => !!answers.pages?.includes('license'),
			},
			{
				type: 'select',
				name: 'spdxLicense',
				message: 'Choose a license',
				default: 'MIT',
				options: licenseChoices,
				store: true,
				when: (answers) => !!(answers.pages?.includes('license') && answers.spdxQuestion),
			},
			{
				type: 'text',
				name: 'sections',
				message: 'Number of sections',
				default: 1,
				store: true,
				validate: (number) =>
					Number.isInteger(Number.parseInt(number, 10)) && Number.parseInt(number, 10) > 0
						? undefined
						: 'Not a valid integer',
			},
			{
				type: 'multiselect',
				name: 'lifecycles',
				message: 'Add lifecycle functions',
				store: true,
				default: [],
				options: choices.lifecycles,
			},
			{
				type: 'multiselect',
				name: 'includes',
				message: 'Add libraries',
				store: true,
				default: [],
				options: includeChoices,
				validate: (lifecycles) =>
					lifecycles.includes('MUI') && lifecycles.includes('MUI2') ? "Don't mix MUI versions" : undefined,
			},
			{
				type: 'multiselect',
				name: 'languages',
				message: 'Add languages',
				store: true,
				default: [],
				options: getLanguageChoices(),
			},
			{
				type: 'confirm',
				name: 'languageDialog',
				message: 'Add language dialog',
				default: true,
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

		await this.fs.copyTplAsync(
			this.templatePath('installer.nsi.eta'),
			this.destinationPath(this.outdir, 'installer.nsi'),
			{
				...this.props,
				languageData: languageData,
				unlockAll: this.options['unlock-all'],
				debug: this.options.debug,
			},
		);

		if (typeof this.props.spdxLicense === 'string') {
			await this.fs.copyTplAsync(
				this.templatePath('license.txt.eta'),
				this.destinationPath(this.outdir, 'license.txt'),
				{
					licenseText: this.props.licenseText,
				},
			);
		}
	}
}
