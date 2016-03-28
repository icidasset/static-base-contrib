import { join } from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';


/**
 * Write the content of every {@link Definition} (aka file) to disk.
 * @param {Dictionary} files
 * @param {string} destination
 */
export default function(files, destination) {
  files.forEach((f) => {
    const dir = join(f.root, destination, f.dirname);

    // ensure the directory tree exists
    mkdirp.sync(dir);

    // write to file
    fs.writeFileSync(join(dir, `${f.basename}${f.extname}`), f.content);
  });

  return [...files];
}
