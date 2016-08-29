import { forkDefinition } from './utils';
import { join } from 'path';


/**
 * Change the extension/extname of every {@link Definition}.
 * @param {Dictionary} files
 * @param {string} replaceWith - The next extension (e.g. `.html`)
 */
export default function renameExt(files, replaceWith) {
  return files.map(f => {
    const cleanedPath = f.path.replace(new RegExp(`${f.extname}$`), replaceWith);
    return { ...f, ...forkDefinition(cleanedPath, f) };
  });
}
