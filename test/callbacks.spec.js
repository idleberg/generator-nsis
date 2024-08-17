import { helper } from './__helper.js';
import { callbacks } from '../lib/choices.js';
import { suite } from 'uvu';
import assert from 'yeoman-assert';

const callbackNames = callbacks.map(({ value }) => value);

/**
 * all callbacks
 */
const CallbackTest = suite(`with all callbacks`);

CallbackTest.before(() =>
	helper({
		callbacks: callbackNames,
	})
);

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

	CallbackTest.before(() =>
		helper({
			callbacks: [callback],
		})
	);

	CallbackTest(`has Function ${callback}`, () => {
		assert.fileContent('installer.nsi', `Function ${callback}`);
	});

	CallbackTest.run();
});

/**
 * all callbacks (MUI2)
 */
const CallbackMUI2Test = suite(`with all callbacks (MUI2)`);

CallbackMUI2Test.before(() =>
	helper({
		callbacks: callbackNames,
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
 * single callbacks (MUI2)
 */
callbackNames.forEach(callback => {
	const CallbackMUI2Test = suite(`with ${callback}`);

	CallbackMUI2Test.before(() =>
		helper({
			callbacks: [callback],
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
