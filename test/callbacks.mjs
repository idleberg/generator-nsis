import { helper } from './__helper.mjs';
import { callbacks } from '../generators/lib/choices.mjs';
import { suite } from 'uvu';
import assert from 'yeoman-assert';

const callbackNames = callbacks.map(({ value }) => `${value}`);

/**
 * all callbacks
 */
const CallbackTest = suite(`with all callbacks`);

CallbackTest.before.each(() => helper({
	callbacks: callbackNames,
}));

callbackNames.forEach(callback => {
	CallbackTest(`has Function ${callback}`, () => {
		assert.fileContent('installer.nsi', `Function ${callback}`);
	});
});

CallbackTest.run();

/**
 * single callbacks
 */
callbackNames.forEach(callback => {
	const CallbackTest = suite(`with ${callback}`);

	CallbackTest.before.each(() => helper({
		callbacks: [callback],
	}));

	CallbackTest(`has Function ${callback}`, () => {
		assert.fileContent('installer.nsi', `Function ${callback}`);
	});

	CallbackTest.run();
});

/**
 * all callbacks (MUI2)
 */
const CallbackMUI2Test = suite(`with all callbacks (MUI2)`);

CallbackMUI2Test.before.each(() => helper({
	callbacks: callbackNames,
	includes: ['MUI2'],
}));

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
 * single callbacks (MUI2)
 */
callbackNames.forEach(callback => {
	const CallbackMUI2Test = suite(`with ${callback}`);

	CallbackMUI2Test.before.each(() => helper({
		callbacks: [callback],
		includes: ['MUI2'],
	}));

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
