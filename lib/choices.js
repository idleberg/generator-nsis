import terminalLink from 'terminal-link';

const docsURL = 'https://github.com/NSIS-Dev/Documentation/tree/main/docs/';

export const binary = [false, true];
export const elevation = ['user', 'highest', 'admin', 'none'].map((v) => ({ label: v, value: v }));
export const compression = ['zlib', 'bzip2', 'lzma'].map((v) => ({ label: v, value: v }));

export const lifecycles = [
	{
		label: terminalLink('.onInit', `${docsURL}/Callbacks/onInit.md`, {
			fallback: false,
		}),
		value: '.onInit',
	},
	{
		label: terminalLink('.onGUIInit', `${docsURL}/Callbacks/onGUIInit.md`, {
			fallback: false,
		}),
		value: '.onGUIInit',
	},
	{
		label: terminalLink('.onGUIEnd', `${docsURL}/Callbacks/onGUIEnd.md`, {
			fallback: false,
		}),
		value: '.onGUIEnd',
	},
	{
		label: terminalLink('.onInstSuccess', `${docsURL}/Callbacks/onInstSuccess.md`, {
			fallback: false,
		}),
		value: '.onInstSuccess',
	},
	{
		label: terminalLink('.onInstFailed', `${docsURL}/Callbacks/onInstFailed.md`, {
			fallback: false,
		}),
		value: '.onInstFailed',
	},
	{
		label: terminalLink('.onUserAbort', `${docsURL}/Callbacks/onUserAbort.md`, {
			fallback: false,
		}),
		value: '.onUserAbort',
	},
	{
		label: terminalLink('.onVerifyInstDir', `${docsURL}/Callbacks/onVerifyInstDir.md`, {
			fallback: false,
		}),
		value: '.onVerifyInstDir',
	},
	{
		label: terminalLink('.onRebootFailed', `${docsURL}/Callbacks/onRebootFailed.md`, {
			fallback: false,
		}),
		value: '.onRebootFailed',
	},
	{
		label: terminalLink('.onSelChange', `${docsURL}/Callbacks/onSelChange.md`, {
			fallback: false,
		}),
		value: '.onSelChange',
	},
	{
		label: terminalLink('.onMouseOverSection', `${docsURL}/Callbacks/onMouseOverSection.md`, {
			fallback: false,
		}),
		value: '.onMouseOverSection',
	},
];

export const includes = [
	{
		label: 'Colors.nsh',
		value: 'Colors',
	},
	{
		label: terminalLink('FileFunc.nsh', `${docsURL}/Includes/FileFunc`, {
			fallback: false,
		}),
		value: 'FileFunc',
	},
	{
		label: 'InstallOptions.nsh',
		value: 'InstallOptions',
	},
	{
		label: 'Integration.nsh',
		value: 'Integration',
	},
	{
		label: 'LangFile.nsh',
		value: 'LangFile',
	},
	{
		label: 'Library.nsh',
		value: 'Library',
	},
	{
		label: terminalLink('LogicLib.nsh', `${docsURL}/Includes/LogicLib`, {
			fallback: false,
		}),
		value: 'LogicLib',
	},
	{
		label: terminalLink('Memento.nsh', `${docsURL}/Includes/Memento`, {
			fallback: false,
		}),
		value: 'Memento',
	},
	{
		label: 'MUI.nsh',
		value: 'MUI',
	},
	{
		label: 'MUI2.nsh',
		value: 'MUI2',
	},
	{
		label: 'MultiUser.nsh',
		value: 'MultiUser',
	},
	{
		label: 'nsDialogs.nsh',
		value: 'nsDialogs',
	},
	{
		label: 'Sections.nsh',
		value: 'Sections',
	},
	{
		label: terminalLink('StrFunc.nsh', `${docsURL}/Includes/StrFunc`, {
			fallback: false,
		}),
		value: 'StrFunc',
	},
	{
		label: terminalLink('TextFunc.nsh', `${docsURL}/Includes/TextFunc`, {
			fallback: false,
		}),
		value: 'TextFunc',
	},
	{
		label: 'UpgradeDLL.nsh',
		value: 'UpgradeDLL',
	},
	{
		label: 'Util.nsh',
		value: 'Util',
	},
	{
		label: 'VB6RunTime.nsh',
		value: 'VB6RunTime',
	},
	{
		label: 'VPatchLib.nsh',
		value: 'VPatchLib',
	},
	{
		label: 'WinCore.nsh',
		value: 'WinCore',
	},
	{
		label: 'WinMessages.nsh',
		value: 'WinMessages',
	},
	{
		label: terminalLink('WinVer.nsh', `${docsURL}/Includes/WinVer`, {
			fallback: false,
		}),
		value: 'WinVer',
	},
	{
		label: terminalLink('WordFunc.nsh', `${docsURL}/Includes/WordFunc`, {
			fallback: false,
		}),
		value: 'WordFunc',
	},
	{
		label: terminalLink('x64.nsh', `${docsURL}/Includes/x64`, {
			fallback: false,
		}),
		value: 'x64',
	},
];

export const pages = [
	{
		label: 'license',
		value: 'license',
	},
	{
		label: 'components',
		value: 'components',
	},
	{
		label: 'directory',
		value: 'directory',
	},
	{
		label: 'instfiles',
		value: 'instfiles',
	},
];
