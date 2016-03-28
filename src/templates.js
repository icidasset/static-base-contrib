import { join } from 'path';
import getValue from 'lodash/fp/get';
import fs from 'fs';


/**
 * @typedef Renderer
 * @param {string} template
 * @param {Object} data - template context
 * @return {Promise} Returns a promise for a rendered template
 */


/**
 * Render templates and/or layouts.
 * @param {Dictionary} files
 * @param {Renderer} renderer
 * @param {Object} [options]
 * @param {string} options.layoutObjPath -
 */
export default function(files, renderer, options = {}) {
  const safeRenderer = (template = '', data = {}) => {
    return Promise.resolve(renderer(template, data));
  };

  const promises = files.map((f) => {
    const data = { ...f };
    const initial = safeRenderer(f.content, data);

    // apply layouts (in order)
    let layouts = (data.layouts) ||
                  (data.layout ? [data.layout] : []);

    layouts = layouts.map((l) => {
      return (html) => {
        const path = join(f.root, l);

        return new Promise((resolve, reject) => {
          fs.readFile(path, { encoding: 'utf-8' }, (err, layout) => {
            if (err) reject(err);
            else safeRenderer(layout, { ...data, content: html }).then(resolve);
          });
        });
      };
    });

    // return promise
    return layouts.reduce(
      (promise, fn) => promise.then(fn),
      initial
    ).then(
      (html) => { return { ...f, content: html }}
    );
  });

  // return
  return Promise.all(promises);
}
