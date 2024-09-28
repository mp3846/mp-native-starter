#!/usr/bin/env node

import { exec } from "child_process";
import { join } from "path";
import { readFile, writeFile } from "fs";

const [, , ...args] = process.argv;

if (args.length < 1) {
	console.error("Please provide a name for your React Native app.");
	process.exit(1);
}

const appName = args[0];

console.log(`Creating a React Native app with name: ${appName}`);

const reactAppDir = join(process.cwd(), appName);

// Clone React starter template using degit
exec(
	`npx degit mp3846/native-starter ${appName} 2>&1`,
	(error, stdout, stderr) => {
		if (error) return console.error(`Error: ${error.message}`);
		if (stderr) return console.error(`stderr: ${stderr}`);
		console.log(stdout);

		// Update package.json with provided name
		const packageJsonPath = join(reactAppDir, "package.json");
		readFile(packageJsonPath, "utf8", (err, data) => {
			if (err)
				return console.error(
					`Error reading package.json: ${err}`
				);
			const packageJson = JSON.parse(data);
			packageJson.name = appName;
			writeFile(
				packageJsonPath,
				JSON.stringify(packageJson, null, 2),
				(err) => {
					if (err)
						return console.error(
							`Error writing package.json: ${err}`
						);
					console.log(`${appName} is ready`);
				}
			);
		});
	}
);
