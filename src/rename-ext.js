import { join } from 'path';
import { cleanPath } from 'static-base/lib/utils';


export default function(files, deps, replaceWith) {
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
