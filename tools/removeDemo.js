// This script removes demo app files
import rimraf from 'rimraf';
import fs from 'fs';
import {chalkSuccess} from './chalkConfig';

/* eslint-disable no-console */

const pathsToRemove = [
  './client/actions/*',
  './client/utils',
  './client/components/*',
  './client/constants/*',
  './client/containers/*',
  './client/images',
  './client/reducers/*',
  './client/store/store.spec.js',
  './client/styles',
  './client/index.js',
  './tools/removeDemo.js'
];

const filesToCreate = [
  {
    path: './client/components/emptyTest.spec.js',
    content: '// Must have at least one test file in this directory or Mocha will throw an error.'
  },
  {
    path: './client/index.js',
    content: '// Set up your application entry point here...'
  },
  {
    path: './client/reducers/index.js',
    content: '// Set up your root reducer here...\n import { combineReducers } from \'redux\';\n export default combineReducers;'
  }
];

function removePath(path, callback) {
  rimraf(path, error => {
    if (error) throw new Error(error);
    callback();
  });
}

function createFile(file) {
  fs.writeFile(file.path, file.content, error => {
    if (error) throw new Error(error);
  });
}

function removePackageJsonScriptEntry(scriptName) {
  const packageJsonPath = './package.json';
  let fileData = fs.readFileSync(packageJsonPath);
  let content = JSON.parse(fileData);
  delete content.scripts[scriptName];
  fs.writeFileSync(packageJsonPath,
    JSON.stringify(content, null, 2) + '\n');
}

let numPathsRemoved = 0;
pathsToRemove.map(path => {
  removePath(path, () => {
    numPathsRemoved++;
    if (numPathsRemoved === pathsToRemove.length) { // All paths have been processed
      // Now we can create files since we're done deleting.
      filesToCreate.map(file => createFile(file));
    }
  });
});

removePackageJsonScriptEntry('remove-demo');

console.log(chalkSuccess('Demo app removed.'));
