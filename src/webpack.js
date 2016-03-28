import { join, relative } from 'path';
import { buildDefinition } from 'static-base/lib/dictionary';
import flatten from 'lodash/fp/flatten';
import MemoryFileSystem from 'memory-fs'
import webpack from 'webpack';


/**
 * Execute a Webpack configuration,
 * and make a {@link Dictionary}.
 * @param {Dictionary} files
 * @param {Dependencies} deps
 * @param {Object} config - Webpack config object
 */
export default function(files, deps, config) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);

    compiler.outputFileSystem = new MemoryFileSystem();
    compiler.run((err, stats) => {
      if (err) return reject(err);

      const fs = compiler.outputFileSystem;
      const info = stats.toString();

      if (stats.hasErrors()) return reject(info);

      const d = {
        wd: relative(deps.root, config.output.path),
        root: deps.root
      };

      scan(fs, '', d).then((webpackFiles) => {
        const flattened = flatten(webpackFiles);
        resolve([...files, ...flattened]);
      });
    });
  });
}


function scan(fs, combinedPath, deps) {
  const entirePath = join(deps.root, deps.wd, combinedPath);

  return new Promise((resolve, reject) => {
    fs.readdir(entirePath, (err, files) => {
      if (err) reject(err);

      Promise
        .all(files.map((name) => {
          const p = join(combinedPath, name);
          const e = join(entirePath, name);
          return scanFile(name, p, e, deps);
        }))
        .then(resolve);
    });
  });
}


function scanFile(name, p, e, deps) {
  return new Promise((resolve, reject) => {
    fs.stat(e, (err, stats) => {
      if (err) reject(err);

      if (stats.isDirectory()) {
        return resolve(scan(fs, p, deps));
      }

      const def = buildDefinition(p, deps);

      fs.readFile(def.entirePath, { encoding: 'utf-8' }, (err, content) => {
        if (err) reject(err);
        def.content = content;
        resolve(def);
      });
    });
  });
}
