import SVGSprite from 'svg-sprite';
import { buildDefinition } from 'static-base/lib/dictionary';


/**
 * Make a svg sprite consisting out of the given {@link Definition}s.
 * @param {Dictionary} files
 * @param {string} config - configuration object for
                            [svg-sprite](https://github.com/jkphl/svg-sprite)
 */
export default function svgSprite(files, config = {}) {
  const spriter = new SVGSprite(config);
  let wd, root;

  files.forEach((file) => {
    if (!wd) wd = file.wd;
    if (!root) root = file.root;

    spriter.add(
      file.entirePath,
      file.path,
      file.content
    );
  });

  if (files.length) return compile(spriter, wd, root);
  else return [...files];
}


/**
 * @private
 */
function compile(spriter, wd, root) {
  return new Promise((resolve, reject) => {

    spriter.compile((err, result) => {
      if (err) {
        reject(err);

      } else {
        const files = [];

        Object.keys(result).forEach(mode => {
          Object.keys(result[mode]).forEach(resource => {
            const data = result[mode][resource];
            const file = buildDefinition(data.relative, { wd, root });
            file.content = data.contents.toString('utf-8');
            files.push(file);
          });
        });

        resolve(files);

      }
    });

  });
}
