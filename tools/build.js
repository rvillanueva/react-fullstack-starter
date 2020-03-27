// More info on Webpack's Node API here: https://webpack.js.org/api/node/
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfigProd from '../webpack.config.prod';
import {chalkError, chalkSuccess, chalkWarning, chalkProcessing} from './chalkConfig';
import fs from 'fs-extra';
import path from 'path';

/*eslint-disable no-undef*/
process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.
/*eslint-enable no-undef*/

console.log(chalkProcessing('Generating minified bundle. This will take a moment...'));

function handleWebpackStats(stats) {
  const jsonStats = stats.toJson();

  if(jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalkError(error)));
  }

  if(jsonStats.hasWarnings) {
    console.log(chalkWarning('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, the build succeeded.
  console.log(chalkSuccess('Your app is compiled in production mode in /dist. It\'s ready to roll!'));

  return Promise.resolve(0);
}

function handleWebpackError(error) {
  console.log(chalkError(error));
  return 1;
}

function runWebpack(config) {
  return new Promise((resolve, reject) => {
    webpack(config).run((error, stats) => {
      if(error) {
        return reject(error);
      } else {
        return resolve(stats);
      }
    });
  });
}

function copyServerCss() {
  return fs.copy(path.resolve(__dirname, '../server/email/styles'), path.resolve(__dirname, '../dist/server/email/styles'));
}

runWebpack(webpackConfigProd)
  .then(handleWebpackStats)
  .then(copyServerCss)
  .catch(handleWebpackError);
