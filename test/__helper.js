import helpers from 'yeoman-test';
import { join } from 'node:path';

export function helper(buildArgs) {
	helpers.prepareTemporaryDir();

	return helpers
		.run(join(process.cwd(), '/generators/app/index.js'))
		.withAnswers(buildArgs);
}
