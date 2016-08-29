import { join } from 'path';
import fs from 'fs';
import getValue from 'lodash/fp/get';


/**
 * @typedef Renderer
 * @name Renderer
 * @param {string} template
 * @param {Object} data - Template context
 * @return {Promise} Returns a promise for a rendered template
 */


/**
 * Render templates and/or layouts.
 * @param {Dictionary} files
 * @param {Renderer} renderer
 * @param {Object} [options]
 * @param {string} options.layouts - Or `options.layout`
 * @param {string} options.onlyApplyLayout
 */
export default function templates(files, renderer, options = {}) {
  const safeRenderer = (template = '', data = {}) => {
    return Promise.resolve(renderer(template, data));
  };

  const promises = files.map(f => {
    const data = { ...f };
    const initial = options.onlyApplyLayout ?
      Promise.resolve(f.content) :
      safeRenderer(f.content, data);

    // apply layouts (in order)
    let layouts = options.layouts ||
                  options.layout ||
                  data.layouts ||
                  data.layout;

    if (Array.isArray(layouts) === false) {
      layouts = layouts ? [layouts] : [];
    }

    layouts = layouts.map(l => html => {
      const path = join(f.root, l);

      return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: 'utf-8' }, (err, layout) => {
          if (err) reject(err);
          else safeRenderer(layout, { ...data, content: html }).then(resolve);
        });
      });
    });

    // return promise
    return layouts.reduce(
      (promise, fn) => promise.then(fn),
      initial
    ).then(
      (html) => ({ ...f, content: html })
    );
  });

  // return
  return Promise.all(promises);
}
