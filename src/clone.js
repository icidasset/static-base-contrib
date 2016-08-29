import rename from './rename';
import sortBy from 'lodash/fp/sortBy';


/**
 * Clone a specific {@link Definition}.
 * @param {Dictionary} files
 * @param {string} path - find a {@link Definition} with this path
 * @param {string} newPath - the path for the cloned {@link Definition}
 */
export default function clone(files, path, newPath) {
  const file = files.find(f => f.path === path);
  return file ? sortBy('path', files.concat( rename([file], path, newPath) )) : files;
}
