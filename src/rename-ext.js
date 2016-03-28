import { join } from 'path';
import { cleanPath } from 'static-base/lib/utils';


/**
 * Change the extension/extname of every {@link Definition}.
 * @param {Dictionary} files
 * @param {string} replaceWith - The next extension (e.g. `.html`)
 */
export default function(files, replaceWith) {
  return files.map((f) => {
    const cleanedPath = cleanPath(
      f.path.replace(new RegExp(`${f.extname}$`), replaceWith),
      { beginning: true }
    );

    return {
      ...f,

      path: cleanedPath,
      entirePath: join(f.root, f.wd, cleanedPath),

      extname: replaceWith,
    };
  });
}
