import { helper } from './__helper.mjs';
import { callbacks } from '../generators/lib/choices.mjs';
import { suite } from 'uvu';
import assert from 'yeoman-assert';

const callbackNames = callbacks.map(({ value }) => `${value}`);

/**
 * alls callbacks
 */
const CallbackTest = suite(`has all callbacks`);

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
	const CallbackTest = suite(`has ${callback} callback`);

	CallbackTest.before.each(() => helper({
		callbacks: [callback],
	}));

	CallbackTest(`has Function ${callback}`, () => {
		assert.fileContent('installer.nsi', `Function ${callback}`);
	});

	CallbackTest.run();
});
