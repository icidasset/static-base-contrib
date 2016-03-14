import { join } from 'path';
import fs from 'fs';


export default function(files, deps, renderer) {
  const promises = files.map((f) => {
    const data = templateData(f);
    const initial = renderer(f.content, data);

    // apply layouts (in order)
    let layouts = (f.metadata.layouts) ||
                  (f.metadata.layout ? [f.metadata.layout] : []);

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


function templateData(f) {
  return {
    ...f,
    metadata: undefined,
    ...f.metadata,
  };
}
