import { join } from 'path';
import fs from 'fs';


export default function(files, deps, renderer) {
  const promises = files.map((f) => {
    let data;
    let promise;

    // apply template
    data = templateData(f);
    promise = renderer(f.content, data);

    // apply layout
    if (f.metadata.layout) {
      const layoutPath = join(f.root, f.metadata.layout);
      const layout = fs.readFileSync(layoutPath, 'utf-8');

      promise = promise.then((html) => {
        return renderer(layout, { ...data, content: html });
      });
    }

    // return promise
    return promise.then((html) => {
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
