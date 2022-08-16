import esm from 'esm';
import { existsSync } from 'fs';
import { register as registerTypeScriptNode } from 'ts-node';

const configNames = [
  'config.ts',
  'config.mjs',
  'config.js',
  'config.json',
];

export async function loadProjectConfig(projectPath) {

  // Using default node module loader
  let moduleLoaderSync = require;

  let config;

  for (const configName of configNames) {

    const configPath = `${projectPath}/${configName}`;
    if (!existsSync(configPath)) {
      continue;
    }

    if (configPath.endsWith('.ts')) {
      registerTypeScriptNode();

    } else if (configPath.match(/\.m?js$/)) {
      // Using ESM module loader
      moduleLoaderSync = (path) => esm(module)(path);

    }

    // Loading the module
    const exports = moduleLoaderSync(configPath);

    config = (exports.default || exports);
    if (typeof config !== 'object') {
      throw new Error(`Incorrect config file`);
    }

    break;

  }

  return config;

}