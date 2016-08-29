import { join } from 'path';
import optional from 'optional';

const enfscopy = optional('enfscopy');


/**
 * Copy every {@link Definition} to a destination directory.
 * @param {Dictionary} files
 * @param {string} destination
 */
export default function copy(files, destination) {
  if (!enfscopy) {
    throw 'You have to install `enfscopy` in order to use this function';
  }

  return files.map(
    f => doCopy(f, destination)

  ).reduce(
    (promise, fn) => promise.then(fn),
    Promise.resolve()

  ).then(
    () => [...files]

  );
}


const doCopy = (f, destination) => enfscopy.copySync(
  f.entirePath,
  join(f.root, destination, f.path)
);
