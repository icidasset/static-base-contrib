import { join } from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';


/**
 * Write the content of every {@link Definition} (aka file) to disk.
 * @param {Dictionary} files
 * @param {string} destination
 */
export default function write(files, destination) {
  const promises = files.map(f => {
    return new Promise((resolve, reject) => {
      const dir = join(f.root, destination, f.dirname);

      // ensure the directory tree exists
      mkdirp(dir, (err) => {
        if (err) return reject(err);

        // write to file
        fs.writeFile(
          join(dir, `${f.basename}${f.extname}`),
          f.content,
          { encoding: 'utf-8' },
          (err) => err ? reject(err) : resolve(f)
        )
      });
    });
  });

  return Promise.all(promises);
}
