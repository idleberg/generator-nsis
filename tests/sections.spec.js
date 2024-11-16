import { helper } from './__helper.js';
import { suite } from 'uvu';
import assert from 'yeoman-assert';

const sections = new Array(10).fill(null).map((_, index) => index + 1);

sections.forEach((section) => {
	const SectionTest = suite(`with ${section} sections`);

	SectionTest.before(() =>
		helper({
			sections: section,
		}),
	);

	SectionTest(`has Section`, () => {
		assert.fileContent('installer.nsi', `Section "section" SECTION_${section}`);
	});

	SectionTest.run();
});

sections.forEach((section) => {
	const SectionMUI2Test = suite(`with ${section} sections (MUI2)`);

	SectionMUI2Test.before(() =>
		helper({
			includes: ['MUI2'],
			sections: section,
		}),
	);

	SectionMUI2Test(`has Section`, () => {
		assert.fileContent('installer.nsi', `Section "section" SECTION_${section}`);
	});

	SectionMUI2Test(`has LangString`, () => {
		assert.fileContent('installer.nsi', `LangString DESC_SECTION_${section}`);
	});

	SectionMUI2Test(`has !insertmacro`, () => {
		assert.fileContent(
			'installer.nsi',
			`!insertmacro MUI_DESCRIPTION_TEXT \${SECTION_${section}} $(DESC_SECTION_${section})`,
		);
	});

	SectionMUI2Test.run();
});
