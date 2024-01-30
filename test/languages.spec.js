import { helper } from './__helper.js';
import { languages } from '@nsis/language-data';
import { suite } from 'uvu';
import assert from 'yeoman-assert';

const languagesNames = Object.keys(languages);

/**
 * all languages
 */
const SectionTest = suite(`with all languages`);

SectionTest.before.each(() =>
	helper({
		languages: languagesNames,
	})
);

languagesNames.forEach(language => {
	SectionTest('has LoadLanguageFile', () => {
		assert.fileContent('installer.nsi', `LoadLanguageFile "\${NSISDIR}\\Contrib\\Language files\\${language}.nlf"`);
	});
});

SectionTest.run();

/**
 * all languages (MUI2)
 */
const SectionMUI2Test = suite(`with all languages (MUI2)`);

SectionMUI2Test.before.each(() =>
	helper({
		includes: ['MUI2'],
		languages: languagesNames,
	})
);

languagesNames.forEach(language => {
	SectionMUI2Test(`has !insertmacro MUI_LANGUAGE`, () => {
		assert.fileContent('installer.nsi', `!insertmacro MUI_LANGUAGE "${language}"`);
	});

	SectionMUI2Test(`has LangString`, () => {
		assert.fileContent(
			'installer.nsi',
			`LangString DESC_SECTION_1 \${LANG_${language.toUpperCase()}} "${language} description for section 1"`
		);
	});
});

SectionMUI2Test.run();

/**
 * single languages
 */
languagesNames.forEach(language => {
	const SectionTest = suite(`with ${language}`);

	SectionTest.before.each(() =>
		helper({
			languages: [language],
		})
	);

	SectionTest('has LoadLanguageFile', () => {
		assert.fileContent('installer.nsi', `LoadLanguageFile "\${NSISDIR}\\Contrib\\Language files\\${language}.nlf"`);
	});

	SectionTest.run();
});

/**
 * single languages (MUI2)
 */
languagesNames.forEach(language => {
	const SectionMUI2Test = suite(`with ${language} (MUI2)`);

	SectionMUI2Test.before.each(() =>
		helper({
			includes: ['MUI2'],
			languages: [language],
		})
	);

	SectionMUI2Test(`has !insertmacro MUI_LANGUAGE`, () => {
		assert.fileContent('installer.nsi', `!insertmacro MUI_LANGUAGE "${language}"`);
	});

	SectionMUI2Test(`has LangString`, () => {
		assert.fileContent(
			'installer.nsi',
			`LangString DESC_SECTION_1 \${LANG_${language.toUpperCase()}} "${language} description for section 1"`
		);
	});

	SectionMUI2Test.run();
});
