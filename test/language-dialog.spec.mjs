import { helper } from './__helper.mjs';
import { meta, languages } from '@nsis/language-data';
import { suite } from 'uvu';
import assert from 'yeoman-assert';

const languagesNames = Object.keys(languages);

/**
 * all languages
 */
const SectionTest = suite(`with all languages`);

SectionTest.before.each(() => helper({
	languages: languagesNames,
}));

languagesNames.forEach((language) => {
	SectionTest(`has Push (constant)`, () => {
		assert.fileContent('installer.nsi', `Push \${LANG_${language.toUpperCase()}}`);
	});

	SectionTest(`has Push (string)`, () => {
		assert.fileContent('installer.nsi', `Push "${meta[language]['native']}"`);
	});
});

SectionTest.run();

/**
 * single languages (language dialog)
 */
languagesNames.forEach((language) => {
	const SectionTest = suite(`with ${language} language`);

	SectionTest.before.each(() => helper({
		languageDialog: true,
		languages: [language],
	}));

	SectionTest(`has Push (constant)`, () => {
		assert.fileContent('installer.nsi', `Push \${LANG_${language.toUpperCase()}}`);
	});

	SectionTest(`has Push (string)`, () => {
		assert.fileContent('installer.nsi', `Push "${meta[language]['native']}"`);
	});

	SectionTest.run();
});
