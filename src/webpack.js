import { join, relative } from 'path';
import { buildDefinition } from 'static-base/lib/dictionary';
import flatten from 'lodash/fp/flatten';
import MemoryFileSystem from 'memory-fs'
import webpackLibrary from 'webpack';


/**
 * Execute a Webpack configuration,
 * and make a {@link Dictionary}.
 * @param {Dictionary} files
 * @param {Object} config - Webpack config object
 */
export default function webpack(files, config) {
  return new Promise((resolve, reject) => {
    const compiler = webpackLibrary(config);

    if (!config.context) {
      return reject('static-base-contrib, webpack, you must set the `context` property');
    }

    if (!config.output.path) {
      return reject('static-base-contrib, webpack, you must set the `output.path` property');
    }

    compiler.outputFileSystem = new MemoryFileSystem();
    compiler.run((err, stats) => {
      if (err) return reject(err);

      const fs = compiler.outputFileSystem;
      const webpackFiles = [];
      const info = stats.toString();

      if (stats.hasErrors()) return reject(info);

      const deps = {
        wd: relative(config.context, config.output.path),
        root: config.context
      };

      scan(fs, '', deps, webpackFiles);
      resolve([...files, ...webpackFiles]);
    });
  });
}


function scan(fs, combinedPath, deps, collection) {
  const entirePath = join(deps.root, deps.wd, combinedPath);

  fs.readdirSync(entirePath).forEach((name) => {
    const p = join(combinedPath, name);
    const e = join(entirePath, name);

    if (fs.statSync(e).isDirectory()) {
      scan(fs, p, deps, collection);
    } else {
      const def = buildDefinition(p, deps);
      def.content = fs.readFileSync(def.entirePath, 'utf-8');
      collection.push(def);
    }
  });
}
