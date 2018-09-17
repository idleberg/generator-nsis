const Generator = require('yeoman-generator');
const pkg = require('../../package.json');

const languageData = require('@nsis/language-data').meta;
const semver = require('semver');
const slugify = require('@sindresorhus/slugify');
const spdxLicenseList = require('spdx-license-list/full');
const terminalLink = require('terminal-link');
const updateNotifier = require('update-notifier');

// Is there a newer version of this generator?
updateNotifier({ pkg: pkg }).notify();

// Create array of license choices
const spdxCodes = Object.getOwnPropertyNames(spdxLicenseList).sort();
const licenseChoices = spdxCodes.map(obj => {
  const licenses = {};
  licenses['name'] = terminalLink(obj, `https://spdx.org/licenses/${obj}.html`, {
    fallback() {
      return obj;
    }
  });
  licenses['value'] = obj;

  return licenses;
});


module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('loose-version', { desc: `Doesn't enforce semantic versioning`, default: false });
    this.option('unlock-all', { desc: 'Unlocks all disabled features', default: false });

    this.looseVersion = (this.options.looseVersion ? true : false);
    this.disabled = (this.options.unlockAll ? false : true);
  }

  languageChoices() {
    const languageChoices = [];

    Object.entries(languageData).forEach(([key, value]) => {
      const isDisabled = (key === 'English') ? this.disabled : false;

      // Use long names
      languageChoices.push({
        name: value.long || key,
        value: key,
        disabled: isDisabled
      });
    });

    // Sort names
    languageChoices.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }

      return 0;
    });

    return languageChoices;
  }

  languageDialog(isUnicode) {
    const languageDialog = [];

    Object.entries(languageData).forEach(([key, value]) => {
      if (key === 'English') return;

      languageDialog.push({
        constant: `$\{LANG_${key.toUpperCase()}}`,
        string: (isUnicode) ? value.native : (value.long || key)
      });
    });

    return languageDialog;
  }

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
        choices: [ 'user', 'highest', 'admin', 'none' ]
      },
      {
        name: 'compression',
        message: 'Set compression',
        type: 'list',
        default: 'lzma',
        store: true,
        choices: [ 'zlib', 'bzip2', 'lzma' ]
      },
      {
        name: 'pages',
        message: 'Installer pages',
        type: 'checkbox',
        store: true,
        choices: [
          {
            name: 'license',
            value: 'license',
          },
          {
            name: 'components',
            value: 'components',
          },
          {
            name: 'directory',
            value: 'directory',
          },
          {
            name: 'instfiles',
            value: 'instfiles',
            checked: true
          }
        ]
      },
      {
        name: 'spdxQuestion',
        message: `Choose license from ${terminalLink('SPDX License List', 'https://spdx.org/licenses/', {
          fallback() {
            return 'SPDX License List'
          }
        })}`,
        type: 'confirm',
        default: true,
        store: true,
        when: answers => answers.pages.includes('license') ? true : false
      },
      {
        name: 'spdxLicense',
        message: 'Choose license',
        type: 'list',
        default: 'MIT',
        choices: licenseChoices,
        store: true,
        when: answers => (answers.pages.includes('license') && answers.spdxQuestion) ? true : false
      },
      {
        name: 'sections',
        message: 'Number of sections',
        default: 1,
        store: true,
        validate: number => (Number.isInteger(parseInt(number)) && parseInt(number) > 0) ? true : 'Not a valid number of sections'
      },
      {
        name: 'callbacks',
        message: 'Add callback functions',
        type: 'checkbox',
        store: true,
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
        choices: [
          {
            name: 'Colors.nsh',
            value: 'Colors',
            checked: false
          },
          {
            name: terminalLink('FileFunc.nsh', 'https://github.com/NSIS-Dev/Documentation/tree/master/Includes/FileFunc', {
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
            name: terminalLink('LogicLib.nsh', 'https://github.com/NSIS-Dev/Documentation/tree/master/Includes/LogicLib', {
              fallback() {
                return 'LogicLib.nsh';
              }
            }),
            value: 'LogicLib',
            checked: false
          },
          {
            name: terminalLink('Memento.nsh', 'https://github.com/NSIS-Dev/Documentation/tree/master/Includes/Memento', {
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
            name: terminalLink('StrFunc.nsh', 'https://github.com/NSIS-Dev/Documentation/tree/master/Includes/StrFunc', {
              fallback() {
                return 'StrFunc.nsh';
              }
            }),
            value: 'StrFunc',
            checked: false
          },
          {
            name: terminalLink('TextFunc.nsh', 'https://github.com/NSIS-Dev/Documentation/tree/master/Includes/TextFunc', {
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
            name: terminalLink('WinVer.nsh', 'https://github.com/NSIS-Dev/Documentation/tree/master/Includes/WinVer', {
              fallback() {
                return 'WinVer.nsh';
              }
            }),
            value: 'WinVer',
            checked: false
          },
          {
            name: terminalLink('WordFunc.nsh', 'https://github.com/NSIS-Dev/Documentation/tree/master/Includes/WordFunc', {
              fallback() {
                return 'WordFunc.nsh';
              }
            }),
            value: 'WordFunc',
            checked: false
          },
          {
            name: terminalLink('x64.nsh', 'https://github.com/NSIS-Dev/Documentation/tree/master/Includes/x64', {
              fallback() {
                return 'x64.nsh';
              }
            }),
            value: 'x64',
            checked: false
          }
        ]
      },
      {
        name: 'languages',
        message: (this.disabled === true) ? 'Add languages other than English' : 'Add languages',
        type: 'checkbox',
        store: true,
        choices: this.languageChoices()
      },
      {
        name: 'languageDialog',
        message: 'Add language dialog',
        type: 'confirm',
        default: 'true',
        store: true,
        when: answers => {
          switch (true) {
            case (this.options['unlock-all'] === true && answers.languages.length > 1):
            case (this.options['unlock-all'] === false && answers.languages.length > 0):
              return true;
            default:
              return false;
          }
        }
      }
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

      if (props.includes.includes('MUI2')) {
        const indexOfonGUIInit = props.callbacks.indexOf('.onGUIInit');
        const indexOfonUserAbort = props.callbacks.indexOf('.onUserAbort');
        if (indexOfonGUIInit !== -1) {
          props.callbacks.splice(indexOfonGUIInit, 1, '"custom.onGUIInit"');
        }
        if (indexOfonUserAbort !== -1) {
          props.callbacks.splice(indexOfonUserAbort, 1, '"custom.onUserAbort"');
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
    });
  }
};
