import { join } from 'path';


/**
 * Add parentPath to every {@link Definition}.
 * Or in other words, the path for the parent directory.
 * Does not define this property if there is no parent directory.
 * @param {Dictionary} files
 */
export default function parentPath(files) {
  return files.map(f => {
    const directories = f.dirname.length ? f.dirname.split('/') : [];
    const parentPath = directories.map(d => '..').join('/');

    if (parentPath.length) return { ...f, parentPath: `${parentPath}/` };
    return f;
  });
}
