import { join } from 'node:path';
import { cwd } from 'node:process';
import helpers from 'yeoman-test';

export function helper(buildArgs) {
	helpers.prepareTemporaryDir();

	return helpers.run(join(cwd(), '/generators/app/index.js')).withAnswers(buildArgs);
}
