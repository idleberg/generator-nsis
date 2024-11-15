import { helper } from './__helper.js';
import { lifecycles } from '../lib/choices.js';
import { suite } from 'uvu';
import assert from 'yeoman-assert';

const callbackNames = lifecycles.map(({ value }) => value);

/**
 * all lifecycles
 */
const CallbackTest = suite(`with all lifecycles`);

CallbackTest.before(() =>
	helper({
		lifecycles: callbackNames,
	})
);

callbackNames.forEach(callback => {
	CallbackTest(`has Function ${callback}`, () => {
		assert.fileContent('installer.nsi', `Function ${callback}`);
	});
});

CallbackTest.run();

/**
 * single lifecycles
 */
callbackNames.forEach(callback => {
	const CallbackTest = suite(`with ${callback}`);

	CallbackTest.before(() =>
		helper({
			lifecycles: [callback],
		})
	);

	CallbackTest(`has Function ${callback}`, () => {
		assert.fileContent('installer.nsi', `Function ${callback}`);
	});

	CallbackTest.run();
});

/**
 * all lifecycles (MUI2)
 */
const CallbackMUI2Test = suite(`with all lifecycles (MUI2)`);

CallbackMUI2Test.before(() =>
	helper({
		lifecycles: callbackNames,
		includes: ['MUI2'],
	})
);

callbackNames.forEach(callback => {
	if (callback === '.onGUIInit') {
		CallbackMUI2Test(`has Function MUI.onGUIInit`, () => {
			assert.fileContent('installer.nsi', `Function MUI.onGUIInit`);
		});
	} else if (callback === '.onUserAbort') {
		CallbackMUI2Test(`has Function MUI.onUserAbort`, () => {
			assert.fileContent('installer.nsi', `Function MUI.onUserAbort`);
		});
	} else {
		CallbackMUI2Test(`has Function ${callback}`, () => {
			assert.fileContent('installer.nsi', `Function ${callback}`);
		});
	}
});

CallbackMUI2Test.run();

/**
 * single lifecycles (MUI2)
 */
callbackNames.forEach(callback => {
	const CallbackMUI2Test = suite(`with ${callback}`);

	CallbackMUI2Test.before(() =>
		helper({
			lifecycles: [callback],
			includes: ['MUI2'],
		})
	);

	if (callback === '.onGUIInit') {
		CallbackMUI2Test(`has Function MUI.onGUIInit`, () => {
			assert.fileContent('installer.nsi', `Function MUI.onGUIInit`);
		});
	} else if (callback === '.onUserAbort') {
		CallbackMUI2Test(`has Function MUI.onUserAbort`, () => {
			assert.fileContent('installer.nsi', `Function MUI.onUserAbort`);
		});
	} else {
		CallbackMUI2Test(`has Function ${callback}`, () => {
			assert.fileContent('installer.nsi', `Function ${callback}`);
		});
	}

	CallbackMUI2Test.run();
});
