import terminalLink from 'terminal-link';

const docsURL = 'https://github.com/NSIS-Dev/Documentation/tree/main/docs/';

export const binary = [false, true];
export const elevation = ['user', 'highest', 'admin', 'none'];
export const compression = ['zlib', 'bzip2', 'lzma'];

export const callbacks = [
	{
		name: terminalLink('.onInit', `${docsURL}/Callbacks/onInit.md`, {
			fallback: false,
		}),
		value: '.onInit',
	},
	{
		name: terminalLink('.onGUIInit', `${docsURL}/Callbacks/onGUIInit.md`, {
			fallback: false,
		}),
		value: '.onGUIInit',
	},
	{
		name: terminalLink('.onGUIEnd', `${docsURL}/Callbacks/onGUIEnd.md`, {
			fallback: false,
		}),
		value: '.onGUIEnd',
	},
	{
		name: terminalLink('.onInstSuccess', `${docsURL}/Callbacks/onInstSuccess.md`, {
			fallback: false,
		}),
		value: '.onInstSuccess',
	},
	{
		name: terminalLink('.onInstFailed', `${docsURL}/Callbacks/onInstFailed.md`, {
			fallback: false,
		}),
		value: '.onInstFailed',
	},
	{
		name: terminalLink('.onUserAbort', `${docsURL}/Callbacks/onUserAbort.md`, {
			fallback: false,
		}),
		value: '.onUserAbort',
	},
	{
		name: terminalLink('.onVerifyInstDir', `${docsURL}/Callbacks/onVerifyInstDir.md`, {
			fallback: false,
		}),
		value: '.onVerifyInstDir',
	},
	{
		name: terminalLink('.onRebootFailed', `${docsURL}/Callbacks/onRebootFailed.md`, {
			fallback: false,
		}),
		value: '.onRebootFailed',
	},
	{
		name: terminalLink('.onSelChange', `${docsURL}/Callbacks/onSelChange.md`, {
			fallback: false,
		}),
		value: '.onSelChange',
	},
	{
		name: terminalLink('.onMouseOverSection', `${docsURL}/Callbacks/onMouseOverSection.md`, {
			fallback: false,
		}),
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
			fallback: false,
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
			fallback: false,
		}),
		value: 'LogicLib',
		checked: false,
	},
	{
		name: terminalLink('Memento.nsh', `${docsURL}/Includes/Memento`, {
			fallback: false,
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
			fallback: false,
		}),
		value: 'StrFunc',
		checked: false,
	},
	{
		name: terminalLink('TextFunc.nsh', `${docsURL}/Includes/TextFunc`, {
			fallback: false,
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
			fallback: false,
		}),
		value: 'WinVer',
		checked: false,
	},
	{
		name: terminalLink('WordFunc.nsh', `${docsURL}/Includes/WordFunc`, {
			fallback: false,
		}),
		value: 'WordFunc',
		checked: false,
	},
	{
		name: terminalLink('x64.nsh', `${docsURL}/Includes/x64`, {
			fallback: false,
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
