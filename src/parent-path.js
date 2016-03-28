import { join } from 'path';
import { cleanPath } from 'static-base/lib/utils';


/**
 * Add parentPath to every {@link Definition}.
 * @param {Dictionary} files
 */
export default function(files) {
  return files.map((f) => {
    const dirs = f.dirname.length ? f.dirname.split('/') : [];
    const parent = dirs.map(d => '..').join('/');

    if (parent.length) return { ...f, parentPath: `${parent}/` };
    return f;
  });
}
