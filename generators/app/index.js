const Generator = require('yeoman-generator');
const pkg = require('../../package.json');

const languageData = require('@nsis/language-data');
const semver = require('semver');
const slugify = require('@sindresorhus/slugify');
const updateNotifier = require('update-notifier');

// Is there a newer version of this generator?
updateNotifier({ pkg: pkg }).notify();

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
        constant: `\$\{LANG_${key.toUpperCase()}\}`,
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
        validate: version => (this.looseVersion === true || semver.valid(version) !== null) ? true : 'Not a valid semantic version (see https://semver.org for details)'
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
            name: '.onInit',
            value: 'onInit',
            checked: false
          },
          {
            name: '.onGUIInit',
            value: 'onGUIInit',
            checked: false
          },
          {
            name: '.onGUIEnd',
            value: 'onGUIEnd',
            checked: false
          },
          {
            name: '.onInstSuccess',
            value: 'onInstSuccess',
            checked: false
          },
          {
            name: '.onInstFailed',
            value: 'onInstFailed',
            checked: false
          },
          {
            name: '.onUserAbort',
            value: 'onUserAbort',
            checked: false
          },
          {
            name: '.onVerifyInstDir',
            value: 'onVerifyInstDir',
            checked: false
          },
          {
            name: '.onRebootFailed',
            value: 'onRebootFailed',
            checked: false
          },
          {
            name: '.onSelChange',
            value: 'onSelChange',
            checked: false
          },
          {
            name: '.onMouseOverSection',
            value: 'onMouseOverSection',
            checked: false
          }
        ]
      },
      {
        name: 'includes',
        message: 'Add libraries',
        type: 'checkbox',
        store: true,
        validate: libraries => (libraries.includes('MUI') && libraries.includes('MUI2')) ? `You need to choose between MUI and MUI2` : true,
        choices: [
          {
            name: 'Colors.nsh',
            value: 'Colors',
            checked: false
          },
          {
            name: 'FileFunc.nsh',
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
            name: 'LogicLib.nsh',
            value: 'LogicLib',
            checked: false
          },
          {
            name: 'Memento.nsh',
            value: 'Memento',
            checked: false
          },
          {
            name: 'MUI.nsh',
            value: 'MUI',
            disabled: this.disabled
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
            name: 'StrFunc.nsh',
            value: 'StrFunc',
            checked: false
          },
          {
            name: 'TextFunc.nsh',
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
            name: 'WinVer.nsh',
            value: 'WinVer',
            checked: false
          },
          {
            name: 'WordFunc.nsh',
            value: 'WordFunc',
            checked: false
          },
          {
            name: 'x64.nsh',
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

      if (props.name.includes('&')) {
        props.ampersand_name = props.name.replace('&', '&&');
      }

      props.outfile = props.version ? `${slugify(props.name)}-${props.version}-setup` : `${slugify(props.name)}-setup`;

      if (props.languageDialog) {
        if (!props.callbacks.includes('onInit')) {
          props.callbacks.unshift('onInit');
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
    });
  }
};
