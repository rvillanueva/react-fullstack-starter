import rimraf from 'rimraf';
import {mkdir} from 'fs';

async function clean() {
  try {
    await rimrafAsync('./dist');
    await mkdirAsync('./dist');
    return;
  } catch(e) {
    throw new Error(e);
  }
}

async function rimrafAsync(pattern) {
  return new Promise((resolve, reject) => {
    rimraf(pattern, {}, err => {
      if(err) return reject(err);
      resolve();
    });
  });
}

async function mkdirAsync(path) {
  return new Promise((resolve, reject) => {
    mkdir(path, {}, err => {
      if(err) return reject(err);
      resolve();
    });
  });
}

clean();
