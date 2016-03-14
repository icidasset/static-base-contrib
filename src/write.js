import { join } from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';


export default function(files, deps, destination) {
  files.forEach((f) => {
    const dir = join(f.root, destination, f.dirname);

    // ensure the directory tree exists
    mkdirp.sync(dir);

    // write to file
    fs.writeFileSync(join(dir, `${f.basename}${f.extname}`), f.content);
  });

  return [...files];
}
