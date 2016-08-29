import { buildDefinition } from 'static-base';
import optional from 'optional';

const SVGSprite = optional('svg-sprite');


/**
 * Make a svg sprite consisting out of the given {@link Definition}s.
 * @param {Dictionary} files
 * @param {string} config - Configuration object for
                            [svg-sprite](https://github.com/jkphl/svg-sprite)
 */
export default function svgSprite(files, config = {}) {
  if (!SVGSprite) {
    throw 'You have to install `svg-sprite` in order to use this function';
  }

  const spriter = new SVGSprite(config);
  let wd, root;

  files.forEach(f => {
    if (!wd) wd = f.wd;
    if (!root) root = f.root;

    spriter.add(
      f.entirePath,
      f.path,
      f.content
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
