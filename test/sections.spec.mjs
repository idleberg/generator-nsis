import { helper } from './__helper.mjs';
import assert from 'yeoman-assert';

const sections = new Array(10).fill(null).map((_, index) => index + 1);

sections.map((section) => {
	describe(`with ${section} sections`, () => {
		before(() => helper({
			sections: section,
		}));

		it(`has Section`, () => {
			assert.fileContent('installer.nsi', `Section "section" SECTION_${section}`);
		});
	});
});

sections.map((section) => {
	describe(`with ${section} sections (MUI2)`, () => {
		before(() => helper({
			includes: ['MUI2'],
			sections: section,
		}));

		it(`has Section`, () => {
			assert.fileContent('installer.nsi', `Section "section" SECTION_${section}`);
		});

		it(`has LangString`, () => {
			assert.fileContent('installer.nsi', `LangString DESC_SECTION_${section}`);
		});

		it(`has !insertmacro`, () => {
			assert.fileContent('installer.nsi', `!insertmacro MUI_DESCRIPTION_TEXT \${SECTION_${section}} \$\(DESC_SECTION_${section}\)`);
		});
	});
});
