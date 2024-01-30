import terminalLink from 'terminal-link';

const docsURL = 'https://github.com/NSIS-Dev/Documentation/tree/master';

export const binary = [false, true];
export const elevation = ['user', 'highest', 'admin', 'none'];
export const compression = ['zlib', 'bzip2', 'lzma'];

export const callbacks = [
	{
		name: terminalLink('.onInit', 'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onInit.md', {
			fallback() {
				return '.onInit';
			},
		}),
		value: '.onInit',
	},
	{
		name: terminalLink('.onGUIInit', 'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onGUIInit.md', {
			fallback() {
				return '.onGUIInit';
			},
		}),
		value: '.onGUIInit',
	},
	{
		name: terminalLink('.onGUIEnd', 'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onGUIEnd.md', {
			fallback() {
				return '.onGUIEnd';
			},
		}),
		value: '.onGUIEnd',
	},
	{
		name: terminalLink(
			'.onInstSuccess',
			'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onInstSuccess.md',
			{
				fallback() {
					return '.onInstSuccess';
				},
			}
		),
		value: '.onInstSuccess',
	},
	{
		name: terminalLink(
			'.onInstFailed',
			'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onInstFailed.md',
			{
				fallback() {
					return '.onInstFailed';
				},
			}
		),
		value: '.onInstFailed',
	},
	{
		name: terminalLink(
			'.onUserAbort',
			'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onUserAbort.md',
			{
				fallback() {
					return '.onUserAbort';
				},
			}
		),
		value: '.onUserAbort',
	},
	{
		name: terminalLink(
			'.onVerifyInstDir',
			'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onVerifyInstDir.md',
			{
				fallback() {
					return '.onVerifyInstDir';
				},
			}
		),
		value: '.onVerifyInstDir',
	},
	{
		name: terminalLink(
			'.onRebootFailed',
			'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onRebootFailed.md',
			{
				fallback() {
					return '.onRebootFailed';
				},
			}
		),
		value: '.onRebootFailed',
	},
	{
		name: terminalLink(
			'.onSelChange',
			'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onSelChange.md',
			{
				fallback() {
					return '.onSelChange';
				},
			}
		),
		value: '.onSelChange',
	},
	{
		name: terminalLink(
			'.onMouseOverSection',
			'https://github.com/NSIS-Dev/Documentation/blob/master/Callbacks/onMouseOverSection.md',
			{
				fallback() {
					return '.onMouseOverSection';
				},
			}
		),
		value: '.onMouseOverSection',
	},
];

export const includes = [
	{
		name: 'Colors.nsh',
		value: 'Colors',
		checked: false,
	},
	{
		name: terminalLink('FileFunc.nsh', `${docsURL}/Includes/FileFunc`, {
			fallback() {
				return 'FileFunc.nsh';
			},
		}),
		value: 'FileFunc',
		checked: false,
	},
	{
		name: 'InstallOptions.nsh',
		value: 'InstallOptions',
		checked: false,
	},
	{
		name: 'Integration.nsh',
		value: 'Integration',
		checked: false,
	},
	{
		name: 'LangFile.nsh',
		value: 'LangFile',
		checked: false,
	},
	{
		name: 'Library.nsh',
		value: 'Library',
		checked: false,
	},
	{
		name: terminalLink('LogicLib.nsh', `${docsURL}/Includes/LogicLib`, {
			fallback() {
				return 'LogicLib.nsh';
			},
		}),
		value: 'LogicLib',
		checked: false,
	},
	{
		name: terminalLink('Memento.nsh', `${docsURL}/Includes/Memento`, {
			fallback() {
				return 'Memento.nsh';
			},
		}),
		value: 'Memento',
		checked: false,
	},
	{
		name: 'MUI.nsh',
		value: 'MUI',
		checked: false,
	},
	{
		name: 'MUI2.nsh',
		value: 'MUI2',
		checked: false,
	},
	{
		name: 'MultiUser.nsh',
		value: 'MultiUser',
		checked: false,
	},
	{
		name: 'nsDialogs.nsh',
		value: 'nsDialogs',
		checked: false,
	},
	{
		name: 'Sections.nsh',
		value: 'Sections',
		checked: false,
	},
	{
		name: terminalLink('StrFunc.nsh', `${docsURL}/Includes/StrFunc`, {
			fallback() {
				return 'StrFunc.nsh';
			},
		}),
		value: 'StrFunc',
		checked: false,
	},
	{
		name: terminalLink('TextFunc.nsh', `${docsURL}/Includes/TextFunc`, {
			fallback() {
				return 'TextFunc.nsh';
			},
		}),
		value: 'TextFunc',
		checked: false,
	},
	{
		name: 'UpgradeDLL.nsh',
		value: 'UpgradeDLL',
		checked: false,
	},
	{
		name: 'Util.nsh',
		value: 'Util',
		checked: false,
	},
	{
		name: 'VB6RunTime.nsh',
		value: 'VB6RunTime',
		checked: false,
	},
	{
		name: 'VPatchLib.nsh',
		value: 'VPatchLib',
		checked: false,
	},
	{
		name: 'WinCore.nsh',
		value: 'WinCore',
		checked: false,
	},
	{
		name: 'WinMessages.nsh',
		value: 'WinMessages',
		checked: false,
	},
	{
		name: terminalLink('WinVer.nsh', `${docsURL}/Includes/WinVer`, {
			fallback() {
				return 'WinVer.nsh';
			},
		}),
		value: 'WinVer',
		checked: false,
	},
	{
		name: terminalLink('WordFunc.nsh', `${docsURL}/Includes/WordFunc`, {
			fallback() {
				return 'WordFunc.nsh';
			},
		}),
		value: 'WordFunc',
		checked: false,
	},
	{
		name: terminalLink('x64.nsh', `${docsURL}/Includes/x64`, {
			fallback() {
				return 'x64.nsh';
			},
		}),
		value: 'x64',
		checked: false,
	},
];

export const pages = [
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
		checked: true,
	},
];
