import { join } from 'path';
import fse from 'fs-extra';


/**
 * Copy every {@link Definition} to a destination directory
 * @param {Dictionary} files
 * @param {string} destination
 */
export default function(files, destination) {
  files.forEach((f) => {
    fse.copySync(
      f.entirePath,
      join(f.root, destination, f.path)
    );
  });

  return [...files];
}
