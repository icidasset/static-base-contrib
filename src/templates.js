import { join } from 'path';
import fs from 'fs';


/**
 * Render templates and/or layouts.
 * @param {Dictionary} files
 * @param {function} renderer - A function that renders the templates. `(template, data) => str`.
 * @param {Object} [options]
 */
export default function(files, renderer, options = {}) {
  const promises = files.map((f) => {
    const data = { ...f };
    const initial = renderer(f.content, data);
    const layoutPropObj = options.layoutObjPath ? get(data, options.layoutObjPath, data) : data;

    // apply layouts (in order)
    let layouts = (layoutPropObj.layouts) ||
                  (layoutPropObj.layout ? [layoutPropObj.layout] : []);

    layouts = layouts.map((l) => {
      return (html) => {
        const path = join(f.root, l);
        const layout = fs.readFileSync(path, 'utf-8');

        return renderer(layout, { ...data, content: html });
      };
    });

    // return promise
    return layouts.reduce(
      (promise, fn) => promise.then(fn),
      initial
    ).then((html) => {
      return {
        ...f,
        content: html,
      };
    });
  });

  // return
  return Promise.all(promises);
}
