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
      try {
        fse.copySync(
          f.entirePath,
          join(f.root, destination, f.path)
        );

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });

  // copy one by one
  return promises.reduce(
    (promise, fn) => promise.then(fn),
    Promise.resolve()
  ).then(
    () => [...files]
  );
}
