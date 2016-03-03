import fs from 'fs';
import mkdirp from 'mkdirp';
import pathUtils from 'path';


export default function(destination, deps, files) {
  files.forEach((f) => {
    const dir = pathUtils.join(f.root, destination, f.dirname);

    mkdirp.sync(dir);
    fs.writeFileSync(pathUtils.join(dir, `${f.basename}${f.ext}`), f.content);
  });

  return [...files];
}
