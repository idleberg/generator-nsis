const Generator = require('yeoman-generator');
const pkg = require('../../package.json');

const slugify = require('@sindresorhus/slugify');
const updateNotifier = require('update-notifier');

// Is there a newer version of this generator?
updateNotifier({ pkg: pkg }).notify();

module.exports = class extends Generator {
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
      },
      {
        name: 'unicode',
        message: 'Unicode installer',
        type: 'list',
        default: 'true',
        store: true,
        choices: [
          {
            name: 'true',
            value: 'true',
          },
          {
            name: 'false',
            value: 'false',
          }
        ],
      },
      {
        name: 'elevation',
        message: 'Requested execution level',
        type: 'list',
        default: 'user',
        store: true,
        choices: [
                    {
            name: 'user',
            value: 'user',
          },
          {
            name: 'highest',
            value: 'highest',
          },
          {
            name: 'admin',
            value: 'admin',
          },
          {
            name: 'none',
            value: 'none',
          }
        ]
      },
      {
        name: 'compression',
        message: 'Set compression',
        type: 'list',
        default: 'lzma',
        store: true,
        choices: [
                    {
            name: 'zlib',
            value: 'zlib',
          },
          {
            name: 'bzip2',
            value: 'bzip2',
          },
          {
            name: 'lzma',
            value: 'lzma',
          }
        ]
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
        validate: n => (Number.isInteger(parseInt(n)) && parseInt(n) > 0) ? true : 'Not a valid integer'
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
            disabled: true
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
        message: 'Add languages files',
        type: 'checkbox',
        store: true,
        choices: [
          {
            name: 'English',
            value: 'English',
            disabled: true
          },
          {
            name: 'Afrikaans',
            value: 'Afrikaans',
            checked: false
          },
          {
            name: 'Albanian',
            value: 'Albanian',
            checked: false
          },
          {
            name: 'Arabic',
            value: 'Arabic',
            checked: false
          },
          {
            name: 'Armenian',
            value: 'Armenian',
            checked: false
          },
          {
            name: 'Asturian',
            value: 'Asturian',
            checked: false
          },
          {
            name: 'Basque',
            value: 'Basque',
            checked: false
          },
          {
            name: 'Belarusian',
            value: 'Belarusian',
            checked: false
          },
          {
            name: 'Bosnian',
            value: 'Bosnian',
            checked: false
          },
          {
            name: 'Breton',
            value: 'Breton',
            checked: false
          },
          {
            name: 'Bulgarian',
            value: 'Bulgarian',
            checked: false
          },
          {
            name: 'Catalan',
            value: 'Catalan',
            checked: false
          },
          {
            name: 'Corsican',
            value: 'Corsican',
            checked: false
          },
          {
            name: 'Croatian',
            value: 'Croatian',
            checked: false
          },
          {
            name: 'Czech',
            value: 'Czech',
            checked: false
          },
          {
            name: 'Danish',
            value: 'Danish',
            checked: false
          },
          {
            name: 'Dutch',
            value: 'Dutch',
            checked: false
          },
          {
            name: 'Esperanto',
            value: 'Esperanto',
            checked: false
          },
          {
            name: 'Estonian',
            value: 'Estonian',
            checked: false
          },
          {
            name: 'Farsi',
            value: 'Farsi',
            checked: false
          },
          {
            name: 'Finnish',
            value: 'Finnish',
            checked: false
          },
          {
            name: 'French',
            value: 'French',
            checked: false
          },
          {
            name: 'Galician',
            value: 'Galician',
            checked: false
          },
          {
            name: 'Georgian',
            value: 'Georgian',
            checked: false
          },
          {
            name: 'German',
            value: 'German',
            checked: false
          },
          {
            name: 'Greek',
            value: 'Greek',
            checked: false
          },
          {
            name: 'Hebrew',
            value: 'Hebrew',
            checked: false
          },
          {
            name: 'Hungarian',
            value: 'Hungarian',
            checked: false
          },
          {
            name: 'Icelandic',
            value: 'Icelandic',
            checked: false
          },
          {
            name: 'Indonesian',
            value: 'Indonesian',
            checked: false
          },
          {
            name: 'Irish',
            value: 'Irish',
            checked: false
          },
          {
            name: 'Italian',
            value: 'Italian',
            checked: false
          },
          {
            name: 'Japanese',
            value: 'Japanese',
            checked: false
          },
          {
            name: 'Korean',
            value: 'Korean',
            checked: false
          },
          {
            name: 'Kurdish',
            value: 'Kurdish',
            checked: false
          },
          {
            name: 'Latvian',
            value: 'Latvian',
            checked: false
          },
          {
            name: 'Lithuanian',
            value: 'Lithuanian',
            checked: false
          },
          {
            name: 'Luxembourgish',
            value: 'Luxembourgish',
            checked: false
          },
          {
            name: 'Macedonian',
            value: 'Macedonian',
            checked: false
          },
          {
            name: 'Malay',
            value: 'Malay',
            checked: false
          },
          {
            name: 'Mongolian',
            value: 'Mongolian',
            checked: false
          },
          {
            name: 'Norwegian',
            value: 'Norwegian',
            checked: false
          },
          {
            name: 'NorwegianNynorsk',
            value: 'NorwegianNynorsk',
            checked: false
          },
          {
            name: 'Pashto',
            value: 'Pashto',
            checked: false
          },
          {
            name: 'Polish',
            value: 'Polish',
            checked: false
          },
          {
            name: 'Portuguese',
            value: 'Portuguese',
            checked: false
          },
          {
            name: 'PortugueseBR',
            value: 'PortugueseBR',
            checked: false
          },
          {
            name: 'Romanian',
            value: 'Romanian',
            checked: false
          },
          {
            name: 'Russian',
            value: 'Russian',
            checked: false
          },
          {
            name: 'ScotsGaelic',
            value: 'ScotsGaelic',
            checked: false
          },
          {
            name: 'Serbian',
            value: 'Serbian',
            checked: false
          },
          {
            name: 'SerbianLatin',
            value: 'SerbianLatin',
            checked: false
          },
          {
            name: 'SimpChinese',
            value: 'SimpChinese',
            checked: false
          },
          {
            name: 'Slovak',
            value: 'Slovak',
            checked: false
          },
          {
            name: 'Slovenian',
            value: 'Slovenian',
            checked: false
          },
          {
            name: 'Spanish',
            value: 'Spanish',
            checked: false
          },
          {
            name: 'SpanishInternational',
            value: 'SpanishInternational',
            checked: false
          },
          {
            name: 'Swedish',
            value: 'Swedish',
            checked: false
          },
          {
            name: 'Tatar',
            value: 'Tatar',
            checked: false
          },
          {
            name: 'Thai',
            value: 'Thai',
            checked: false
          },
          {
            name: 'TradChinese',
            value: 'TradChinese',
            checked: false
          },
          {
            name: 'Turkish',
            value: 'Turkish',
            checked: false
          },
          {
            name: 'Ukrainian',
            value: 'Ukrainian',
            checked: false
          },
          {
            name: 'Uzbek',
            value: 'Uzbek',
            checked: false
          },
          {
            name: 'Vietnamese',
            value: 'Vietnamese',
            checked: false
          },
          {
            name: 'Welsh',
            value: 'Welsh',
            checked: false
          },
        ]
      }
    ]).then(props => {

      if (props.name.includes('&')) {
        props.ampersand_name = props.name.replace('&', '&&');
      }

      props.outfile = props.version ? `${slugify(props.name)}-${props.version}-setup` : `${slugify(props.name)}-setup`;

      this.fs.copyTpl(
        this.templatePath('installer.nsi.ejs'),
        this.destinationPath('installer.nsi'),
        {
          pkg: props
        }
      );
    });
  }
};
