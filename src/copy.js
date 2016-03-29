import { join } from 'path';
import fse from 'fs-extra';


/**
 * Copy every {@link Definition} to a destination directory
 * @param {Dictionary} files
 * @param {string} destination
 */
export default function copy(files, destination) {
  const promises = files.map(f => {
    return new Promise((resolve, reject) => {
      fse.copy(
        f.entirePath,
        join(f.root, destination, f.path),
        (err) => err ? reject(err) : resolve(f)
      );
    });
  });

  return Promise.all(promises);
}
