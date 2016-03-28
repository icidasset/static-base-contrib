import { join, relative } from 'path';
import { buildDefinition } from 'static-base/lib/dictionary';
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
      const webpackFiles = [];
      const info = stats.toString();

      if (stats.hasErrors()) return reject(info);

      const d = { wd: relative(deps.root, config.output.path), root: deps.root };

      scan(fs, '', d, webpackFiles);
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
