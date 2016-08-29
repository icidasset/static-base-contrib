import { forkDefinition } from './utils';


/**
 * Change the path of a specific {@link Definition}.
 * @param {Dictionary} files
 * @param {string} oldPath - Find a {@link Definition} with this path
 * @param {string} newPath - The new path for the matched {@link Definition}
 */
export default function rename(files, oldPath, newPath) {
  return files.map(f => (
    f.path === oldPath ?
      { ...f, ...forkDefinition(newPath, f) } :
      f
  ));
}
